// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
exports.wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors;
    }
    return result;
  });

exports.getLanguagesFromTranslations = (
  translations = [],
  allLanguages = []
) => {
  const translationLangs = translations.reduce(
    (translationLangs, translation) => {
      translationLangs[translation.language] = true;
      return translationLangs;
    },
    Object.create(null)
  );

  return allLanguages.filter(language => language in translationLangs);
};

exports.mergeLanguageTranslations = (data, language, translations = []) => {
  const translation = translations.find(
    translation => translation.language === language
  );

  const { language: _translationLang, ...translationData } = translation;

  return {
    ...data,
    ...translationData
  };
};

exports.getAlternateLinksData = (definitions = []) =>
  definitions.length > 1
    ? definitions.map(d => ({
        language: d.context.language,
        path: d.path
      }))
    : [];

const PAGINATION_OFFSET = 8;

exports.createPaginatedPagesFactory = (createPage, i18n) => (
  nodes,
  pathPrefix,
  component,
  getPageDefinition = () => {}
) => {
  const pageCount = Math.max(1, Math.ceil(nodes.length / PAGINATION_OFFSET));

  Array.from({ length: pageCount }).forEach((_, idx) => {
    const pageDefinition = getPageDefinition(idx);

    createPage({
      ...pageDefinition,
      component,
      path:
        idx === 0
          ? pathPrefix
          : `${pathPrefix}/${i18n.t('common:pageSlug')}/${idx + 1}`,
      context: {
        ...pageDefinition.context,
        limit: PAGINATION_OFFSET,
        skip: idx * PAGINATION_OFFSET,
        pageCount,
        currentPage: idx + 1
      }
    });
  });
};
