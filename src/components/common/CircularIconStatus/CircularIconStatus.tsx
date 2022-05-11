import useTheme from 'hooks/useTheme';
import { ColorType, FontSizeType, Theme } from 'providers/ThemeProvider';
import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  ImageBackground,
  ImageSourcePropType,
} from 'react-native';
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
      position: 'relative',
    },
    status: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
  });

type Props = {
  backgroundColorName?: ColorType;
  padding?: number;
  iconType: Types['iconTypes'];
  iconName: string;
  iconSizeName?: FontSizeType;
  iconColorName?: ColorType;
  statusIconType?: Types['iconTypes'];
  statusIconName?: string;
  statusIconColorName?: ColorType;
  style?: StyleProp<ViewStyle>;
  image?: ImageSourcePropType;
};

export const CircularIconStatus = (props: Props) => {
  const { theme } = useTheme();
  const {
    backgroundColorName = 'dark',
    padding = theme.normalize(5),
    iconType,
    iconName,
    iconSizeName = 'large',
    iconColorName,
    statusIconType,
    statusIconName,
    statusIconColorName,
    style,
    image,
  } = props;

  const backTheme = backgroundTheme(
    iconSizeName,
    padding,
    backgroundColorName,
    theme,
  );

  return (
    <View style={[style, backTheme.background]}>
      {image ? (
        <View
          style={{
            backgroundColor: theme.colors.light,
            overflow: 'hidden',
            width: '90%',
            height: '90%',
            borderRadius: theme.fontSizes.fs50,
          }}
        >
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        </View>
      ) : (
        <Icon
          type={iconType}
          name={iconName}
          sizeName={iconSizeName}
          colorName={iconColorName}
        />
      )}
      {statusIconName && statusIconType && statusIconColorName && (
        <Icon
          type={statusIconType}
          name={statusIconName}
          customSize={theme.fontSizes[iconSizeName] / 2}
          colorName={statusIconColorName}
          style={[backTheme.status]}
        />
      )}
    </View>
  );
};
