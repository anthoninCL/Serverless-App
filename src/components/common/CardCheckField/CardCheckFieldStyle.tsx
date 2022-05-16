import { Theme } from 'providers/ThemeProvider';
import { StyleSheet } from 'react-native';

export default (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
      marginVertical: theme.sizings.medium,
      backgroundColor: theme.colors.greyLight,
      padding: theme.sizings.medium,
      borderRadius: theme.radius.large,
      shadowColor: theme.colors.greyMedium,
      shadowOpacity: 0.4,
      shadowRadius: theme.normalize(2),
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
