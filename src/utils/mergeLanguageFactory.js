export default function mergeLanguageFactory(language) {
  const languages = [language, 'pl'];

  return function mergeLanguage(value) {
    if (Array.isArray(value)) {
      return value.map(v => mergeLanguage(v, languages));
    } else if (typeof value === 'object') {
      if (Object.prototype.hasOwnProperty.call(value, 'translations')) {
        const { translations } = value;

        let translationIdx = -1;

        languages.some(lang => {
          translationIdx = translations.findIndex(t => t.language === lang);
          return translationIdx !== -1;
        });

        const { language, ...translationData } =
          translations[translationIdx] || {};

        return { ...value, ...translationData };
      }

      return Object.keys(value).reduce((result, key) => {
        result[key] = mergeLanguage(value[key], languages);
        return result;
      }, {});
    }

    return value;
  };
}
