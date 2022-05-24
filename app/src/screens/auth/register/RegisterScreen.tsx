import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "navigation/RootStackParamList";
import { AuthLayout } from "components/layouts/AuthLayout/AuthLayout";
import { Divider } from "components/common/Divider/Divider";
import { JText } from "components/common/Text/Text";
import { TextButton } from "components/common/TextButton/TextButton";
import fnStyles from "./RegisterScreenStyle";
import useTheme from "hooks/useTheme";
import { View } from "react-native";
import { ViewRow } from "components/layouts/FlexLayout/FlexViews";
import RegisterForm from "components/forms/register/RegisterForm";
import useAlert from "providers/AlertProvider";
import { useTranslation } from "react-i18next";
import useAuth from "hooks/useAuth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";

export type ScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "register"
>;

const RegisterScreen = ({ navigation }: ScreenProps) => {
  const { theme } = useTheme();
  const styles = fnStyles(theme);
  const { setAlert } = useAlert();
  const { t } = useTranslation();
  const { register, isRegisterError: isFetchingError } = useAuth();

  const handleAlreadyHaveAnAccount = () => {
    navigation.navigate("login");
  };

  const handleRegister = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate("Root");
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (isFetchingError) {
      setAlert({
        color: theme.colors.statusDangerHigh,
        message: t("alert.error"),
        title: t("alertTitle.error"),
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
        <RegisterForm onSubmit={handleRegister} />
        <View style={{ flex: 1 }}>
          <Divider style={styles.divider} />
          <ViewRow align={"center"}>
            <JText
              style={styles.navigation}
              labelKey={"auth.alreadyHaveAnAccount"}
            />
            <TextButton
              onPress={handleAlreadyHaveAnAccount}
              labelKey={"auth.signin"}
              fontSizeName={"large"}
              isBold={true}
            />
          </ViewRow>
        </View>
      </View>
    </AuthLayout>
  );
};

export default RegisterScreen;
