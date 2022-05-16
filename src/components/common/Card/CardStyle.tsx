import { Theme } from 'providers/ThemeProvider';
import { StyleSheet } from 'react-native';

export default (theme: Theme, device: string) =>
  StyleSheet.create({
    card: {
      borderRadius: theme.radius.rounded,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.light,
      elevation: 3,
      shadowColor: theme.colors.greyMedium,
      shadowOpacity: 0.4,
      shadowRadius: theme.sizings.tiny,
      shadowOffset: {
        width: 0,
        height: theme.sizings.tiny,
      },
      overflow: 'hidden',
      margin: theme.sizings.tiny,
      borderWidth: device === 'ios' ? theme.normalize(1) : 0,
      borderColor: device === 'ios' ? theme.colors.greyLight : 'transparent',
    },
  });
