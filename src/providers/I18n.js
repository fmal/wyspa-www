import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

export default function I18nProvider(props) {
  const i18n = i18next
    .createInstance({
      lng: props.pageContext.language,
      interpolation: { escapeValue: false },
      initImmediate: false,
      resources: props.pageContext.i18nResources
    })
    .use(initReactI18next);

  i18n.init();

  return <I18nextProvider i18n={i18n}>{props.children}</I18nextProvider>;
}
