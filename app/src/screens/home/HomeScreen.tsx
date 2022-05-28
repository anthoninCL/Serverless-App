import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "navigation/RootStackParamLis";
import { MainLayout } from "../../components/layouts/MainLayout/MainLayout";
import { MessageComponent } from "../../components/common/ChatMessage/ChatMessage";
import { Message } from "../../types/Message";
import { User } from "../../types/User";
import dayjs from "dayjs";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { Team } from "../../types/Team";
import { Channel } from "../../types/Channel";
import { Friend } from "../../types/Friend";
import { ViewCol } from "../../components/layouts/FlexLayout/FlexViews";
import useAuth from "../../hooks/useAuth";
import { ChatHeaderLayout } from "../../components/layouts/ChatHeaderLayout/ChatHeaderLayout";
import useTeam from "../../hooks/useTeam";
import useUser from "../../hooks/useUser";
import useFriend from "../../hooks/useFriend";
import useChannel from "../../hooks/useChannel";
import {getStoredData} from "../../utils/fnAsyncStorage";

export type ScreenProps = NativeStackScreenProps<RootStackParamList, "home">;

const HomeScreen = ({ navigation }: ScreenProps) => {
  const [currentTeam, setCurrentTeam] = useState(0);
  const [isCurrentConvPrivate, setCurrentConvPrivacy] = useState(false);
  const [currentConv, setCurrentConv] = useState(0);
  const { signout } = useAuth();
  const { fetchTeams, teams, isFetching: isTeamFetching } = useTeam();
  const { fetchFriends, friends } = useFriend();
  const { fetchChannels, channels } = useChannel();
  const { fetchUsers, users, fetchUser } = useUser();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const uid = await getStoredData('uid');
      console.log("Le uid le david => ", uid);
      const res = await fetchUser(uid);
      console.log("Le res de ses morts => ", res);
      setUser(res);
    }

    getUser().catch(console.error);
  }, []);

  useEffect(() => {
    fetchTeams();
    fetchFriends();
    fetchUsers();
  }, []);

  console.log(friends);
  //console.log(team);

  //const {theme} = useTheme();
  //const styles = fnStyles(theme);

  /*const renderMessage = (props) => {
    return (
      <View>
        <ViewCol>
          <MessageComponent
            previousMessage={props.previousMessage}
            currentMessage={props.currentMessage}
            nextMessage={props.nextMessage}
            // TODO: regarder si le message est un post ou non pour changer la couleur
            backgroundColor={
              props.currentMessage.user._id === users[0].id
                ? "#E4E4E4"
                : "white"
            }
          />
        </ViewCol>
      </View>
    );
  };*/

  const signOut = () => {
    signout();
    navigation.reset({
      index: 0,
      routes: [{ name: "login" }],
    });
  };

  const deleteAccount = () => {
    // deleteAccount(currentUser.id);
    navigation.reset({
      index: 0,
      routes: [{ name: "login" }],
    });
  };

  // TODO remove comments when authentication is on
  useEffect(() => {
    const checkToken = async () => {
      const token = await getStoredData('token');
      if (!token) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'login'}],
        });
      }
    }

    checkToken().catch(console.error);
  }, []);

  return (
    <>
      {!isTeamFetching ? (
        <MainLayout
          currentTeam={currentTeam}
          isCurrentConvPrivate={isCurrentConvPrivate}
          currentConv={currentConv}
          onTeamClicked={setCurrentTeam}
          setCurrentConvPrivacy={setCurrentConvPrivacy}
          setCurrentTeam={setCurrentTeam}
          onConvClicked={setCurrentConv}
          teams={teams}
          channels={channels}
          friends={friends}
          currentUser={user}
          signOut={signOut}
          deleteAccount={deleteAccount}
          users={users}
        >
          {/*<GiftedChat
            messages={messages}
            onSend={(messages) => onMessageSend(messages)}
            user={{
              _id:
                messages && messages.length % 5 === 0
                  ? users[0].id
                  : users[1].id,
              name:
                messages && messages.length % 5 === 0
                  ? users[0].name
                  : users[1].name,
              avatar: undefined,
            }}
            placeholder="Type you message here..."
            renderMessage={(renderMessage)}
          />*/}
        </MainLayout>
      ) : (
        <View />
      )}
    </>
  );
};

export default HomeScreen;
