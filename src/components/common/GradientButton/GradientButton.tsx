import React from 'react';
import { TouchableOpacity, View, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Types } from 'types/Types';
import useTheme from 'hooks/useTheme';
import { ColorType, FontSizeType } from 'providers/ThemeProvider';
import fnStyles from './GradientButtonStyle';
import { Icon } from '../Icon/Icon';
import { I18nKey } from '../../../../i18n';
import { JText } from '../Text/Text';

type Props = {
  label?: string;
  labelKey?: I18nKey;
  onPress: () => void;
  leftIconName?: string;
  leftIconType?: Types['iconTypes'];
  leftIconSizeName?: FontSizeType;
  leftIconColorName?: ColorType;
  rightIconName?: string;
  rightIconType?: Types['iconTypes'];
  rightIconSizeName?: FontSizeType;
  rightIconColorName?: ColorType;
  width?: number | string;
  colors?: string[];
  emptySize?: number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

export const GradientButton = (props: Props) => {
  const { theme } = useTheme();
  const styles = fnStyles(theme);

  const {
    label,
    labelKey,
    onPress = () => {},
    leftIconName,
    leftIconType,
    leftIconSizeName,
    leftIconColorName = 'light',
    rightIconName,
    rightIconType,
    rightIconSizeName,
    rightIconColorName = 'light',
    width,
    colors = [theme.colors.dark, theme.colors.greenMedium],
    emptySize = 0,
    style,
    children,
  } = props;

  return (
    <TouchableOpacity
      style={[styles.container, width ? { width } : null, style]}
      onPress={onPress}
    >
      <LinearGradient
        style={styles.gradient}
        colors={colors}
        start={[0, 0.5]}
        end={[1, 0.5]}
      >
        {leftIconName ? (
          <Icon
            type={leftIconType}
            name={leftIconName}
            sizeName={leftIconSizeName}
            colorName={leftIconColorName}
          />
        ) : (
          <View style={{ width: emptySize }} />
        )}
        {children || (
          <JText isBold label={label} labelKey={labelKey} colorName="light" />
        )}
        {rightIconName ? (
          <Icon
            type={rightIconType}
            name={rightIconName}
            sizeName={rightIconSizeName}
            colorName={rightIconColorName}
          />
        ) : (
          <View style={{ width: emptySize }} />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};
