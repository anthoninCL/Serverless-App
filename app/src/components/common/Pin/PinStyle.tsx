import { Theme } from 'providers/ThemeProvider';
import { StyleSheet } from 'react-native';

export default (theme: Theme) =>
  StyleSheet.create({
    card: {
      alignSelf: 'flex-start',
      paddingVertical: theme.sizings.small,
      paddingHorizontal: theme.sizings.medium,
    },
    badge: {
      alignSelf: 'flex-start',
      paddingVertical: theme.sizings.tiny,
      backgroundColor: theme.colors.statusRed,
      minHeight: theme.sizings.large,
      minWidth: theme.sizings.larger,
    },
  });
