import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { ViewCol, ViewRow } from "../FlexLayout/FlexViews";
import { User } from "types/User";
import { Team } from "types/Team";
import { Channel } from "../../../types/Channel";
import { Friend } from "../../../types/Friend";
import { TeamLayout } from "./TeamLayout";
import { Avatar } from "../../common/Avatar/Avatar";
import { CurrentTeamLayout } from "./CurrentTeamLayout";
import { ConvLayout } from "./ConvLayout";
import { UserModal } from "../../modals/UserModal";
import { UpdateProfileModal } from "../../modals/UpdateProfileModal";
import { ChatHeaderLayout } from "../ChatHeaderLayout/ChatHeaderLayout";

type Props = {
  children?: React.ReactNode;
  teams?: Team[];
  channels?: Channel[];
  friends?: Friend[];
  currentTeam?: number;
  currentConv?: number;
  currentUser: User;
  isCurrentConvPrivate?: boolean;
  onTeamClicked: (newValue: number) => void;
  onConvClicked: (newValue: number) => void;
  setCurrentConvPrivacy: (newValue: boolean) => void;
  signOut: () => void;
  deleteAccount: () => void;
};

export const MainLayout = (props: Props) => {
  const [isUserModalVisible, setUserModalVisibility] = useState(false);
  const [isProfileModalVisible, setProfileModalVisibility] = useState(false);

  const onProfilePicClicked = () => {
    setUserModalVisibility(!isUserModalVisible);
  };

  const removeProfileModal = () => {
    setUserModalVisibility(false);
  };

  const toggleProfileModalVisible = () => {
    setProfileModalVisibility(!isProfileModalVisible);
    removeProfileModal();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={removeProfileModal}
      style={{ flex: 1 }}
    >
      <ViewCol>
        <ViewRow
          align={"center"}
          justify={"space-between"}
          style={{
            backgroundColor: "#000",
            height: "5%",
            minHeight: 55,
            width: "100%",
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        >
          <View />
          <Text style={{ color: "#FFF", fontWeight: "600" }}>
            Club Manchot | {props.teams[props.currentTeam]?.name} |{" "}
            {props.isCurrentConvPrivate
              ? typeof props.friends[props.currentConv].friendId === "string"
                ? props.friends[props.currentConv].friendId
                : props.friends[props.currentConv].friendId.name
              : props.channels[props.currentConv]?.name}
          </Text>
          <TouchableOpacity onPress={onProfilePicClicked}>
            <Avatar sizeName={"sz35"} />
          </TouchableOpacity>
        </ViewRow>
        <ViewRow align={"center"} justify={"center"} style={{ flex: 1 }}>
          <ViewRow
            style={{
              height: "100%",
              width: "17%",
              minWidth: 200,
              backgroundColor: "#171630",
            }}
          >
            <TeamLayout
              onTeamClicked={props.onTeamClicked}
              teams={props.teams}
              currentTeam={props.currentTeam}
            />
            <ViewCol
              style={{
                height: "100%",
                borderWidth: 1,
                borderBottomWidth: 0,
                borderRightWidth: 0,
                borderColor: "#393939",
              }}
            >
              <CurrentTeamLayout team={props.teams[props.currentTeam]} />
              <ConvLayout
                setCurrentConvPrivacy={props.setCurrentConvPrivacy}
                onConvClicked={props.onConvClicked}
                channels={props.channels}
                friends={props.friends}
                currentConv={props.currentConv}
                isCurrentConvPrivate={props.isCurrentConvPrivate}
              />
            </ViewCol>
          </ViewRow>
          <ViewRow style={{ flex: 1, height: "100%", backgroundColor: "#FFF" }}>
            <ViewCol>
              <ChatHeaderLayout {...props} />
              {props.children}
            </ViewCol>
          </ViewRow>
        </ViewRow>
        <UserModal
          currentUser={props.currentUser}
          isModalVisible={isUserModalVisible}
          navigateToProfile={toggleProfileModalVisible}
          deleteAccount={props.deleteAccount}
          signOut={props.signOut}
        />
        <UpdateProfileModal
          isVisible={isProfileModalVisible}
          onBackDropPress={toggleProfileModalVisible}
          currentUser={props.currentUser}
        />
      </ViewCol>
    </TouchableOpacity>
  );
};
