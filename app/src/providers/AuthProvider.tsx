import React, { createContext, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from '../types/User';
import {removeStoredData} from "../utils/fnAsyncStorage";

type Auth = {
  user?: User;
  token?: string;
  signin: (identifier: string, password: string) => Promise<boolean | User>;
  refreshUser: () => void; // should return Promise<User>
  register: (username: string, email: string, password: string) => Promise<boolean | User>;
  updateUser: (payload: any) => Promise<void>;
  isFetching: boolean;
  isSignInError: boolean;
  isRegisterError: boolean;
  errorMessage: string | undefined;
  cleanError: () => void;
  signout: (userId?: string | number) => Promise<void>;
};

export const AuthContext = createContext<Auth>({} as Auth);

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const {t} = useTranslation();
  const [user, setUser] = useState<User>();
  const [currentJwt, setCurrentJwt] = useState<string | undefined>(undefined);
  const [isFetching, setIsFetching] = useState(false);
  const [isSignInError, setIsSignInError] = useState(false);
  const [isRegisterError, setIsRegisterError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  const signout = useCallback(
    async () => {
      await removeStoredData('token');
    },
    [],
  );

  const refreshUser = useCallback(async () => {
  }, [signout]);

  const signin = useCallback(
    async (email: string, password: string): Promise<boolean | User> => {
      const payload = {
        identifier: email,
        password,
      };

      return true;
    },
    [refreshUser],
  );

  const register = useCallback(
    async (username: string, email: string, password: string): Promise<boolean> => {
      const payload = {
        username,
        email,
        password,
      };

      setIsRegisterError(true);
      return true;
    },
    [t],
  );

  const cleanError = useCallback(() => {
    setIsSignInError(false);
    setIsRegisterError(false);
    setErrorMessage(undefined);
  }, []);

  const updateUser = useCallback(
    async payload => {
      setIsFetching(true);
    },
    [user, refreshUser],
  );

  const value: Auth = useMemo(
    () => ({
      user,
      token: currentJwt,
      signin,
      refreshUser,
      register,
      updateUser,
      isFetching,
      isSignInError,
      isRegisterError,
      errorMessage,
      cleanError,
      signout
    }),
    [
      user,
      currentJwt,
      signin,
      refreshUser,
      register,
      updateUser,
      isFetching,
      isSignInError,
      isRegisterError,
      errorMessage,
      cleanError,
      signout
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
