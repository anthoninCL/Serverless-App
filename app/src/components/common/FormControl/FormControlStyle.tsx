import { Theme } from 'providers/ThemeProvider';
import { StyleSheet } from 'react-native';

export default (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      marginBottom: theme.sizings.medium,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.sizings.small,
      marginRight: theme.sizings.medium,
    },
    headerLeft: {
      minWidth: '40%',
    },
    fieldRight: {
      flex: 1,
      minHeight: theme.normalize(40),
    },
    fieldBottom: {
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
  });
