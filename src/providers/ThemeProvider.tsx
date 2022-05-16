import React, { createContext, useMemo } from 'react';
import { PixelRatio, useWindowDimensions } from 'react-native';

export type Theme = {
  fonts: {
    fontTitle: string;
    fontBasic: string;
    fontBody: string;
  };
  colors: {
    transparent: string;
    dark: string;
    light: string;
    lightHigh: string;
    greyLight: string;
    greyMedium: string;
    greyHigh: string;
    greenMedium: string;
    statusDangerHigh: string;
    statusWarningHigh: string;
    blue: string;
  };
  sizings: {
    tiny: number;
    small: number;
    smallMedium: number;
    ten: number;
    medium: number;
    mediumLarge: number;
    large: number;
    larger: number;
    high: number;
    sz15: number;
    sz25: number;
    sz50: number;
    sz60: number;
    sz95: number;
    sz120: number;
  };
  radius: {
    small: number;
    medium: number;
    large: number;
    rounded: number;
    roundedBorders: number;
    counter: number;
  };
  fontSizes: {
    tiny: number;
    small: number;
    default: number;
    medium: number;
    large: number;
    larger: number;
    largest: number;
    huge: number;
    fs15: number;
    fs18: number;
    fs30: number;
    fs40: number;
    fs50: number;
  };
  screen: {
    width: number;
    height: number;
    scale: number;
  };
  normalize: (pixel: number, based?: 'width' | 'height') => number;
  normalizeFont: (pixel: number) => number;
};
export type ColorType = keyof Theme['colors'];
export type FontSizeType = keyof Theme['fontSizes'];
export type SizingsType = keyof Theme['sizings'];
export type RadiusType = keyof Theme['radius'];
// Use iPhoneXR as base size which is 414 x 667
const baseWidth = 414;
const baseHeight = 896;

const getTheme = (width: number, height: number, scale: number): Theme => {
  const widthBaseScale = width / baseWidth;
  const heightBaseScale = height / baseHeight;

  const normalize = (pixel: number, based: 'width' | 'height' = 'width') => {
    const newSize =
      based === 'height' ? pixel * heightBaseScale : pixel * widthBaseScale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  };
  const normalizeFont = (size: number) => {
    return Math.round(normalize(size) / PixelRatio.getFontScale());
  };
  return {
    fonts: {
      fontTitle: 'Roboto_600SemiBold',
      fontBasic: 'Roboto_400Regular',
      fontBody: 'Avenir',
    },
    colors: {
      transparent: 'transparent',
      dark: '#000000',
      light: '#ffffff',
      lightHigh: '#868686',
      greyLight: '#393939',
      greyMedium: '#242424',
      greyHigh: '#131313',
      greenMedium: '#42AA58',
      statusDangerHigh: '#B3003A',
      statusWarningHigh: '#EA8D01',
      blue: '#5486E8'
    },
    sizings: {
      tiny: 2,
      small: 4,
      smallMedium: 8,
      ten: 10,
      medium: 12,
      mediumLarge: 16,
      large: 20,
      larger: 30,
      high: 40,
      sz15: 15,
      sz25: 25,
      sz50: 50,
      sz60: 60,
      sz95: 95,
      sz120: 120,
    },
    radius: {
      small: 4,
      medium: 10,
      large: 36,
      rounded: 30,
      roundedBorders: 34,
      counter: 25,
    },
    fontSizes: {
      tiny: 8,
      small: 10,
      default: 12,
      medium: 14,
      large: 16,
      larger: 20,
      largest: 24,
      huge: 36,
      fs15: 15,
      fs18: 18,
      fs30: 30,
      fs40: 40,
      fs50: 50,
    },
    normalize,
    normalizeFont,
    screen: {
      width,
      height,
      scale,
    },
  };
};

export const ThemeContext: React.Context<{ theme: Theme }> = createContext({
  theme: getTheme(baseWidth, baseHeight, 1),
});

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const { width, height, scale } = useWindowDimensions();

  const context = useMemo(() => {
    return {
      theme: getTheme(width, height, scale),
    };
  }, [width, height, scale]);

  return (
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  );
};
