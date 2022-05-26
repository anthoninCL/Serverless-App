/* eslint-disable no-underscore-dangle, no-use-before-define */

import React from 'react'
import { StyleSheet, View } from 'react-native'

import { Avatar, Day, IMessage } from 'react-native-gifted-chat'
import { User } from "../../../types/User";
import dayjs from "dayjs";
import { MessageContent } from "./ChatContent";
import { ViewRow } from "../../layouts/FlexLayout/FlexViews";
//import {Avatar} from "../Avatar/Avatar";


export const dayIsTheSame = (currentMessage: IMessage, compareMessage: IMessage) => {
  if (compareMessage && compareMessage.createdAt) {
    const currentMessageCreationDate = dayjs(currentMessage.createdAt);
    const compareMessageCreationDate = dayjs(currentMessage.createdAt);

    if (compareMessageCreationDate.isValid() && compareMessageCreationDate.isValid()) {
      return currentMessageCreationDate.isSame(compareMessageCreationDate, 'day');
    }
  }
  return false;
}

export const userIsSame = (currentMessage, compareMessage) => {
  return !!(
    compareMessage &&
    compareMessage.user &&
    currentMessage.user &&
    compareMessage.user._id === currentMessage.user._id);
}

type Props = {
  currentMessage?: IMessage;
  nextMessage?: IMessage;
  previousMessage?: IMessage;
  user?: User;
  backgroundColor?: string;
}

export const MessageComponent = (props: Props) => {

  const getInnerComponentProps = () => {
    return {
      ...props,
      position: 'left',
      userIsSame,
      dayIsTheSame,
    }
  }

  const renderAvatar = () => {

    const avatarProps = getInnerComponentProps()
    return (
      <Avatar
        {...avatarProps}
        renderAvatarOnTop
        imageStyle={{
          left: [styles.slackAvatar],
        }}
      />
    );
  }

  return (
    <View>
        <Day {...getInnerComponentProps()} />
      <View style={{ backgroundColor: props.backgroundColor ?? "white", paddingLeft: 10, paddingTop: 5, paddingBottom: 5 }}>
        <View
          style={[
            styles.container,
          ]}
        >
        </View>
        <ViewRow>
          {renderAvatar()}
          <MessageContent {...getInnerComponentProps()} />
        </ViewRow>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginLeft: 10,
    marginRight: 0,
  },
  slackAvatar: {
    height: 40,
    width: 40,
    borderRadius: 3,
  },
})
