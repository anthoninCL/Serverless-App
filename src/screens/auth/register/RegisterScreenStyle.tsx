import {Theme} from 'providers/ThemeProvider';
import {StyleSheet} from 'react-native';

export default (theme: Theme) =>
  StyleSheet.create({
    divider: {
      marginVertical: theme.sizings.sz25,
    },
    navigation: {
      color: theme.colors.lightHigh,
      fontSize: theme.fontSizes.large,
      fontWeight: '600'
    }
  });
