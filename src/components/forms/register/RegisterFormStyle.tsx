import {Theme} from 'providers/ThemeProvider';
import {StyleSheet} from 'react-native';

export default (theme: Theme) =>
  StyleSheet.create({
    title: {
      color: theme.colors.light,
      fontSize: theme.fontSizes.fs30,
      fontWeight: "900"
    },
    subtitle: {
      color: theme.colors.lightHigh,
      fontSize: theme.fontSizes.large,
      fontWeight: '500',
      marginTop: theme.sizings.sz15
    },
    input: {
      marginVertical: theme.sizings.sz15,
    },
    termsContainer: {
      marginVertical: theme.sizings.sz25,
    },
    termsLabel: {
      color: theme.colors.lightHigh,
      fontSize: theme.fontSizes.fs15,
      fontWeight: '500'
    },
    termsLinks: {
      color: theme.colors.blue,
      fontWeight: 'bold'
    },
    divider: {
      marginVertical: theme.sizings.sz25,
    },
    navigation: {
      color: theme.colors.lightHigh,
      fontSize: theme.fontSizes.large,
      fontWeight: '600'
    }
  });
