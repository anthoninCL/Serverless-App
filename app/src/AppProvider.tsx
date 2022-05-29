import React, { Suspense } from "react";
import { Text } from "react-native";
import { LoadingProvider } from "providers/LoadingProvider";
import { ThemeProvider } from "providers/ThemeProvider";
import { AuthProvider } from "providers/AuthProvider";
import { UserProvider } from "./providers/UserProvider";
import { AlertProvider } from "./providers/AlertProvider";
import { TeamProvider } from "./providers/TeamProvider";
import { FriendProvider } from "./providers/FriendProvider";
import { ChannelProvider } from "./providers/ChannelProvider";
import {MessageProvider} from "./providers/MessageProvider";

type Props = {
  children: JSX.Element;
};

const AppProvider = ({ children }: Props) => (
  <Suspense fallback={<Text />}>
    <ThemeProvider>
      <LoadingProvider>
        <AlertProvider>
          <AuthProvider>
            <UserProvider>
              <FriendProvider>
                <ChannelProvider>
                  <MessageProvider>
                    <TeamProvider>{children}</TeamProvider>
                  </MessageProvider>
                </ChannelProvider>
              </FriendProvider>
            </UserProvider>
          </AuthProvider>
        </AlertProvider>
      </LoadingProvider>
    </ThemeProvider>
  </Suspense>
);

export default AppProvider;
