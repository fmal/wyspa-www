import React from 'react';
import PropTypes from 'prop-types';

import mergeLanguageFactory from '../utils/mergeLanguageFactory';

function localize(Component) {
  function LocalizeHOC(props) {
    const mergeLanguage = React.useMemo(() => {
      return mergeLanguageFactory(props.pageContext.language);
    }, [props.pageContext.language]);

    return <Component {...props} data={mergeLanguage(props.data)} />;
  }

  LocalizeHOC.propTypes = {
    data: PropTypes.object,
    pageContext: PropTypes.shape({
      language: PropTypes.string
    })
  };

  return LocalizeHOC;
}

export default localize;
