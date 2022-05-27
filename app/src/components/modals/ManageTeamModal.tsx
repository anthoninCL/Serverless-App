import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { Overlay } from "react-native-elements";
import useTheme from "../../hooks/useTheme";
import { ViewCol, ViewRow } from "../layouts/FlexLayout/FlexViews";
import { ClickableIcon } from "../common/ClickableIcon/ClickableIcon";
import { FormInput } from "../common/FormInput/FormInput";
import { ClassicButton } from "../common/ClassicButton/ClassicButton";
import { Team } from "../../types/Team";
import { AutocompleteList } from "../common/Autocomplete/AutocompleteList";
import { User } from "../../types/User";

type Props = {
  isVisible: boolean;
  onBackDropPress: () => void;
  currentTeam: Team;
  users: User[];
};

export const ManageTeamModal = (props: Props) => {
  const { theme } = useTheme();
  const [name, setName] = useState(props.currentTeam.name);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [selectedIds, setSelectedIds] = useState(props.currentTeam.members);

  console.log(props.currentTeam);
  useEffect(() => {
    setButtonEnabled(name.length > 0 && name != props.currentTeam.name);
  }, [name]);

  return (
    <Overlay
      isVisible={props.isVisible}
      onBackdropPress={props.onBackDropPress}
      overlayStyle={{ borderRadius: 10, maxWidth: 800 }}
    >
      <ViewCol style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
        <ViewRow
          align={"center"}
          justify={"space-between"}
          style={{ width: "100%" }}
        >
          <Text style={{ fontWeight: "900", fontSize: theme.fontSizes.huge }}>
            Manage {props.currentTeam.name}
          </Text>
          <ClickableIcon
            type={"IonIcons"}
            name={"close"}
            onPress={props.onBackDropPress}
            colorName={"lightHigh"}
            sizeName={"huge"}
          />
        </ViewRow>
        <Text
          style={{
            marginTop: 20,
            marginBottom: 30,
            color: theme.colors.lightHigh,
            fontSize: 18,
            paddingRight: 20,
          }}
        >
          You can modify the name of your workspace. Try to choose something
          that every members will recognize quickly.
        </Text>
        <FormInput
          value={name}
          onChange={setName}
          backgroundColor={"white"}
          placeholderKey={"common.workspaceName"}
          style={{ marginBottom: 20 }}
        />
        <AutocompleteList
          data={props.users}
          isMultiSelect
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
        />
        <ViewRow
          justify={"space-between"}
          align={"center"}
          style={{ marginTop: 20 }}
        >
          <ClassicButton
            onPress={() => {}}
            labelKey={"common.delete"}
            type={"danger"}
          />
          <ClassicButton
            onPress={() => {}}
            labelKey={"common.update"}
            type={"classic"}
            enabled={buttonEnabled}
          />
        </ViewRow>
      </ViewCol>
    </Overlay>
  );
};
