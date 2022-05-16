import useTheme from 'hooks/useTheme';
import { ColorType, FontSizeType, Theme } from 'providers/ThemeProvider';
import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { Icon } from '../../Icon/Icon';

const checkBoxTheme = (
  backgroundColor: string,
  borderColor: string,
  sizeName: FontSizeType,
  value: boolean,
  theme: Theme,
) =>
  StyleSheet.create({
    container: {
      width: theme.fontSizes[sizeName] + 10,
      height: theme.fontSizes[sizeName] + 10,
      borderRadius:
        Platform.OS === 'ios' ? (theme.fontSizes[sizeName] + 10) / 2 : 10,
      borderWidth: 1,
      borderColor,
      backgroundColor: value ? backgroundColor : theme.colors.light,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

type CheckBoxProps = {
  value?: any;
  onPress?: (value: any) => void;
  backgroundColor?: string;
  borderColor?: string;
  iconColorName?: ColorType;
  sizeName?: FontSizeType;
  style?: StyleProp<ViewStyle>;
};

export const CheckBox = ({
  value = false,
  onPress = () => {},
  backgroundColor,
  borderColor,
  iconColorName = 'light',
  sizeName = 'large',
  style,
}: CheckBoxProps) => {
  const { theme } = useTheme();

  const ctheme = checkBoxTheme(
    backgroundColor ?? theme.colors.dark,
    borderColor ?? theme.colors.dark,
    sizeName,
    value,
    theme,
  );

  return (
    <TouchableOpacity
      style={[ctheme.container, style]}
      onPress={() => onPress(!value)}
    >
      {value ? (
        Platform.OS === 'ios' ? (
          <Icon
            type="IonIcons"
            name="checkmark"
            sizeName={sizeName}
            colorName={iconColorName}
          />
        ) : (
          <Icon
            type="FontAwesome"
            name="check"
            sizeName={sizeName}
            colorName={iconColorName}
          />
        )
      ) : null}
    </TouchableOpacity>
  );
};
