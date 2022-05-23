import { Theme } from 'providers/ThemeProvider';
import { StyleSheet } from 'react-native';

export default (theme: Theme) =>
  StyleSheet.create({
    daysLabelWrapper: {
      paddingTop: theme.sizings.medium,
      paddingBottom: theme.sizings.medium,
      width: '100%',
      backgroundColor: theme.colors.greyLight,
      borderTopWidth: 0,
      borderBottomWidth: 0,
      height: theme.normalize(50),
    },
    headerWrapperStyle: {
      backgroundColor: theme.colors.dark,
      height: theme.normalize(50),
      marginBottom: 0,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    container: {
      // flex: 1,
      backgroundColor: theme.colors.light,
      borderWidth: 1,
      borderColor: theme.colors.greyLight,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
  });
