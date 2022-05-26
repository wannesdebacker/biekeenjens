import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

const useMediaQuery = (query) => {
  const [mediaQuery, setMediaQuery] = useState('large');

  const resizeListener = debounce(() => {
    const bodyMediaQuery = window
      .getComputedStyle(document.body, '::after')
      ?.content?.replace?.(/\"/g, '');

    setMediaQuery(bodyMediaQuery);
  }, 100);

  useEffect(() => {
    resizeListener();
  }, [resizeListener]);

  useEffect(() => {
    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, [query, resizeListener]);

  return mediaQuery;
};

export default useMediaQuery;
