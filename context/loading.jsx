import React from 'react';

const LoadingContext = React.createContext({
  loading: false,
});

export const LoadingProvider = LoadingContext.Provider;
export default LoadingContext;