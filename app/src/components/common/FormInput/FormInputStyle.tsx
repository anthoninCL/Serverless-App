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
      width: '100%',
      backgroundColor: "#242424",
      borderRadius: 8,
      borderColor: "#393939",
      borderWidth: 1
    },
  });
