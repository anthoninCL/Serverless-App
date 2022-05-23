import { Theme } from 'providers/themeProvider';
import { StyleSheet } from 'react-native';

export default (theme: Theme) =>
  StyleSheet.create({
    input: {
      width: '100%',
      backgroundColor: theme.colors.greyLight,
      borderRadius: theme.sizings.smallMedium,
    },
  });
