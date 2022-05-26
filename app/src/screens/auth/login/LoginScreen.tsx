import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "navigation/RootStackParamList";
import { AuthLayout } from "components/layouts/AuthLayout/AuthLayout";
import LoginForm from "components/forms/login/LoginForm";
import { Divider } from "components/common/Divider/Divider";
import { JText } from "components/common/Text/Text";
import { TextButton } from "components/common/TextButton/TextButton";
import fnStyles from "./LoginScreenStyle";
import useTheme from "hooks/useTheme";
import { View } from "react-native";
import { ViewRow } from "components/layouts/FlexLayout/FlexViews";
import useAuth from "hooks/useAuth";
import useAlert from "providers/AlertProvider";
import { useTranslation } from "react-i18next";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";

export type ScreenProps = NativeStackScreenProps<RootStackParamList, "login">;

const LoginScreen = ({ navigation }: ScreenProps) => {
  const { theme } = useTheme();
  const styles = fnStyles(theme);
  const { setAlert } = useAlert();
  const { t } = useTranslation();
  const { signin, isSignInError: isFetchingError } = useAuth();

  const handleNoAccountYet = () => {
    navigation.navigate("register");
  };

  const handleLogin = async (email: string, password: string) => {
    const isUserLogged = await signin(email, password);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Root");
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (isFetchingError) {
      setAlert({
        color: theme.colors.statusDangerHigh,
        message: t("alert.invalidCredentials"),
        title: t("alertTitle.invalidCredentials"),
      });
    }
  }, [isFetchingError, setAlert, t, theme]);

  return (
    <AuthLayout>
      <View
        style={{
          flex: 1,
          width: "65%",
          paddingTop: 50,
        }}
      >
        <LoginForm onSubmit={handleLogin} />
        <View
          style={{
            flex: 1,
          }}
        >
          <Divider style={styles.divider} />
          <ViewRow align={"center"}>
            <JText style={styles.navigation} labelKey={"auth.noAccountYet"} />
            <TextButton
              onPress={handleNoAccountYet}
              labelKey={"auth.register"}
              fontSizeName={"large"}
              isBold={true}
            />
          </ViewRow>
        </View>
      </View>
    </AuthLayout>
  );
};

export default LoginScreen;
