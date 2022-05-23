import { Theme } from 'providers/ThemeProvider';
import { StyleSheet } from 'react-native';

export default (theme: Theme) =>
  StyleSheet.create({
    dividerHorizontal: {
      borderBottomWidth: 1,
      marginVertical: theme.sizings.medium,
    },
    dividerVertical: {
      borderRightWidth: 1,
      height: theme.sizings.larger,
      width: 2,
    },
  });
