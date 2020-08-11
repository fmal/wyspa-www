import { useRef } from 'react';

import uuid from '../utils/uuid';

const useId = () => {
  const id = useRef(uuid());
  return id.current;
};

export default useId;
