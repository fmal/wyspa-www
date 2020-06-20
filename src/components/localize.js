import React from 'react';
import Proptypes from 'prop-types';

import mergeLanguageFactory from '../utils/mergeLanguageFactory';

function localize(Component) {
  function LocalizeHOC(props) {
    const mergeLanguage = React.useMemo(() => {
      return mergeLanguageFactory(props.pageContext.language);
    }, [props.pageContext.language]);

    return <Component {...props} data={mergeLanguage(props.data)} />;
  }

  LocalizeHOC.propTypes = {
    data: Proptypes.object,
    pageContext: Proptypes.shape({
      language: Proptypes.string
    })
  };

  return LocalizeHOC;
}

export default localize;
