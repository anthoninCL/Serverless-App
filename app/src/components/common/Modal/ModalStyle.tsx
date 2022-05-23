import { Dimensions, StyleSheet } from 'react-native';
import { Theme } from 'providers/ThemeProvider';

export default (theme: Theme) =>
  StyleSheet.create({
    modal: {
      borderRadius: theme.normalize(30),
      paddingHorizontal: theme.normalize(30),
      width:
        Dimensions.get('window').width -
        (theme.sizings.mediumLarge + theme.sizings.tiny) * 2,
      padding: theme.sizings.larger,
    },
  });
