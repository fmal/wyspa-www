const fs = require('fs');
const path = require('path');
const i18next = require('i18next');
const fsBackend = require('i18next-fs-backend');

const { wrapper } = require('./src/utils/gatsbyNodeHelpers');

const allLanguages = ['en', 'pl'];

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const srcPath = resolveApp('src');

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

const buildI18nPages = async (
  collectionEdges,
  pageDefinitionCallback,
  namespaces,
  createPage
) => {
  if (!Array.isArray(collectionEdges)) {
    collectionEdges = [collectionEdges];
  }

  await Promise.all(
    collectionEdges.map(async ({ node }) => {
      const { translations = [], ...nodeData } = node;

      const translationLangs = translations.reduce(
        (translationLangs, translation) => {
          translationLangs[translation.language] = true;
          return translationLangs;
        },
        Object.create(null)
      );

      const filteredLanguages = allLanguages.filter(
        language => language in translationLangs
      );

      if (filteredLanguages.length === 0) {
        return Promise.resolve();
      }

      const definitions = await Promise.all(
        filteredLanguages.map(async language => {
          const i18n = await createI18nextInstance(language, namespaces);

          const translation = translations.find(
            translation => translation.language === language
          );
          const {
            language: _translationLang,
            ...translationData
          } = translation;

          const dataWithMergedTranslations = {
            ...nodeData,
            ...translationData
          };

          const res = pageDefinitionCallback(
            dataWithMergedTranslations,
            language,
            i18n
          );
          res.context.language = language;
          res.context.i18nResources = i18n.services.resourceStore.data;
          return res;
        })
      );

      const alternateLinks =
        definitions.length > 1
          ? definitions.map(d => ({
              language: d.context.language,
              path: d.path
            }))
          : [];

      definitions.forEach(d => {
        d.context.alternateLinks = alternateLinks;
        createPage(d);
      });
    })
  );
};

const buildHomePages = async createPage => {
  const homeTemplate = path.resolve('src/templates/Home.js');

  const definitions = await Promise.all(
    allLanguages.map(async language => {
      const i18n = await createI18nextInstance(language, ['common', 'home']);
      const res = {
        path: '/' + language,
        component: homeTemplate,
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

const build404Pages = async createPage => {
  const errorTemplate = path.resolve('src/templates/404.js');
  await Promise.all(
    allLanguages.map(async (language, index) => {
      const i18n = await createI18nextInstance(language, ['common', 404]);
      const res = {
        path: '/' + language + '/404',
        component: errorTemplate,
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

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  await buildHomePages(createPage);

  const {
    data: { categories, events }
  } = await wrapper(
    graphql(`
      query StartupQuery {
        categories: allDirectusCategory {
          edges {
            node {
              id
              translations {
                language
                slug
              }
            }
          }
        }
        events: allDirectusEvent {
          edges {
            node {
              id
              translations {
                language
                slug
              }
            }
          }
        }
      }
    `)
  );

  const categoryTemplate = path.resolve('src/templates/Category.js');

  await buildI18nPages(
    categories.edges,
    ({ slug, id }, language, i18n) => ({
      path: `/${language}/${i18n.t('common:categorySlug')}/${slug}`,
      component: categoryTemplate,
      context: { id }
    }),
    ['common', 'category'],
    createPage
  );

  const eventTemplate = path.resolve('src/templates/Event.js');

  await buildI18nPages(
    events.edges,
    ({ slug, id }, language, i18n) => ({
      path: `/${language}/${i18n.t('common:eventSlug')}/${slug}`,
      component: eventTemplate,
      context: { id }
    }),
    ['common', 'event'],
    createPage
  );

  await build404Pages(createPage);

  createRedirect({
    fromPath: '/',
    toPath: '/pl',
    isPermanent: true
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
