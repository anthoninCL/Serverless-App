import useTheme from 'hooks/useTheme';
import { ColorType, FontSizeType } from 'providers/ThemeProvider';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, ViewStyle, StyleProp } from 'react-native';
import { Types } from 'types/Types';
import { I18nKey } from '../../../../i18n';

type Props = {
  label?: string | boolean;
  labelKey?: I18nKey;
  valuesKey?: object;
  colorName?: ColorType;
  fontWeight?: Types['fontWeights'];
  sizeName?: FontSizeType;
  isUppercase?: boolean;
  isBold?: boolean;
  isItalic?: boolean;
  centered?: boolean;
  right?: boolean;
  isTitleText?: boolean;
  isButtonText?: boolean;
  style?: object;
};

export const JText = ({
  label,
  labelKey,
  valuesKey,
  colorName,
  fontWeight,
  sizeName,
  isUppercase = false,
  isBold = false,
  isItalic = false,
  centered = false,
  right = false,
  isTitleText = false,
  isButtonText = false,
  style,
}: Props) => {
  const { t } = useTranslation();

  const { theme } = useTheme();

  const labelResult = labelKey ? t(labelKey, valuesKey) : label;

  const font = () => {
    const defaultColor = theme.colors.dark;

    if (isTitleText) {
      return {
        fontSize: sizeName ? theme.fontSizes[sizeName] : theme.fontSizes.default,
        fontWeight: fontWeight || '700',
        marginBottom: theme.sizings.large,
        color: colorName ? theme.colors[colorName] : theme.colors.dark,
      };
    }

    if (isButtonText) {
      return {
        fontSize: sizeName
          ? theme.fontSizes[sizeName]
          : theme.fontSizes.fs18,
        fontWeight: fontWeight || '700',
        color: colorName ? theme.colors[colorName] : defaultColor,
      };
    }

    return {
      fontSize: sizeName ? theme.fontSizes[sizeName] : theme.fontSizes.default,
      color: colorName ? theme.colors[colorName] : defaultColor,
    };
  };

  const templateFont = font();

  return (
    <Text
      style={[
        isBold ? { fontWeight: '700' } : { fontWeight },
        isUppercase && { textTransform: 'uppercase' },
        templateFont,
        {
          textAlign: centered ? 'center' : right ? 'right' : 'left',
          fontStyle: isItalic ? 'italic' : 'normal',
        },
        style,
      ]}
    >
      {labelResult as string}
    </Text>
  );
};
