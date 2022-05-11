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
import { Icon } from '../Icon/Icon';

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
      borderRadius: 4,
      borderWidth: 1,
      borderColor: value ? theme.colors.blue : borderColor,
      backgroundColor: value ? theme.colors.blue : backgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

type Props = {
  value: boolean;
  onPress: (value: boolean) => void;
  backgroundColor?: string;
  borderColor?: string;
  iconColorName?: ColorType;
  sizeName?: FontSizeType;
  style?: StyleProp<ViewStyle>;
};

export const CheckBox = (props: Props) => {
  const { theme } = useTheme();

  const {
    backgroundColor = theme.colors.greyMedium,
    borderColor = theme.colors.greyLight,
    iconColorName = 'light',
    sizeName = 'large',
  } = props;

  const ctheme = checkBoxTheme(
    backgroundColor,
    borderColor,
    sizeName,
    props.value,
    theme,
  );

  const onPress = () => {
    props.onPress(!props.value);
  };

  return (
    <TouchableOpacity style={[ctheme.container, props.style]} onPress={onPress}>
      {props.value ? (
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
