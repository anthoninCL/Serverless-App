import React, { useState } from "react";
import {View, Text, TouchableOpacity, ActivityIndicator} from "react-native";
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
import { getStoredData } from "../../../utils/fnAsyncStorage";
import useChannel from "../../../hooks/useChannel";
import useFriend from "../../../hooks/useFriend";

type Props = {
  channels?: Channel[];
  friends?: Friend[];
  currentConv?: number;
  currentTeam: string;
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
  const { fetchChannels, deleteChannel, updateChannel, createChannel, isFetching: isChannelFetching } = useChannel();
  const { isFetching: isFriendFetching } = useFriend();
  const [uid, setUid] = useState("");

  const retrieveUid = async () => {
    const value = await getStoredData("uid");
    setUid(value);
  };

  useEffect(() => {
    retrieveUid();
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

  const getFriendName = (friends: string[], users: User[]) => {
    const idx = friends.indexOf(uid);
    if (idx != -1) {
      friends.splice(idx, 1);
    }
    const indexUser = users.map((user: User) => user.id).indexOf(friends[0]);
    if (indexUser != -1) {
      return users[indexUser].name;
    }
    return "";
  };

  useEffect(() => {
    fetchChannels(props.currentTeam);
  }, [props.currentTeam, createChannel, deleteChannel, updateChannel]);

  return (
    <View>
      <ViewCol style={{ marginTop: 20, marginBottom: 80 }}>
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
        {!isChannelFetching ? (props.channels &&
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
          })) : <ActivityIndicator />}
        {channelsOpen && (
          <TouchableOpacity
            onPress={toggleChannelModal}
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
        {!isFriendFetching ? (props.friends &&
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
                    {getFriendName(friend.users, users)}
                  </Text>
                </ViewRow>
              </TouchableOpacity>
            ) : (
              <View />
            );
          })) : <ActivityIndicator/>}
        {friendsOpen && (
          <TouchableOpacity
            onPress={toggleFriendModal}
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
        createChannel={createChannel}
        currentTeam={props.currentTeam}
      />
      <CreateFriendModal
        isVisible={isFriendModalVisible}
        onBackDropPress={toggleFriendModal}
        users={users}
      />
    </View>
  );
};
