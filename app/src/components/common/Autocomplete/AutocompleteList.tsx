import React, { useState } from "react";
import Autocomplete from "react-native-autocomplete-input";
import { Text } from "react-native";
import { useEffect } from "react";
import { StyleProp, ViewStyle, View } from "react-native";

type Props = {
  style?: StyleProp<ViewStyle>;
  data: String[];
};

export const AutocompleteList = (props: Props) => {
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

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
        data={filteredData}
        onChangeText={(text) => setSearch(text)}
        flatListProps={{
          renderItem: ({ item }) => <Text>{item}</Text>,
        }}
      />
    </View>
  );
};
