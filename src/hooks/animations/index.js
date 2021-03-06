import { useSpring, config } from 'react-spring';

export const useFadeAnimation = ({ delay } = {}) => {
  const props = useSpring({
    config: config.slow,
    delay,
    from: { opacity: 0 },
    to: { opacity: 1 }
  });

  return props;
};

export const useSlideInLeftAndFadeAnimation = ({ delay } = {}) => {
  const props = useSpring({
    config: config.slow,
    delay,
    from: { opacity: 0, transform: `translate3d(-30px, 0, 0)` },
    to: { opacity: 1, transform: `translate3d(0, 0, 0)` }
  });

  return props;
};

export const useSlideInDownAndFadeAnimation = ({ delay } = {}) => {
  const props = useSpring({
    config: config.slow,
    delay,
    from: { opacity: 0, transform: 'translate3d(0, -30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' }
  });

  return props;
};
