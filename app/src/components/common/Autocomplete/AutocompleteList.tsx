import React, { useState } from "react";
import Autocomplete from "react-native-autocomplete-input";
import { Text } from "react-native";
import { useEffect } from "react";
import { StyleProp, ViewStyle, View } from "react-native";
import fnStyles from "./AutocompleteListStyle";
import useTheme from "hooks/useTheme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "components/common/Icon/Icon";
import { ViewRow } from "../../layouts/FlexLayout/FlexViews";
import { User } from "../../../types/User";

type Props = {
  style?: StyleProp<ViewStyle>;
  data: User[];
  isMultiSelect?: boolean;
};

export const AutocompleteList = (props: Props) => {
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedList, setSelectedList] = useState([]);

  const { theme } = useTheme();
  const styles = fnStyles(theme);

  const { style, data, isMultiSelect } = props;

  useEffect(() => {
    if (search.length > 0) {
      setFilteredData(() =>
        data.filter(
          (dataItem: User) =>
            dataItem.name.toLowerCase().indexOf(search.toLowerCase()) > -1
        )
      );
    } else {
      setFilteredData(data);
    }
  }, [search]);

  const manageSelectedUsers = (item: string) => {
    const idx = selectedList.indexOf(item);
    if (idx === -1) {
      const tmpList = [...selectedList];
      tmpList.push(item);
      setSelectedList(tmpList);
      const tmpListFiltered = [...filteredData];
      const idx = tmpListFiltered.indexOf(item);
      tmpListFiltered.splice(idx, 1);
      tmpListFiltered.unshift(item);
      setFilteredData(tmpListFiltered);
    } else {
      const tmpList = [...selectedList];
      tmpList.splice(idx, 1);
      setSelectedList(tmpList);
    }
  };

  return (
    <View style={style}>
      <Autocomplete
        listContainerStyle={styles.listStyle}
        data={filteredData}
        onChangeText={(text) => setSearch(text)}
        flatListProps={{
          renderItem: ({ item }) => (
            <TouchableOpacity
              onPress={() => isMultiSelect && manageSelectedUsers(item)}
            >
              <ViewRow style={{ width: "20%" }} justify={"space-between"}>
                <Text>{item.name}</Text>
                {isMultiSelect && selectedList.indexOf(item) !== -1 && (
                  <Icon
                    name="check"
                    type="FontAwesome5"
                    colorName={"#42AA58"}
                    sizeName={theme.sizings.small}
                  />
                )}
              </ViewRow>
            </TouchableOpacity>
          ),
        }}
      />
    </View>
  );
};
