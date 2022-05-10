import React, { Suspense } from 'react';
import { Text } from 'react-native';
import { LoadingProvider } from 'providers/LoadingProvider';
import { ThemeProvider } from 'providers/ThemeProvider';

type Props = {
  children: JSX.Element;
};

const AppProvider = ({ children }: Props) => (
  <Suspense fallback={<Text />}>
    <ThemeProvider>
      <LoadingProvider>
        {children}
      </LoadingProvider>
    </ThemeProvider>
  </Suspense>
);

export default AppProvider;
