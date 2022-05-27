import { signInWithEmailAndPassword } from "firebase/auth";
import React, { createContext, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { auth } from "../firebase";
import { User } from "../types/User";
import { removeStoredData, storeData } from "../utils/fnAsyncStorage";

type Auth = {
  user?: User;
  token?: string;
  signin: (identifier: string, password: string) => Promise<boolean | User>;
  refreshUser: () => void; // should return Promise<User>
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean | User>;
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
  const { t } = useTranslation();
  const [user, setUser] = useState<User>();
  const [currentJwt, setCurrentJwt] = useState<string | undefined>(undefined);
  const [isFetching, setIsFetching] = useState(false);
  const [isSignInError, setIsSignInError] = useState(false);
  const [isRegisterError, setIsRegisterError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const signout = useCallback(async () => {
    await removeStoredData("token");
  }, []);

  const refreshUser = useCallback(async () => {}, [signout]);

  const signin = useCallback(
    async (email: string, password: string): Promise<boolean | User> => {
      const payload = {
        identifier: email,
        password,
      };

      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        setCurrentJwt(res.user["accessToken"]);
        await storeData("token", res.user["accessToken"]);
        fetch(
          `https://europe-west1-messengerserverless.cloudfunctions.net/webApi/api/v1/user/${res.user["uid"]}`,
          {
            headers: {
              Authorization: `Bearer ${res.user["accessToken"]}`,
            },
          }
        )
          .then((res) => res.json())
          .then((res: User) => {
            setUser(res);
          });
      } catch (error) {
        console.log(error.message);
        return false;
      }

      return true;
    },
    [refreshUser]
  );

  const register = useCallback(
    async (
      username: string,
      email: string,
      password: string
    ): Promise<boolean> => {
      const payload = {
        username,
        email,
        password,
      };

      await fetch(
        `https://europe-west1-messengerserverless.cloudfunctions.net/webApi/api/v1/authentication/signup`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            name: username,
            password: password,
            firstName: "test",
            lastName: "test",
            email: email,
            photo: "test",
          }),
        }
      ).catch((error) => {
        console.log(error);
        setIsRegisterError(true);
        setErrorMessage(error.message);
      });
      return true;
    },
    [t]
  );

  const cleanError = useCallback(() => {
    setIsSignInError(false);
    setIsRegisterError(false);
    setErrorMessage(undefined);
  }, []);

  const updateUser = useCallback(
    async (payload) => {
      setIsFetching(true);
    },
    [user, refreshUser]
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
      signout,
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
      signout,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
