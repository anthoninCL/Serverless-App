import { Theme } from 'providers/ThemeProvider';
import { StyleSheet } from 'react-native';

export default (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: theme.normalize(5),
    },
    label: {
      marginLeft: theme.normalize(10),
    },
    icon: {
      padding: theme.normalize(5),
    },
  });
