import { Theme } from 'providers/ThemeProvider';
import { StyleSheet } from 'react-native';

export default (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginBottom: theme.sizings.medium,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.sizings.small,
      marginRight: theme.sizings.medium,
      width: '100%',
    },
    icon: {
      marginRight: theme.sizings.medium,
    },
    headerText: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginVertical: theme.sizings.small,
    },
    subtitle: {
      fontStyle: 'italic',
    },
    input: {
      padding: theme.sizings.medium,
      width: '100%',
      backgroundColor: theme.colors.greyLight,
      borderRadius: theme.sizings.smallMedium,
    },
  });
