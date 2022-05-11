import useTheme from 'hooks/useTheme';
import { ColorType, FontSizeType, Theme } from 'providers/ThemeProvider';
import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Types } from 'types/Types';
import { Icon } from '../Icon/Icon';

const backgroundTheme = (
  iconSizeName: FontSizeType,
  padding: number,
  backgroundColorName: ColorType,
  theme: Theme,
) =>
  StyleSheet.create({
    background: {
      width: theme.fontSizes[iconSizeName] * 1.5 + padding * 2,
      height: theme.fontSizes[iconSizeName] * 1.5 + padding * 2,
      borderRadius: theme.fontSizes[iconSizeName] + padding,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors[backgroundColorName],
    },
  });

type Props = {
  backgroundColorName?: ColorType;
  padding?: number;
  iconType: Types['iconTypes'];
  iconName: string;
  iconSizeName?: FontSizeType;
  iconColorName?: ColorType;
  style?: StyleProp<ViewStyle>;
};

export const CircularIcon = (props: Props) => {
  const { theme } = useTheme();
  const {
    backgroundColorName = 'dark',
    padding = theme.normalize(5),
    iconType,
    iconName,
    iconSizeName = 'large',
    iconColorName,
    style,
  } = props;

  const backTheme = backgroundTheme(
    iconSizeName,
    padding,
    backgroundColorName,
    theme,
  );

  return (
    <View style={[style, backTheme.background]}>
      <Icon
        type={iconType}
        name={iconName}
        sizeName={iconSizeName}
        colorName={iconColorName}
      />
    </View>
  );
};
