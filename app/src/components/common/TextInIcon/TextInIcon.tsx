import React from 'react';
import {
  View,
  ViewStyle,
  StyleProp,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { Types } from 'types/Types';
import { ColorType } from 'providers/ThemeProvider';
import useTheme from 'hooks/useTheme';
import styles from './TextInIconStyle';
import { Icon } from '../Icon/Icon';

type Props = {
  iconType?: Types['iconTypes'];
  iconName?: string;
  iconColorName?: ColorType;
  image?: ImageSourcePropType;
  size?: number;
  paddingTop?: number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

export const TextInIcon = (props: Props) => {
  const { theme } = useTheme();
  const {
    iconType,
    iconName = '',
    iconColorName,
    image,
    size = theme.normalize(80),
    paddingTop,
    style,
    children,
  } = props;

  return (
    <View style={[styles.container, style]}>
      {image ? (
        <Image source={image} style={{ width: size, height: size }} />
      ) : (
        <Icon
          type={iconType}
          name={iconName}
          customSize={size}
          colorName={iconColorName}
        />
      )}
      <View style={[styles.text, { paddingTop }]}>{children}</View>
    </View>
  );
};
