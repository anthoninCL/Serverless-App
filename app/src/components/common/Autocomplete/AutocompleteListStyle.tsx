import { Theme } from "providers/ThemeProvider";
import { StyleSheet } from "react-native";

export default (theme: Theme) =>
  StyleSheet.create({
    listStyle: {
      maxHeight: 100,
      minHeight: 100,
    },
  });
