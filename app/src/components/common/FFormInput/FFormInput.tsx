import React from 'react';
import { useTranslation } from 'react-i18next';
import { Field } from 'react-final-form';
import Input from './Input';

type Props = {
  name: string;
  required?: boolean;
  validate?: (val: object | string | boolean) => string | undefined;
  type?: string;
};

const FFormInput = ({
  name,
  required = false,
  validate,
  type = 'text',
  ...rest
}: Props) => {
  const { t } = useTranslation();
  const reqRule = (val: object | string | boolean): string | undefined =>
    val !== '' && val != null ? undefined : t('common.fieldRequired');
  const checkboxReq = (val: object | string | boolean): string | undefined =>
    val === true ? undefined : t('common.fieldRequired');

  let validator = !validate && required ? reqRule : validate;

  validator = type === 'checkbox' && required ? checkboxReq : validator;

  return (
    <Field
      name={name}
      validate={validator}
      required={required}
      render={({ input, meta, extra }) => (
        <Input
          {...rest}
          type={type}
          value={input.value}
          onChange={input.onChange}
        />
      )}
    />
  );
};

export default FFormInput;
