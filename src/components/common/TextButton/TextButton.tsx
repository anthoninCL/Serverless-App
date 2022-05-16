import useTheme from 'hooks/useTheme';
import { ColorType, FontSizeType } from 'providers/ThemeProvider';
import React from 'react';
import { TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import { Types } from 'types/Types';
import { I18nKey } from '../../../../i18n';
import { IconicText } from '../IconicText/IconicText';
import { JText } from '../Text/Text';

type Props = {
  label?: string;
  labelKey?: I18nKey;
  onPress: () => void;
  colorName?: ColorType;
  isBold?: boolean;
  fontSizeName?: FontSizeType;
  iconType?: Types['iconTypes'];
  iconName?: string;
  iconSizeName?: FontSizeType;
  iconColorName?: ColorType;
  // spacing?: number;
  style?: StyleProp<ViewStyle>;
};

export const TextButton = ({
  label,
  labelKey,
  onPress,
  colorName = 'blue',
  isBold = false,
  fontSizeName,
  iconType,
  iconName,
  iconSizeName,
  iconColorName,
  style,
}: Props) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      style={[{ paddingVertical: theme.sizings.small }, style]}
      onPress={onPress}
    >
      {iconType ? (
        <IconicText
          label={label as string}
          labelKey={labelKey}
          textColorName={colorName}
          isBold={isBold}
          fontSizeName={fontSizeName}
          iconType={iconType}
          iconName={iconName ?? ''}
          iconSizeName={iconSizeName}
          iconColorName={iconColorName}
        />
      ) : (
        <JText
          colorName={colorName}
          sizeName={fontSizeName}
          label={label}
          labelKey={labelKey}
          isBold={isBold}
        />
      )}
    </TouchableOpacity>
  );
};
