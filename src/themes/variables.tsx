import { Platform } from 'react-native';

export const Theme = {
  fonts: {
    fontTitle: 'Montserrat_600SemiBold, sans-serif',
    fontBasic: 'Roboto_400Regular, sans-serif',
    fontBody: 'Avenir, sans-serif',
  },
  colors: {
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
    tiny: 2,
    small: 4,
    smallMedium: 8,
    ten: 10,
    medium: 12,
    mediumLarge: 16,
    large: 20,
    larger: 30,
    high: 40,
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
    tiny: Platform.OS === 'ios' ? 12 : 8,
    small: Platform.OS === 'ios' ? 14 : 10,
    default: Platform.OS === 'ios' ? 16 : 12,
    medium: Platform.OS === 'ios' ? 18 : 14,
    large: Platform.OS === 'ios' ? 20 : 16,
    larger: Platform.OS === 'ios' ? 24 : 20,
    largest: Platform.OS === 'ios' ? 32 : 24,
    huge: Platform.OS === 'ios' ? 48 : 36,
  },
};
