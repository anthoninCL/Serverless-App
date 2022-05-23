import { Theme } from 'providers/ThemeProvider';
import { StyleSheet } from 'react-native';

export default (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignSelf: 'flex-start',
      alignItems: 'center',
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      marginTop: theme.sizings.medium,
      textAlign: 'center',
    },
  });
