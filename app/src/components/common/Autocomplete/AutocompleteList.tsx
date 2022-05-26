import React, { useState } from "react";
import Autocomplete from "react-native-autocomplete-input";
import { Text } from "react-native";
import { useEffect } from "react";
import { StyleProp, ViewStyle, View } from "react-native";
import fnStyles from "./AutocompleteListStyle";
import useTheme from "hooks/useTheme";

type Props = {
  style?: StyleProp<ViewStyle>;
  data: String[];
};

export const AutocompleteList = (props: Props) => {
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  const { theme } = useTheme();
  const styles = fnStyles(theme);

  const { style, data } = props;

  useEffect(() => {
    if (search.length > 0) {
      setFilteredData(() =>
        data.filter(
          (dataItem) =>
            dataItem.toLowerCase().indexOf(search.toLowerCase()) > -1
        )
      );
    } else {
      setFilteredData(data);
    }
  }, [search]);

  return (
    <View style={style}>
      <Autocomplete
        listContainerStyle={styles.listStyle}
        data={filteredData}
        onChangeText={(text) => setSearch(text)}
        flatListProps={{
          renderItem: ({ item }) => <Text>{item}</Text>,
        }}
      />
    </View>
  );
};
