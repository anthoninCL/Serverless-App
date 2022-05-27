import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { Overlay } from "react-native-elements";
import useTheme from "../../hooks/useTheme";
import { ViewCol, ViewRow } from "../layouts/FlexLayout/FlexViews";
import { ClickableIcon } from "../common/ClickableIcon/ClickableIcon";
import { FormInput } from "../common/FormInput/FormInput";
import { ClassicButton } from "../common/ClassicButton/ClassicButton";
import { MultiSelectList } from "../common/MultiSelectList/MultiSelectList";
import { AutocompleteList } from "../common/Autocomplete/AutocompleteList";

type Props = {
  isVisible: boolean;
  onBackDropPress: () => void;
};

export const CreateTeamModal = (props: Props) => {
  const { theme } = useTheme();
  const [name, setName] = useState("");
  const [buttonEnabled, setButtonEnabled] = useState(false);

  useEffect(() => {
    setButtonEnabled(name.length > 0);
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
            Create a team
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
          You need to choose the name of your workspace. Try to choose something
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
          data={["Thomas", "Mathieux", "Antho la merde", "Lucas le roi "]}
          isMultiSelect
        />
        <ViewRow align={"center"} style={{ marginTop: 20 }}>
          <Text
            style={{
              color: theme.colors.lightHigh,
              fontSize: 15,
              paddingRight: 80,
            }}
          >
            Before creating your workspace, make sure you're not doing any
            mistake by adding wrong people to your team.
          </Text>
          <ClassicButton
            onPress={() => {}}
            labelKey={"common.create"}
            type={"classic"}
            enabled={buttonEnabled}
          />
        </ViewRow>
      </ViewCol>
    </Overlay>
  );
};
