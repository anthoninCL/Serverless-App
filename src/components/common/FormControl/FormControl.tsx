/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Types } from 'types/Types';
import { ColorType, FontSizeType } from 'providers/ThemeProvider';
import useTheme from 'hooks/useTheme';
import { Field } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { Icon } from '../Icon/Icon';
import { I18nKey } from '../../../../i18n';
import { JText } from '../Text/Text';
import Input, { InputProps } from '../Input/Input';
import fnStyles from './FormControlStyle';
import { ViewRow } from '../../layouts/FlexLayout/FlexViews';

type Props = InputProps & {
  title?: string;
  titleKey?: I18nKey;
  subtitle?: string;
  subtitleKey?: I18nKey;
  leftIconType?: Types['iconTypes'];
  leftIconName?: string;
  leftIconSizeName?: FontSizeType;
  leftIconColorName?: ColorType;
  inline?: boolean;
  style?: StyleProp<ViewStyle>;
  editable?: boolean;
  rightIconName?: string;
  name: string;
  required?: boolean;
  validate?: (value: any) => void | undefined | string;
  type?: string;
  onChange?: (value: any) => void;
  autoCompleteUrl?: string;
};

const keepEmptyValue = (value: any) => (value === '' ? null : value);

export const FormControl = ({
  title,
  titleKey,
  subtitle,
  subtitleKey,
  leftIconType,
  leftIconName,
  leftIconSizeName,
  leftIconColorName = 'dark',
  inline = false,
  style,
  editable,
  name,
  validate,
  required = false,
  type = 'text',
  onChange = () => {},
  ...rest
}: Props) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = fnStyles(theme);

  const reqRule = (value: any) =>
    value !== '' && value != null ? undefined : t('common.fieldRequired');
  const checkboxReq = (value: any) =>
    value === true ? undefined : t('common.fieldRequired');

  let validator = !validate && required ? reqRule : validate;

  validator = type === 'checkbox' && required ? checkboxReq : validator;

  return (
    <View style={[styles.container, style]}>
      <Field
        validate={validator}
        required={required}
        parse={keepEmptyValue}
        name={name}
      >
        {({ input, meta }) => {
          return (
            <View
              style={[
                style,
                {
                  flexDirection: inline ? 'row' : 'column',
                  alignItems: inline ? 'center' : 'flex-start',
                  justifyContent: inline ? 'space-between' : 'flex-start',
                },
              ]}
            >
              <View style={[styles.header, inline && styles.headerLeft]}>
                {leftIconType && (
                  <Icon
                    type={leftIconType}
                    name={leftIconName ?? ''}
                    sizeName={leftIconSizeName}
                    colorName={leftIconColorName}
                    style={styles.icon}
                  />
                )}
                <View style={styles.headerText}>
                  {(title || titleKey) && (
                    <ViewRow>
                      <JText isBold label={title} labelKey={titleKey} />
                      {required && <JText label="*" />}
                    </ViewRow>
                  )}
                  {(subtitle || subtitleKey) && (
                    <JText isItalic label={subtitle} labelKey={subtitleKey} />
                  )}
                </View>
              </View>
              <View style={inline ? styles.fieldRight : styles.fieldBottom}>
                <Input
                  {...input}
                  {...rest}
                  onChange={(val: any) => {
                    onChange(val);
                    input.onChange(val);
                  }}
                  type={type}
                  style={{ width: '100%' }}
                />
                {meta && meta.touched && meta.error && (
                  <JText colorName="statusDangerHigh" label={meta.error} />
                )}
              </View>
            </View>
          );
        }}
      </Field>
    </View>
  );
};
