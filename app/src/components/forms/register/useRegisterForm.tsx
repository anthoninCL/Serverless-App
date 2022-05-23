import { useState, useEffect } from 'react';

const useRegisterForm = (
  callback: (username: string, email: string, password: string) => Promise<void>,
) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [buttonEnabled, setButtonEnabled] = useState(false);

  const onSubmit = async () => {
    // eslint-disable-next-line no-console
    await callback(username, email, password).then(() => {});
    // eslint-disable-next-line no-console
  };

  const onTermsCheckboxClicked = () => {
    setTermsAgreed(val => !val);
  };

  useEffect(() => {
    setButtonEnabled((termsAgreed && email.length > 0 && username.length > 0 && password.length > 0 && confirmPassword.length > 0 && password === confirmPassword))
  }, [termsAgreed, email, username, password, confirmPassword]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUsername,
    confirmPassword,
    setConfirmPassword,
    termsAgreed,
    onSubmit,
    onTermsCheckboxClicked,
    buttonEnabled
  };
};

export default useRegisterForm;
