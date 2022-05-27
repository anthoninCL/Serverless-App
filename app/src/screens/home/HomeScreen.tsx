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

export type ScreenProps = NativeStackScreenProps<RootStackParamList, "home">;

// TODO DELETE FAKE DATAS

const users: User[] = [
  {
    id: "1",
    email: "email@gmail.com",
    name: "Toto",
    firstName: "Utilisateur",
    lastName: "1",
    photo: undefined,
  },
  {
    id: "2",
    email: "email2@gmail.com",
    name: "Bobby",
    firstName: "Utilisateur",
    lastName: "2",
    photo: undefined,
  },
  {
    id: "3",
    email: "email2@gmail.com",
    name: "Marcus",
    firstName: "Utilisateur",
    lastName: "2",
    photo: undefined,
  },
];

const exampleMessages: Message[] = [
  {
    id: "1",
    content: "Salut",
    createdAt: dayjs().toString(),
    updatedAt: dayjs().toString(),
    user: users[0],
  },
  {
    id: "2",
    content: "Coucou ça va ?",
    createdAt: dayjs().toString(),
    updatedAt: dayjs().toString(),
    user: users[1],
  },
  {
    id: "3",
    content: "Ca va super merci beaucoup !!!",
    createdAt: dayjs().toString(),
    updatedAt: dayjs().toString(),
    user: users[0],
  },
  {
    id: "4",
    content: "Regarde ce chouette message",
    createdAt: dayjs().toString(),
    updatedAt: dayjs().toString(),
    user: users[0],
  },
  {
    id: "5",
    content: "Dernier message LOOOOOOOOL",
    createdAt: dayjs().toString(),
    updatedAt: dayjs().toString(),
    user: users[2],
  },
];

const HomeScreen = ({ navigation }: ScreenProps) => {
  const [currentTeam, setCurrentTeam] = useState(0);
  const [isCurrentConvPrivate, setCurrentConvPrivacy] = useState(false);
  const [currentConv, setCurrentConv] = useState(0);
  const { signout } = useAuth();
  const { fetchTeams, teams, isFetching: isTeamFetching } = useTeam();
  const { fetchFriends, friends } = useFriend();

  useEffect(() => {
    fetchTeams();
    fetchFriends();
  }, []);

  console.log(friends);
  //console.log(team);

  // TODO FAIRE LE MÉNAGE !!!
  const firstTeam: Team = {
    id: "1",
    name: "Watchelp",
    members: null,
    channels: null,
    photo: "",
  };
  const secondTeam: Team = {
    id: "2",
    name: "Juloa",
    members: null,
    channels: null,
    photo: "",
  };
  const firstChannel: Channel = {
    id: "1",
    name: "general",
    createdAt: "",
    posts: [],
    messages: [],
  };
  const secondChannel: Channel = {
    id: "2",
    name: "ciligo",
    createdAt: "",
    posts: [],
    messages: [],
  };
  const firstUser: User = {
    id: "1",
    email: "tompap@juloa.fr",
    name: "tompap",
    firstName: "Thomas",
    lastName: "Papin",
    photo: "",
  };
  const secondUser: User = {
    id: "2",
    email: "loic.cahuzac@juloa.fr",
    name: "Loïc",
    firstName: "Loïc",
    lastName: "Cahuzac",
    photo: "",
  };
  const currentUser: User = {
    id: "0",
    email: "anthonin.clara@juloa.fr",
    name: "AnthoninC.",
    firstName: "Anthonin",
    lastName: "Clara",
    photo: "",
  };
  const firstFriend: Friend = {
    friendId: firstUser,
    userId: currentUser,
    createdAt: "",
  };
  const secondFriend: Friend = {
    friendId: secondUser,
    userId: currentUser,
    createdAt: "",
  };
  // const teams = [firstTeam, secondTeam];
  const channels = [firstChannel, secondChannel];
  //const friends = [firstFriend, secondFriend];
  //const {theme} = useTheme();
  //const styles = fnStyles(theme);
  const conversationMessages = exampleMessages; // TODO : get les messages de la conversation
  const [messages, setMessages] = useState<IMessage[]>();

  useEffect(() => {
    const prepareMessages = conversationMessages?.map(
      (message: Message, index: number) => {
        return {
          _id: `old_${index}`, // TODO : mettre l'id du message
          text: message.content,
          createdAt: dayjs(message.createdAt).toDate(),
          user: {
            _id:
              typeof message.user !== "string" ? message.user?.id : undefined,
            name:
              typeof message.user !== "string" ? message.user?.name : undefined,
            avatar: undefined,
          },
        };
      }
    ) as IMessage[];

    if (prepareMessages) {
      const orderedMessages = prepareMessages.reverse();
      setMessages(orderedMessages);
    }
  }, []);

  const onMessageSend = useCallback((messages: IMessage[] = []) => {
    setMessages((previousMessages) => {
      return GiftedChat.append(previousMessages, messages);
    });
  }, []);

  const renderMessage = (props) => {
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
  };

  // TODO move the two next functions to AuthProvider
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
  /*useEffect(() => {
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
  }, []);*/

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
          currentUser={currentUser}
          signOut={signOut}
          deleteAccount={deleteAccount}
        >
          <GiftedChat
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
            renderMessage={renderMessage}
          />
        </MainLayout>
      ) : (
        <View />
      )}
    </>
  );
};

export default HomeScreen;
