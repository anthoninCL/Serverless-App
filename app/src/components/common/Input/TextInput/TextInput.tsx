/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { TextInput as RNTextInput, View } from 'react-native';
import { Types } from 'types/Types';
import { useTranslation } from 'react-i18next';
import { ColorType } from 'providers/ThemeProvider';
import useTheme from 'hooks/useTheme';
import { I18nKey } from '../../../../../i18n';
import fnStyles from './TextInputStyle';
import { ClickableIcon } from '../../ClickableIcon/ClickableIcon';

export type TextInputProps = {
  inline?: boolean;
  multiline?: boolean;
  placeholder?: string;
  placeholderKey?: I18nKey;
  value?: any;
  onChange?: (text: any) => void;
  height?: number | string;
  keyboardType?: Types['keyboardTypes'];
  editable?: boolean;
  maxLength?: number;
  secure?: boolean;
  selectionColorName?: ColorType;
  autoFocus?: boolean;
};

export const TextInput = ({
  inline,
  multiline,
  placeholder,
  placeholderKey,
  value,
  onChange = () => {},
  height,
  keyboardType = 'default',
  editable,
  maxLength,
  secure,
  autoFocus,
  selectionColorName = 'greyMedium',
}: TextInputProps) => {
  const { t } = useTranslation();
  const placeholderResult = placeholderKey ? t(placeholderKey) : placeholder;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { theme } = useTheme();
  const styles = fnStyles(theme);

  return (
    <View
      style={[
        styles.input,
        {
          alignItems: secure ? 'center' : 'flex-start',
          height: height ?? theme.sizings.high,
          paddingVertical: multiline ? theme.sizings.smallMedium : 0,
          flexDirection: 'row',
        },
        inline ? { flex: 1 } : null,
      ]}
    >
      <RNTextInput
        style={[
          styles.input,
          {
            height: height ?? theme.sizings.high,
            fontSize: theme.normalize(16),
            paddingVertical: multiline ? theme.sizings.medium : undefined,
            paddingHorizontal: theme.sizings.medium,
          },
          inline ? { flex: 1 } : null,
        ]}
        autoFocus={autoFocus ?? false}
        onChangeText={onChange}
        value={typeof value === 'number' ? value.toString() : value}
        placeholder={placeholderResult as string}
        selectionColor={theme.colors[selectionColorName]}
        keyboardType={keyboardType}
        multiline={multiline ?? false}
        editable={editable}
        maxLength={maxLength}
        secureTextEntry={secure && !isPasswordVisible}
      />
      {secure && (
        <ClickableIcon
          type="MaterialIcons"
          name={!isPasswordVisible ? 'visibility-off' : 'visibility'}
          onPress={() => setIsPasswordVisible(prevState => !prevState)}
          style={[
            {
              position: 'absolute',
              right: theme.sizings.medium,
            },
          ]}
        />
      )}
    </View>
  );
};
