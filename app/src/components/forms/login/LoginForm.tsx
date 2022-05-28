import React from "react";
import { View } from "react-native";
import { FormInput } from "components/common/FormInput/FormInput";
import { ClassicButton } from "components/common/ClassicButton/ClassicButton";
import useTheme from "hooks/useTheme";
import useLoginForm from "./useLoginForm";
import fnStyles from "./LoginFormStyle";
import { JText } from "components/common/Text/Text";

type Props = {
  onSubmit: (email: string, password: string) => Promise<void>;
  style?: object;
};

const LoginForm = (props: Props) => {
  const { email, setEmail, password, setPassword, buttonEnabled } =
    useLoginForm(props.onSubmit);
  const { theme } = useTheme();
  const styles = fnStyles(theme);

  return (
    <View>
      <JText style={styles.title} labelKey={"auth.signinToYourAccount"} />
      <JText style={styles.subtitle} labelKey={"auth.signinSubtitle"} />
      <View style={{ height: 40 }} />
      <FormInput
        value={email}
        onChange={setEmail}
        placeholderKey={"auth.email"}
        style={styles.input}
      />
      <FormInput
        value={password}
        onChange={setPassword}
        placeholderKey={"auth.password"}
        style={styles.input}
        secure
      />
      <ClassicButton
        onPress={() => {
          props.onSubmit(email, password);
        }}
        labelKey={"auth.signin"}
        type={"classic"}
        enabled={buttonEnabled}
        style={styles.button}
      />
    </View>
  );
};

export default LoginForm;
