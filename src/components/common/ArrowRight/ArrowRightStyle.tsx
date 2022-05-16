import { StyleSheet } from 'react-native';
import { Theme } from 'providers/ThemeProvider';

export default (theme: Theme) =>
  StyleSheet.create({
    arrow: {
      alignSelf: 'center',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      width: theme.sizings.high,
    },
  });
