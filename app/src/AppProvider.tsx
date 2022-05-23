import React, { Suspense } from 'react';
import { Text } from 'react-native';
import { LoadingProvider } from 'providers/LoadingProvider';
import { ThemeProvider } from 'providers/ThemeProvider';
import { AuthProvider } from "providers/AuthProvider";
import {AlertProvider} from "./providers/AlertProvider";

type Props = {
  children: JSX.Element;
};

const AppProvider = ({ children }: Props) => (
  <Suspense fallback={<Text />}>
    <ThemeProvider>
      <LoadingProvider>
        <AlertProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </AlertProvider>
      </LoadingProvider>
    </ThemeProvider>
  </Suspense>
);

export default AppProvider;
