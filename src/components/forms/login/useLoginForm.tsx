import { useState, useEffect } from 'react';

const useLoginForm = (
  callback: (email: string, password: string) => Promise<void>,
) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonEnabled, setButtonEnabled] = useState(false);

  const onSubmit = async () => {
    // eslint-disable-next-line no-console
    await callback(email, password).then(() => {});
    // eslint-disable-next-line no-console
  };

  useEffect(() => {
    setButtonEnabled((email.length > 0 && password.length > 0))
  }, [email, password]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    onSubmit,
    buttonEnabled
  };
};

export default useLoginForm;
