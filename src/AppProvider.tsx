import React, { Suspense } from 'react';
import { Text } from 'react-native';
import { LoadingProvider } from 'providers/LoadingProvider';

type Props = {
  children: JSX.Element;
};

const AppProvider = ({ children }: Props) => (
  <Suspense fallback={<Text />}>
    <LoadingProvider>
      {children}
    </LoadingProvider>
  </Suspense>
);

export default AppProvider;
