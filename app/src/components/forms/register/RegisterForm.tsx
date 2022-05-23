import React from 'react';
import {Text, View} from 'react-native';
import {ViewRow} from 'components/layouts/FlexLayout/FlexViews';
import {FormInput} from "components/common/FormInput/FormInput";
import {CheckBox} from "components/common/CheckBox/CheckBox";
import {ClassicButton} from "components/common/ClassicButton/ClassicButton";
import useTheme from 'hooks/useTheme';
import useRegisterForm from "./useRegisterForm";
import fnStyles from './RegisterFormStyle';
import {JText} from "components/common/Text/Text";
import {useTranslation} from 'react-i18next';

type Props = {
  onSubmit: (username: string, email: string, password: string) => Promise<void>;
  style?: object;
};

const RegisterForm = (props: Props) => {
  const {
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    termsAgreed,
    onTermsCheckboxClicked,
    buttonEnabled
  } = useRegisterForm(props.onSubmit);
  const {theme} = useTheme();
  const styles = fnStyles(theme);
  const {t} = useTranslation();

  return (
    <View>
      <JText style={styles.title} labelKey={"auth.setUpAccount"}/>
      <JText style={styles.subtitle} labelKey={"auth.setUpAccountExplanation"}/>
      <View style={{height: 40}}/>
      <FormInput value={username} onChange={setUsername} placeholderKey={"auth.username"} style={styles.input}/>
      <FormInput value={email} onChange={setEmail} placeholderKey={"auth.email"} style={styles.input}/>
      <FormInput value={password} onChange={setPassword} placeholderKey={"auth.password"} style={styles.input} secure/>
      <FormInput value={confirmPassword} onChange={setConfirmPassword} placeholderKey={"auth.confirmPassword"}
                 style={styles.input} secure/>
      <ViewRow align={"center"} style={{marginVertical: theme.sizings.sz25}}>
        <CheckBox value={termsAgreed} onPress={onTermsCheckboxClicked} style={{marginRight: 15}}/>
        <Text style={styles.termsLabel}>
          {t('terms.agreeWith')}
          <Text style={styles.termsLinks}>
            {t('terms.terms')}
          </Text>
          {t('terms.and')}
          <Text style={styles.termsLinks}>
            {t('terms.privacyPolicy')}
          </Text>
          {t('terms.pleaseAgree')}
        </Text>
      </ViewRow>
      <ClassicButton onPress={() => {
      }} labelKey={"auth.register"} type={'classic'} enabled={buttonEnabled}/>
    </View>
  );
};

export default RegisterForm;
