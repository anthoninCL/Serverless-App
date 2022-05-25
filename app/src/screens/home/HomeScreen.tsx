import React, {useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigation/RootStackParamList';
import {MainLayout} from "../../components/layouts/MainLayout/MainLayout";
import {MessageComponent} from "../../components/common/ChatMessage/ChatMessage";
import {Message} from "../../types/Message";
import {User} from "../../types/User";
import dayjs from "dayjs";
import {GiftedChat, IMessage, Send} from "react-native-gifted-chat";
import {Icon} from "../../components/common/Icon/Icon";

export type ScreenProps = NativeStackScreenProps<RootStackParamList, 'home'>;

// TODO DELETE FAKE DATAS

const users: User[] = [
  {
    id: "1",
    email: "email@gmail.com",
    name: "Toto",
    firstName: "Utilisateur",
    lastName: "1"
  },
  {
    id: "2",
    email: "email2@gmail.com",
    name: "Bobby",
    firstName: "Utilisateur",
    lastName: "2"
  },
  {
    id: "3",
    email: "email2@gmail.com",
    name: "Marcus",
    firstName: "Utilisateur",
    lastName: "2"
  },
];

const exampleMessages: Message[] = [
  {
    id: "1",
    content: "Salut",
    createdAt: dayjs().toString(),
    updatedAt: dayjs().toString(),
    user: users[0]
  },
  {
    id: "2",
    content: "Coucou ça va ?",
    createdAt: dayjs().toString(),
    updatedAt: dayjs().toString(),
    user: users[1]
  },
  {
    id: "3",
    content: "Ca va super merci beaucoup !!!",
    createdAt: dayjs().toString(),
    updatedAt: dayjs().toString(),
    user: users[0]
  },
  {
    id: "4",
    content: "Regarde ce chouette message",
    createdAt: dayjs().toString(),
    updatedAt: dayjs().toString(),
    user: users[0]
  },
  {
    id: "5",
    content: "Regarde ce chouette message",
    createdAt: dayjs().toString(),
    updatedAt: dayjs().toString(),
    user: users[2]
  }
]

const HomeScreen = ({ navigation }: ScreenProps) => {
  //const {theme} = useTheme();
  //const styles = fnStyles(theme);
  const conversationMessages = exampleMessages; // TODO : get les messages de la conversation
  const [messages, setMessages] = useState<IMessage[]>();

  useEffect(() => {
    const prepareMessages = conversationMessages?.map((message: Message, index: number) => {
      return {
        _id: `old_${index}`,
        text: message.content,
        createdAt: dayjs(message.createdAt).toDate(),
        user: {
          _id: typeof message.user !== "string" ? message.user?.id : undefined,
          name: typeof message.user !== "string" ? message.user?.name : undefined,
          avatar: undefined,
        },
      };
    }) as IMessage[];

    if (prepareMessages) {
      const orderedMessages = prepareMessages.reverse();
      setMessages(orderedMessages);
    }
  }, []);

  const onMessageSend = useCallback((messages: IMessage[] = []) => {
    setMessages(previousMessages => {
      return GiftedChat.append(previousMessages, messages);
    })
  }, []);

  const renderMessage = (props) => {
    return <MessageComponent
      previousMessage={props.previousMessage}
      currentMessage={props.currentMessage}
      nextMessage={props.nextMessage }
    />
  }

  return (
    <MainLayout>
      <GiftedChat
        messages={messages}
        onSend={messages => onMessageSend(messages)}
        user={{
          _id: messages && messages.length % 3 === 0 ? users[0].id : users[1].id,
          name: messages && messages.length % 3 === 0 ? users[0].name : users[1].name,
          avatar: undefined,
        }}
        renderMessage={renderMessage}
      />
    </MainLayout>
  );
};

export default HomeScreen;
