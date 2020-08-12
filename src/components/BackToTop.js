/** @jsx jsx */
import { jsx, Button } from 'theme-ui';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useIsStatic } from '../providers/IsStatic';
import SvgIcon from './SvgIcon';

const BackToTop = () => {
  const [isShown, setIsShown] = React.useState(false);
  const observerRef = React.useRef(null);
  const isStatic = useIsStatic();
  const { t } = useTranslation('common');

  const handleObserverEvent = entries => {
    entries.forEach(({ isIntersecting }) => {
      setIsShown(!isIntersecting);
    });
  };

  React.useEffect(() => {
    if (isStatic || !('IntersectionObserver' in window)) {
      return;
    }

    const newObserver = new IntersectionObserver(handleObserverEvent, {
      threshold: 0
    });
    newObserver.observe(observerRef.current);
  }, [isStatic]);

  if (isStatic) {
    return null;
  }

  const handleClick = () => {
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <React.Fragment>
      <div
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '75vh',
          width: '1px'
        }}
        ref={observerRef}
      />
      <div
        sx={{
          position: 'fixed',
          right: 0,
          bottom: 0,
          mr: 3,
          mb: 3,
          transform: t =>
            isShown ? 'translateY(0)' : `translateY(${t.sizes[4]})`,
          opacity: isShown ? 1 : 0,
          visibility: isShown ? 'visible' : 'hidden',
          transitionDuration: '0.3s',
          transitionProperty: 'transform, opacity, visibility'
        }}
      >
        <Button
          onClick={handleClick}
          sx={{ p: '0.75rem' }}
          aria-label={t('backToTop')}
        >
          <SvgIcon
            sx={{ display: 'block' }}
            pathData={
              'M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z'
            }
          />
        </Button>
      </div>
    </React.Fragment>
  );
};

export default BackToTop;
