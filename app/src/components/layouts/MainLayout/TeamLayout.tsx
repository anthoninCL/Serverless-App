import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { ViewCol } from "../FlexLayout/FlexViews";
import { Team } from "types/Team";
import { Avatar } from "../../common/Avatar/Avatar";
import useTheme from "../../../hooks/useTheme";
import { ClickableIcon } from "../../common/ClickableIcon/ClickableIcon";
import { CreateTeamModal } from "../../modals/CreateTeamModal";
import useUser from "../../../hooks/useUser";

type Props = {
  teams?: Team[];
  currentTeam?: number;
  onTeamClicked: (newValue: number) => void;
};

export const TeamLayout = (props: Props) => {
  const { theme } = useTheme();
  const [isOverlayVisible, setOverlayVisibility] = useState(false);
  const { fetchUsers, users } = useUser();

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleVisibility = () => {
    setOverlayVisibility(!isOverlayVisible);
  };

  return (
    <ViewCol
      justify={"center"}
      style={{
        paddingVertical: 20,
        height: "100%",
        width: "20%",
        minWidth: 60,
        borderTopWidth: 1,
        borderTopColor: "#393939",
      }}
    >
      {props.teams &&
        props.teams.map((team, key) => {
          return (
            <TouchableOpacity
              key={key}
              onPress={() => props.onTeamClicked(key)}
              style={{ marginBottom: 20 }}
            >
              <Avatar
                sizeName={"high"}
                style={{
                  backgroundColor: "#fff",
                  borderWidth: props.currentTeam === key ? 5 : 0,
                  borderColor: "#FFF",
                  borderRadius: theme.sizings.high / 5,
                }}
              />
            </TouchableOpacity>
          );
        })}
      {props.teams?.length < 5 && (
        <ClickableIcon
          type={"IonIcons"}
          name={"add"}
          onPress={() => {
            setOverlayVisibility(true);
          }}
          colorName={"lightHighPlus"}
          sizeName={"huge"}
        />
      )}
      <CreateTeamModal
        isVisible={isOverlayVisible}
        onBackDropPress={toggleVisibility}
        users={users}
      />
    </ViewCol>
  );
};
