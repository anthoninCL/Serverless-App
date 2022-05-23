import useTheme from 'hooks/useTheme';
import React from 'react';
import { StyleProp, View, ViewStyle, Platform } from 'react-native';
import fnStyles from './CardStyle';

type Props = {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  padding?: number;
};

export const Card = (props: Props) => {
  const device = Platform.OS;
  const { theme } = useTheme();
  const styles = fnStyles(theme, device);
  const { style, children, padding = theme.sizings.mediumLarge } = props;

  return <View style={[styles.card, { padding }, style]}>{children}</View>;
};
