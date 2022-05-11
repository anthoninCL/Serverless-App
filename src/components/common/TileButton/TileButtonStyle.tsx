import { Theme } from 'providers/ThemeProvider';
import { StyleSheet } from 'react-native';

export default (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderRadius: theme.normalize(16), // theme.radius.small,
      backgroundColor: theme.colors.light,
      flexDirection: 'row',
      alignItems: 'center',
      height: theme.normalize(50),
      minWidth: '47%',
      elevation: 3,
      shadowColor: theme.colors.greyMedium,
      shadowOpacity: 0.4,
      shadowRadius: theme.normalize(2),
    },
    tile: {
      width: theme.normalize(50),
      justifyContent: 'center',
      alignItems: 'center',
      height: theme.normalize(50),
    },
    textContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: theme.fontSizes.large,
    },
    left: {
      borderBottomLeftRadius: theme.normalize(16), // theme.radius.small,
      borderTopLeftRadius: theme.normalize(16), // theme.radius.small,
      // test
      // borderBottomRightRadius: theme.normalize(16),
      // borderTopRightRadius: theme.normalize(16),
    },
    right: {
      borderBottomRightRadius: theme.radius.small,
      borderTopRightRadius: theme.radius.small,
    },
  });
