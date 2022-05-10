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
    greyLight: string;
    greyMedium: string;
    greyHigh: string;
    greenMedium: string;
    statusDangerHigh: string;
    statusWarningHigh: string;
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
      fontTitle: 'Montserrat_600SemiBold',
      fontBasic: 'Roboto_400Regular',
      fontBody: 'Avenir',
    },
    colors: {
      transparent: 'transparent',
      dark: '#000000',
      light: '#ffffff',
      greyLight: '#EBEBEB',
      greyMedium: '#969696',
      greyHigh: '#1D1C26',
      greenMedium: '#42AA58',
      statusDangerHigh: '#B3003A',
      statusWarningHigh: '#EA8D01',
    },
    sizings: {
      tiny: normalize(2),
      small: normalize(4),
      smallMedium: normalize(8),
      ten: normalize(10),
      medium: normalize(12),
      mediumLarge: normalize(16),
      large: normalize(20),
      larger: normalize(30),
      high: normalize(40),
      sz50: normalize(50),
      sz60: normalize(60),
      sz95: normalize(95),
      sz120: normalize(120),
    },
    radius: {
      small: normalize(4),
      medium: normalize(10),
      large: normalize(36),
      rounded: normalize(30),
      roundedBorders: normalize(34),
      counter: normalize(25),
    },
    fontSizes: {
      tiny: normalizeFont(8),
      small: normalizeFont(10),
      default: normalizeFont(12),
      medium: normalizeFont(14),
      large: normalizeFont(16),
      larger: normalizeFont(20),
      largest: normalizeFont(24),
      huge: normalizeFont(36),
      fs18: normalizeFont(18),
      fs30: normalizeFont(30),
      fs40: normalizeFont(40),
      fs50: normalizeFont(50),
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
