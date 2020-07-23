const fs = require('fs');
const path = require('path');
const i18next = require('i18next');
const fsBackend = require('i18next-fs-backend');

const {
  wrapper,
  getLanguagesFromTranslations,
  mergeLanguageTranslations,
  getAlternateLinksData,
  createPaginatedPagesFactory
} = require('./src/utils/gatsbyNodeHelpers');

const allLanguages = ['en', 'pl'];

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const srcPath = resolveApp('src');

const noop = () => {};

const createI18nextInstance = async (language, namespaces) => {
  const i18n = i18next.createInstance();
  i18n.use(fsBackend);
  await i18n.init({
    lng: language,
    ns: namespaces,
    fallbackLng: language,
    interpolation: { escapeValue: false },
    backend: { loadPath: `${srcPath}/locales/{{lng}}/{{ns}}.json` }
  });

  return i18n;
};

const templates = {
  home: path.resolve('src/templates/Home.js'),
  event: path.resolve('src/templates/Event.js'),
  category: path.resolve('src/templates/Category.js'),
  categoryArchive: path.resolve('src/templates/CategoryArchive.js'),
  aboutUs: path.resolve('src/templates/AboutUs.js'),
  artLab: path.resolve('src/templates/ArtLab.js'),
  onePercent: path.resolve('src/templates/OnePercent.js'),
  error: path.resolve('src/templates/404.js')
};

const buildI18nPageDefinitions = async (
  collectionNodes,
  namespaces,
  getPageDefinition = noop,
  handlePageDefinitions = noop
) => {
  if (!Array.isArray(collectionNodes)) {
    collectionNodes = [collectionNodes];
  }

  await Promise.all(
    collectionNodes.map(async node => {
      const { translations = [], ...nodeData } = node;

      const languages = getLanguagesFromTranslations(
        translations,
        allLanguages
      );

      if (languages.length === 0) {
        return Promise.resolve();
      }

      const definitions = await Promise.all(
        languages.map(async language => {
          const i18n = await createI18nextInstance(language, namespaces);

          const dataWithMergedTranslations = mergeLanguageTranslations(
            nodeData,
            language,
            translations
          );

          const res = getPageDefinition(
            dataWithMergedTranslations,
            language,
            i18n
          );
          res.context.language = language;
          res.context.i18nResources = i18n.services.resourceStore.data;
          return res;
        })
      );

      handlePageDefinitions(definitions);
    })
  );
};

const buildI18nPages = ({
  template,
  namespaces = [],
  getSlug = () => ''
} = {}) => async createPage => {
  const definitions = await Promise.all(
    allLanguages.map(async language => {
      const i18n = await createI18nextInstance(language, namespaces);
      const slug = getSlug(i18n);
      const res = {
        path: `/${language}${slug !== '' ? `/${slug}` : ''}`,
        component: template,
        context: {
          language,
          i18nResources: i18n.services.resourceStore.data
        }
      };

      return res;
    })
  );

  const alternateLinks = definitions.map(d => ({
    language: d.context.language,
    path: d.path
  }));

  definitions.forEach(d => {
    d.context.alternateLinks = alternateLinks;
    createPage(d);
  });
};

const buildHomePages = buildI18nPages({
  template: templates.home,
  namespaces: ['common', 'home', 'aboutUs', 'artLab', 'onePercent']
});
const buildAboutUsPages = buildI18nPages({
  template: templates.aboutUs,
  namespaces: ['common', 'aboutUs'],
  getSlug: i18n => i18n.t('common:aboutUsSlug')
});
const buildArtLabPages = buildI18nPages({
  template: templates.artLab,
  namespaces: ['common', 'artLab'],
  getSlug: i18n => i18n.t('common:artLabSlug')
});
const buildOnePercentPages = buildI18nPages({
  template: templates.onePercent,
  namespaces: ['common', 'onePercent'],
  getSlug: i18n => i18n.t('common:onePercentSlug')
});

const build404Pages = async createPage => {
  await Promise.all(
    allLanguages.map(async (language, index) => {
      const i18n = await createI18nextInstance(language, ['common', 404]);
      const res = {
        path: `/${language}/404`,
        component: templates.error,
        context: {
          language,
          i18nResources: i18n.services.resourceStore.data
        }
      };

      createPage(res);

      if (index === 0) {
        res.path = '/404';
        createPage(res);
      }
    })
  );
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'DirectusEvent') {
    const date = new Date(node.start_date);
    const year = date.getFullYear();

    // So we can group and sort by these
    createNodeField({
      name: 'year',
      node,
      value: year
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  const {
    data: { categories, events, eventsByCategory }
  } = await wrapper(
    graphql(`
      query StartupQuery {
        categories: allDirectusCategory(
          filter: { is_external: { eq: false } }
        ) {
          nodes {
            id
            translations {
              language
              slug
            }
          }
        }
        events: allDirectusEvent {
          nodes {
            id
            translations {
              language
              slug
            }
          }
        }
        eventsByCategory: allDirectusEvent {
          group(field: categories___id) {
            nodes {
              fields {
                year
              }
              translations {
                language
              }
            }
            categoryId: fieldValue
          }
        }
      }
    `)
  );

  const categoryEventsMap = eventsByCategory.group.reduce(
    (categoryEventsMap, group) => {
      categoryEventsMap[group.categoryId] = group.nodes;

      return categoryEventsMap;
    },
    Object.create(null)
  );

  await Promise.all([
    buildHomePages(createPage),
    buildAboutUsPages(createPage),
    buildArtLabPages(createPage),
    buildOnePercentPages(createPage),
    buildI18nPageDefinitions(
      categories.nodes,
      ['common', 'category', 'event'],
      ({ slug, id }, language, i18n) => ({
        i18n,
        path: `/${language}/${i18n.t('common:categorySlug')}/${slug}`,
        context: { id }
      }),
      definitions => {
        const alternateLinks = getAlternateLinksData(definitions);

        definitions.forEach(({ i18n, ...definition }) => {
          const createPaginatedPages = createPaginatedPagesFactory(
            createPage,
            i18n
          );

          const categoryEvents = (
            categoryEventsMap[definition.context.id] || []
          ).filter(
            event =>
              event.translations.find(
                translation =>
                  translation.language === definition.context.language
              ) != null
          );

          createPaginatedPages(
            categoryEvents,
            definition.path,
            templates.category,
            idx =>
              idx === 0
                ? {
                    ...definition,
                    context: {
                      ...definition.context,
                      alternateLinks
                    }
                  }
                : definition
          );

          const categoryEventsByYear = categoryEvents.reduce(
            (eventsByYear, event) => {
              const year = event.fields.year;

              eventsByYear[year] = eventsByYear[year] || [];
              eventsByYear[year].push(event);

              return eventsByYear;
            },
            Object.create(null)
          );

          Object.keys(categoryEventsByYear).forEach(year => {
            const yearlyEvents = categoryEventsByYear[year];

            createPaginatedPages(
              yearlyEvents,
              `${definition.path}/${i18n.t('common:yearSlug')}/${year}`,
              templates.categoryArchive,
              () => ({
                ...definition,
                context: {
                  ...definition.context,
                  year: Number(year),
                  excludeInSitemap: true
                }
              })
            );
          });
        });
      }
    ),
    buildI18nPageDefinitions(
      events.nodes,
      ['common', 'event'],
      ({ slug, id }, language, i18n) => ({
        path: `/${language}/${i18n.t('common:eventSlug')}/${slug}`,
        component: templates.event,
        context: { id }
      }),
      definitions => {
        const alternateLinks = getAlternateLinksData(definitions);

        definitions.forEach(d => {
          d.context.alternateLinks = alternateLinks;
          createPage(d);
        });
      }
    ),
    build404Pages(createPage)
  ]);

  createRedirect({
    fromPath: '/',
    toPath: '/pl',
    isPermanent: true,
    redirectInBrowser: process.env.NODE_ENV === 'development'
  });

  allLanguages.forEach(language =>
    createRedirect({
      fromPath: `/${language}/*`,
      toPath: `/${language}/404`,
      statusCode: 404
    })
  );
  createRedirect({ fromPath: '/*', toPath: '/404', statusCode: 404 });
};

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    DirectusCategory: {
      lastEvent: {
        type: 'DirectusEvent',
        resolve(source, args, context, info) {
          return context.nodeModel.runQuery({
            type: 'DirectusEvent',
            query: {
              sort: { fields: ['created_date'], order: ['DESC'] },
              filter: {
                categories: {
                  elemMatch: {
                    id: {
                      eq: source.id
                    }
                  }
                }
              }
            },
            firstOnly: true
          });
        }
      }
    }
  };

  createResolvers(resolvers);
};

exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  if (getConfig().mode === 'production') {
    actions.setWebpackConfig({
      devtool: false
    });
  }
};
