import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import { Types } from 'types/Types';
import useTheme from 'hooks/useTheme';
import { ColorType, FontSizeType } from 'providers/ThemeProvider';
import styles from './IconicTextStyle';
import { Icon } from '../Icon/Icon';
import { I18nKey } from '../../../../i18n';
import { JText } from '../Text/Text';

type Props = {
  label?: string;
  labelKey?: I18nKey;
  valuesKey?: object;
  textColorName?: ColorType;
  isBold?: boolean;
  fontSizeName?: FontSizeType;
  iconType?: Types['iconTypes'];
  iconName?: string;
  iconSizeName?: FontSizeType;
  iconCustomSize?: number;
  iconColorName?: ColorType;
  spacing?: number;
  paddingTop?: number;
  style?: StyleProp<ViewStyle>;
};

export const IconicText = (props: Props) => {
  const { theme } = useTheme();

  const {
    label,
    labelKey,
    valuesKey,
    textColorName = 'dark',
    isBold = false,
    fontSizeName = 'large',
    iconType,
    iconName,
    iconSizeName,
    iconCustomSize,
    iconColorName,
    spacing = theme.sizings.medium,
    paddingTop = 5,
    style,
  } = props;

  return (
    <View style={[styles.container, style]}>
      {iconName && (
        <Icon
          type={iconType}
          name={iconName}
          sizeName={iconSizeName}
          customSize={iconCustomSize}
          colorName={iconColorName}
        />
      )}

      <JText
        colorName={textColorName}
        sizeName={fontSizeName}
        isBold={isBold}
        style={{
          marginLeft: iconName ? theme.normalize(spacing) : 0,
          paddingVertical: theme.normalize(paddingTop),
        }}
        label={label}
        labelKey={labelKey}
        valuesKey={valuesKey}
      />
    </View>
  );
};
