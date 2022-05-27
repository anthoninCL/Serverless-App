import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ViewCol, ViewRow } from "../FlexLayout/FlexViews";
import { Avatar } from "../../common/Avatar/Avatar";
import useTheme from "../../../hooks/useTheme";
import { ClickableIcon } from "../../common/ClickableIcon/ClickableIcon";
import { Channel } from "../../../types/Channel";
import { Friend } from "../../../types/Friend";
import { CreateChannelModal } from "../../modals/CreateChannelModal";
import { CreateFriendModal } from "../../modals/CreateFriendModal";
import { User } from "../../../types/User";
import useUser from "../../../hooks/useUser";
import { useEffect } from "react";

type Props = {
  channels?: Channel[];
  friends?: Friend[];
  currentConv?: number;
  isCurrentConvPrivate?: boolean;
  onConvClicked: (newValue: number) => void;
  setCurrentConvPrivacy: (newValue: boolean) => void;
};

export const ConvLayout = (props: Props) => {
  const { theme } = useTheme();
  const [channelsOpen, setChannelsOpen] = useState(true);
  const [friendsOpen, setFriendsOpen] = useState(true);
  const [isChannelModalVisible, setChannelModalVisibility] = useState(false);
  const [isFriendModalVisible, setFriendModalVisibility] = useState(false);
  const { fetchUsers, users } = useUser();

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleChannelModal = () => {
    setChannelModalVisibility(!isChannelModalVisible);
  };

  const toggleFriendModal = () => {
    setFriendModalVisibility(!isFriendModalVisible);
  };

  const selectConv = (key: number, isPrivate: boolean) => {
    props.setCurrentConvPrivacy(isPrivate);
    props.onConvClicked(key);
  };

  const onChannelArrowClicked = () => {
    setChannelsOpen(!channelsOpen);
  };

  const onFriendsArrowClicked = () => {
    setFriendsOpen(!friendsOpen);
  };

  return (
    <ScrollView>
      <ViewCol style={{ marginTop: 20 }}>
        <ViewRow style={{ paddingLeft: 10, paddingVertical: 5 }}>
          <ClickableIcon
            type={"AntDesign"}
            name={channelsOpen ? "caretdown" : "caretright"}
            onPress={onChannelArrowClicked}
            colorName={"lightHighPlus"}
            sizeName={"default"}
          />
          <Text
            style={{
              color: theme.colors.lightHighPlus,
              fontSize: theme.fontSizes.large,
              marginLeft: 10,
            }}
          >
            Channels
          </Text>
        </ViewRow>
        {props.channels &&
          props.channels.map((channel, key) => {
            return channelsOpen ||
              (props.currentConv === key && !props.isCurrentConvPrivate) ? (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  selectConv(key, false);
                }}
                style={{
                  backgroundColor:
                    props.currentConv === key && !props.isCurrentConvPrivate
                      ? theme.colors.blue
                      : null,
                  paddingVertical: 5,
                  paddingHorizontal: 20,
                }}
              >
                <Text
                  style={{
                    color:
                      props.currentConv === key && !props.isCurrentConvPrivate
                        ? theme.colors.light
                        : theme.colors.lightHighPlus,
                    fontSize: theme.fontSizes.large,
                  }}
                >
                  # {channel.name}
                </Text>
              </TouchableOpacity>
            ) : null;
          })}
        {channelsOpen && (
          <TouchableOpacity
            onPress={() => {}}
            style={{ paddingVertical: 5, paddingHorizontal: 15 }}
          >
            <ViewRow align={"center"}>
              <ClickableIcon
                type={"Entypo"}
                name={"plus"}
                onPress={toggleChannelModal}
                colorName={"lightHighPlus"}
                sizeName={"larger"}
                style={{
                  backgroundColor: "#32324A",
                  width: 25,
                  height: 25,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
              <Text
                style={{
                  color: theme.colors.lightHighPlus,
                  fontSize: theme.fontSizes.large,
                  marginLeft: 5,
                  marginTop: 4,
                }}
              >
                Add channels
              </Text>
            </ViewRow>
          </TouchableOpacity>
        )}
      </ViewCol>
      <ViewCol
        style={{
          marginBottom: 20,
          marginTop:
            friendsOpen && channelsOpen
              ? 20
              : !friendsOpen && channelsOpen
              ? 72
              : friendsOpen && !channelsOpen
              ? 0
              : 52,
        }}
      >
        <ViewRow style={{ paddingLeft: 10, paddingVertical: 5 }}>
          <ClickableIcon
            type={"AntDesign"}
            name={friendsOpen ? "caretdown" : "caretright"}
            onPress={onFriendsArrowClicked}
            colorName={"lightHighPlus"}
            sizeName={"default"}
          />
          <Text
            style={{
              color: theme.colors.lightHighPlus,
              fontSize: theme.fontSizes.large,
              marginLeft: 10,
            }}
          >
            Direct messages
          </Text>
        </ViewRow>
        {props.friends &&
          props.friends.map((friend, key) => {
            return friendsOpen ||
              (props.currentConv === key && props.isCurrentConvPrivate) ? (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  selectConv(key, true);
                }}
                style={{
                  backgroundColor:
                    props.currentConv === key && props.isCurrentConvPrivate
                      ? theme.colors.blue
                      : null,
                  paddingVertical: 5,
                  paddingHorizontal: 20,
                }}
              >
                <ViewRow align={"center"}>
                  <Avatar sizeName={"sz25"} />
                  <Text
                    style={{
                      marginLeft: 10,
                      marginTop: 2,
                      color:
                        props.currentConv === key && props.isCurrentConvPrivate
                          ? theme.colors.light
                          : theme.colors.lightHighPlus,
                      fontSize: theme.fontSizes.large,
                    }}
                  >
                    {typeof friend.friendId === "string"
                      ? friend.friendId
                      : friend.friendId.name}
                  </Text>
                </ViewRow>
              </TouchableOpacity>
            ) : (
              <View />
            );
          })}
        {friendsOpen && (
          <TouchableOpacity
            onPress={() => {}}
            style={{ paddingVertical: 5, paddingHorizontal: 15 }}
          >
            <ViewRow align={"center"}>
              <ClickableIcon
                type={"Entypo"}
                name={"plus"}
                onPress={toggleFriendModal}
                colorName={"lightHighPlus"}
                sizeName={"larger"}
                style={{
                  backgroundColor: "#32324A",
                  width: 25,
                  height: 25,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
              <Text
                style={{
                  color: theme.colors.lightHighPlus,
                  fontSize: theme.fontSizes.large,
                  marginLeft: 5,
                  marginTop: 4,
                }}
              >
                Add friends
              </Text>
            </ViewRow>
          </TouchableOpacity>
        )}
      </ViewCol>
      <CreateChannelModal
        isVisible={isChannelModalVisible}
        onBackDropPress={toggleChannelModal}
      />
      <CreateFriendModal
        isVisible={isFriendModalVisible}
        onBackDropPress={toggleFriendModal}
        users={users}
      />
    </ScrollView>
  );
};
