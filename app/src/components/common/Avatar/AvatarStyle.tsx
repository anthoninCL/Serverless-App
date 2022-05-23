import { Theme } from 'providers/ThemeProvider';
import { StyleSheet } from 'react-native';

export default (theme: Theme) =>
  StyleSheet.create({
    box: {
      position: 'relative',
    },
    avatar: {
      backgroundColor: theme.colors.light,
      overflow: 'hidden',
    },
    icon: {
      backgroundColor: theme.colors.light,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
