import React, { useState } from 'react';
import {
  Button,
  StyleProp,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Types } from 'types/Types';
import { FieldMetaState } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { ColorType, FontSizeType } from 'providers/ThemeProvider';
import useTheme from 'hooks/useTheme';
import { IconButton } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import fnStyles from './FormInputStyle';
import { Icon } from '../Icon/Icon';
import { I18nKey } from '../../../../i18n';
import { JText } from '../Text/Text';
import { ViewCol, ViewRow } from '../../layouts/FlexLayout/FlexViews';
import { ClickableIcon } from '../ClickableIcon/ClickableIcon';

type Props = {
  title?: string;
  titleKey?: I18nKey;
  subtitle?: string;
  subtitleKey?: I18nKey;
  leftIconType?: Types['iconTypes'];
  leftIconName?: string;
  leftIconSizeName?: FontSizeType;
  leftIconColorName?: ColorType;
  inline?: boolean;
  multiline?: boolean;
  placeholder?: string;
  placeholderKey?: I18nKey;
  value: any;
  onChange: (text: any) => void;
  height?: number | string;
  keyboardType?: Types['keyboardTypes'];
  style?: StyleProp<ViewStyle>;
  editable?: boolean;
  maxLength?: number;
  secure?: boolean;
  selectionColorName?: ColorType;
  meta?: FieldMetaState<string | boolean | object>;
};

export const FormInput = ({
  title,
  titleKey,
  subtitle,
  subtitleKey,
  leftIconType,
  leftIconName,
  leftIconSizeName,
  leftIconColorName = 'dark',
  inline,
  multiline,
  placeholder,
  placeholderKey,
  value,
  onChange = () => {},
  height,
  keyboardType = 'default',
  style,
  editable,
  maxLength,
  secure,
  selectionColorName = 'greyMedium',
  meta,
}: Props) => {
  const { t } = useTranslation();
  const placeholderResult = placeholderKey ? t(placeholderKey) : placeholder;
  const { theme } = useTheme();
  const styles = fnStyles(theme);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View
      style={[
        styles.container,
        style,
        { flexDirection: inline ? 'row' : 'column' },
        { alignItems: inline ? 'center' : 'flex-start' },
      ]}
    >
      {(leftIconType || title || titleKey || subtitle || subtitleKey) && (
        <View style={styles.header}>
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
              <JText isBold label={title} labelKey={titleKey} />
            )}
            {(subtitle || subtitleKey) && (
              <JText isItalic label={subtitle} labelKey={subtitleKey} />
            )}
          </View>
        </View>
      )}
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
        <TextInput
          style={[
            styles.input,
            {
              width: '100%',
              height: height ?? theme.sizings.sz50,
              paddingVertical: multiline ? theme.sizings.smallMedium : 0,
              paddingRight: theme.sizings.sz50,
              paddingLeft: theme.sizings.medium,
              color: theme.colors.light,
              fontSize: theme.fontSizes.large
            },
            inline ? { flex: 1 } : null,
          ]}
          onChangeText={onChange}
          value={value}
          placeholder={placeholderResult as string}
          placeholderTextColor={theme.colors.lightHigh}
          //selectionColor={selectionColorName ? theme.colors[selectionColorName] : theme.colors.blue}
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
            colorName={'lightHigh'}
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

      {meta && meta.touched && meta.error && <Text>{meta.error}</Text>}
    </View>
  );
};
