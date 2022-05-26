import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { Overlay } from "react-native-elements";
import useTheme from "../../hooks/useTheme";
import { ViewCol, ViewRow } from "../layouts/FlexLayout/FlexViews";
import { ClickableIcon } from "../common/ClickableIcon/ClickableIcon";
import { ClassicButton } from "../common/ClassicButton/ClassicButton";
import { AutocompleteList } from "../common/Autocomplete/AutocompleteList";

type Props = {
  isVisible: boolean;
  onBackDropPress: () => void;
};

export const CreateFriendModal = (props: Props) => {
  const { theme } = useTheme();
  const [buttonEnabled, setButtonEnabled] = useState(false);

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
            Add a friend
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
          You can add friends to talk with them in private messages. Don't
          worry, you can remove them if they're annoying.
        </Text>
        <AutocompleteList
          data={[
            "Thomas",
            "Mathieux",
            "Antho la merde",
            "Lucas le roi de ce monde sérieux il est trop fort",
          ]}
        />
        <ViewRow align={"center"} style={{ marginTop: 20 }}>
          <Text
            style={{
              color: theme.colors.lightHigh,
              fontSize: 15,
              paddingRight: 80,
            }}
          >
            Before adding this friend, make sure you're not doing any mistake by
            adding wrong people to your friends.
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
