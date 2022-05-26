import { Theme } from "providers/ThemeProvider";
import { StyleSheet } from "react-native";

export default (theme: Theme) =>
  StyleSheet.create({
    listStyle: {
      maxHeight: 75,
      minHeight: 75,
      shadowColor: theme.colors.greyMedium,
      shadowOpacity: 0.4,
      shadowRadius: 0.5,
      shadowOffset: {
        width: 0,
        height: 0.5,
      },
    },
  });
