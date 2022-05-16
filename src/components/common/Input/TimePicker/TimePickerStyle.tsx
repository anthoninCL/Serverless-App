import { Theme } from 'providers/ThemeProvider';
import { StyleSheet } from 'react-native';

export default (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginBottom: theme.sizings.medium,
    },
    containerPicker: {
      flexDirection: 'row',
      width: '100%',
      marginBottom: theme.sizings.medium,
    },
    minutePicker: {
      flex: 6,
      padding: 1,
      borderColor: 'transparent',
      backgroundColor: 'rgb(235, 235, 235)',
      borderRadius: theme.sizings.smallMedium,
      marginRight: 3,
      fontSize: theme.fontSizes.large,
    },
    hourPicker: {
      flex: 5,
      padding: 1,
      borderColor: 'transparent',
      backgroundColor: 'rgb(235, 235, 235)',
      borderRadius: theme.sizings.smallMedium,
      marginRight: 3,
      fontSize: theme.fontSizes.large,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.sizings.small,
      marginRight: theme.sizings.medium,
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
    input: {
      padding: theme.sizings.medium,
      width: '100%',
      backgroundColor: theme.colors.greyLight,
      borderRadius: theme.sizings.smallMedium,
    },
  });
