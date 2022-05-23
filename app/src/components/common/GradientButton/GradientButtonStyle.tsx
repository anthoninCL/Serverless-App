import { StyleSheet } from 'react-native';
import { Theme } from 'providers/ThemeProvider';

export default (theme: Theme) =>
  StyleSheet.create({
    container: {
      height: theme.normalize(50),
      borderRadius: theme.normalize(25),
      elevation: 3,
      shadowColor: theme.colors.greyMedium,
      shadowOpacity: 0.4,
      shadowRadius: theme.normalize(2),
    },
    label: {
      color: 'white',
      fontSize: theme.sizings.large,
      alignSelf: 'center',
    },
    gradient: {
      paddingHorizontal: theme.normalize(10),
      borderRadius: theme.radius.counter,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: '100%',
      zIndex: -10,
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
    },
  });
