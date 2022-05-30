import React, { useCallback, useEffect, useState } from "react";
import {ActivityIndicator, View} from "react-native";
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
import {useMessage} from "../../hooks/useMessage";

export type ScreenProps = NativeStackScreenProps<RootStackParamList, "home">;

const HomeScreen = ({ navigation }: ScreenProps) => {
  const [currentTeam, setCurrentTeam] = useState(0);
  const [isCurrentConvPrivate, setCurrentConvPrivacy] = useState(false);
  const [currentConv, setCurrentConv] = useState(0);
  const { signout } = useAuth();
  const { fetchTeams, teams, isFetching: isTeamFetching } = useTeam();
  const { fetchFriends, friends, fetchFriendMessages, sendFriendMessages, isMessagesFetching } = useFriend();
  const { fetchChannelMessages, sendChannelMessages, isMessagesFetching: isChannelMessagesFetching } = useMessage();
  const { fetchChannels, channels } = useChannel();
  const { fetchUsers, users, fetchUser } = useUser();
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<IMessage[]>();
  const [realMessages, setRealMessages] = useState<Message[]>([]);
  const [needToRefresh, setNeedToRefresh] = useState(0);

  useEffect(() => {
    const getUser = async () => {
      const uid = await getStoredData('uid');
      const res = await fetchUser(uid);
      setUser(res);
    }

    getUser().catch(console.error);
  }, []);

  useEffect(() => {
    fetchTeams();
    fetchFriends();
    fetchUsers();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      if (friends && friends[currentConv]) {
        const fetchedMessages = await fetchFriendMessages(friends[currentConv].id);
        if (fetchedMessages && fetchedMessages.length > 0) {
          setRealMessages(fetchedMessages);
        } else {
          setRealMessages([]);
        }
      }
    };

    const getChannelMessages = async () => {
      if (channels && channels[currentConv] && teams && teams[currentTeam]) {
        const fetchedMessages = await fetchChannelMessages(teams[currentTeam]?.id, channels[currentConv].id);
        if (fetchedMessages && fetchedMessages.length > 0) {
          setRealMessages(fetchedMessages);
        } else {
          setRealMessages([]);
        }
      }
    };

    if (isCurrentConvPrivate) {
      getMessages().catch(console.error);
    } else {
      getChannelMessages().catch(console.error);
    }
  }, [currentConv, isCurrentConvPrivate, needToRefresh, friends, channels]);

  //const {theme} = useTheme();
  //const styles = fnStyles(theme);

  const renderMessage = (props) => {
    return (
      <View>
        <ViewCol>
          <MessageComponent
            previousMessage={props.previousMessage}
            currentMessage={props.currentMessage}
            nextMessage={props.nextMessage}
            messages={messages}
            currentFriend={friends[currentConv]?.id}
            currentChannel={channels[currentConv]?.id}
            currentTeam={teams[currentTeam]?.id}
            isCurrentConvPrivate={isCurrentConvPrivate}
            setMessages={setMessages}
            setNeedToRefresh={setNeedToRefresh}
            user={user}
            // TODO: regarder si le message est un post ou non pour changer la couleur
            backgroundColor={"white"}
          />
        </ViewCol>
      </View>
    );
  };

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

  useEffect(() => {
    const prepareMessages = realMessages?.map((message: Message, index: number) => {
      return {
        _id: `old_${message.id}`,
        text: message.content,
        createdAt: new Date(message.createdAt._seconds * 1000),
        user: {
          _id: typeof message.user !== "string" ? message.user?.id : message.user,
          name: typeof message.user !== "string" ? message.user?.name : undefined,
          avatar: undefined,
        },
      };
    }) as IMessage[];
    if (prepareMessages) {
      const orderedMessages = prepareMessages.reverse();
      if (!isMessagesFetching && !isChannelMessagesFetching) {
        setMessages(orderedMessages);
      }
    }
  }, [realMessages, isMessagesFetching, isChannelMessagesFetching]);

  const onMessageSend = useCallback((messages: IMessage[] = []) => {
    if (isCurrentConvPrivate) {
      if (friends === undefined || friends[currentConv] === undefined) {
        return;
      }
      sendFriendMessages(friends[currentConv].id, messages[0].text);
    } else {
      if (channels === undefined || channels[currentConv] === undefined || teams === undefined || teams[currentTeam] === undefined) {
        return;
      }
      sendChannelMessages(teams[currentTeam].id, channels[currentConv].id, messages[0].text);
    }
    setMessages(previousMessages => {
      return GiftedChat.append(previousMessages, messages);
    })
  }, [friends, channels, currentConv, isCurrentConvPrivate]);

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
          {!isMessagesFetching && !isChannelMessagesFetching ?
          <GiftedChat
            messages={messages}
            onSend={onMessageSend}
            user={{
              _id: user?.id || '',
              name: user?.name || '',
              avatar: undefined,
            }}
            placeholder="Type you message here..."
            renderMessage={(renderMessage)}
          /> : <ActivityIndicator/>
          }
        </MainLayout>
      ) : (
        <View />
      )}
    </>
  );
};

export default HomeScreen;
