import { Theme } from 'providers/ThemeProvider';
import { StyleSheet } from 'react-native';

export default (theme: Theme) =>
  StyleSheet.create({
    container: {
      height: theme.sizings.sz50,
      paddingHorizontal: theme.sizings.larger,
      marginVertical: theme.sizings.small,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: theme.sizings.smallMedium,
      elevation: 3,
      shadowColor: theme.colors.dark,
      shadowOpacity: 0.4,
      shadowRadius: theme.sizings.tiny,
      alignSelf: 'flex-start'
    },
    label: {
      fontWeight: 'bold',
      fontSize: theme.fontSizes.large,
      textAlign: 'center',
    },
  });
