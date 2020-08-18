/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import { usePopper } from 'react-popper';
import FocusTrap from 'focus-trap-react';
import { useTransition, animated, config } from 'react-spring';

import Portal from './Portal';
import useId from '../hooks/useId';

const ESC_KEY = 27;

const Popover = ({
  trigger,
  isShown,
  placement,
  shouldCloseOnClickOutside,
  shouldUpdateOnResize,
  children,
  style,
  sx,
  ...props
}) => {
  const [referenceElement, setReferenceElement] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(isShown);

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = e => {
      if (e.key === 'Escape' || e.keyCode === ESC_KEY) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleClickOutside = React.useCallback(
    e => {
      if (
        popperElement &&
        referenceElement &&
        !popperElement.contains(e.target) &&
        !referenceElement.contains(e.target)
      ) {
        setIsOpen(false);
      }
    },
    [popperElement, referenceElement]
  );

  React.useEffect(() => {
    if (!shouldCloseOnClickOutside || !isOpen) {
      return;
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, shouldCloseOnClickOutside, handleClickOutside]);

  const {
    styles: { popper: popperStyles },
    attributes: { popper: popperAttributes },
    update
  } = usePopper(referenceElement, popperElement, {
    placement
  });

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    let animationFrameId;

    const handleResize = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => update);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isOpen, shouldUpdateOnResize, update]);

  const transitions = useTransition(isOpen, null, {
    config: config.stiff,
    enter: {
      opacity: 1,
      transform: 'scaleY(1)'
    },
    leave: {
      opacity: 0,
      transform: 'scaleY(0.9)'
    },
    from: {
      opacity: 0,
      transform: 'scaleY(0.9)'
    }
  });

  const id = `popover-${useId()}`;

  return (
    <React.Fragment>
      {React.cloneElement(trigger, {
        ref: setReferenceElement,
        'aria-controls': id,
        'aria-expanded': isOpen,
        'aria-haspopup': true,
        onClick: e => {
          if (trigger.props.onClick) {
            trigger.props.onClick(e);
          }

          setIsOpen(isOpen => !isOpen);
        }
      })}
      <Portal>
        {transitions.map(
          ({ item, props: springProps, key }) =>
            item && (
              <div
                key={key}
                ref={setPopperElement}
                sx={{
                  outline: 'none'
                }}
                style={popperStyles}
                id={id}
                tabIndex={-1}
                {...popperAttributes}
              >
                <FocusTrap
                  focusTrapOptions={{
                    clickOutsideDeactivates: true,
                    fallbackFocus: `#${id}`
                  }}
                >
                  <animated.div
                    sx={{
                      boxShadow: 'xl',
                      backgroundColor: 'background',
                      borderRadius: 'default',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: 'gray.3',
                      ...sx
                    }}
                    style={{
                      ...style,
                      ...springProps
                    }}
                    {...props}
                  >
                    {children}
                  </animated.div>
                </FocusTrap>
              </div>
            )
        )}
      </Portal>
    </React.Fragment>
  );
};

Popover.defaultProps = {
  isShown: false,
  placement: 'auto',
  shouldCloseOnClickOutside: true,
  shouldUpdateOnResize: true
};

export default Popover;
