/* eslint-disable no-underscore-dangle, no-use-before-define */

import PropTypes from 'prop-types'
import React from 'react'
import { View, ViewPropTypes, StyleSheet, Text } from 'react-native'

import {Avatar, Day, IMessage, utils} from 'react-native-gifted-chat'
import { User } from "../../../types/User";
// import Bubble from './SlackBubble'
import dayjs from "dayjs";
import {MessageContent} from "./ChatContent";


const dayIsTheSame = (currentMessage: IMessage, compareMessage: IMessage) => {
  if (compareMessage && compareMessage.createdAt) {
    const currentMessageCreationDate = dayjs(currentMessage.createdAt);
    const compareMessageCreationDate = dayjs(currentMessage.createdAt);

    if (compareMessageCreationDate.isValid() && compareMessageCreationDate.isValid()) {
      return currentMessageCreationDate.isSame(compareMessageCreationDate, 'day');
    }
  }
  return false;
}

const userIsSame = (currentMessage, compareMessage) => {
  return !!(
    compareMessage &&
    compareMessage.user &&
    currentMessage.user &&
    compareMessage.user._id === currentMessage.user._id);
}

type Props = {
  renderAvatar?: (value: any) => void;
  renderBubble?: (value: any) => void;
  renderDay?: (value: any) => void;
  currentMessage?: IMessage;
  nextMessage?: IMessage;
  previousMessage?: IMessage;
  user?: User; // Type User
  /*  containerStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
 */
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

  const renderTime = () => {
    if (props.currentMessage.createdAt) {
      const dayProps = getInnerComponentProps()
      if (props.renderDay) {
        return props.renderDay(dayProps)
      }
      return <Day {...dayProps} />
    }
    return null
  }

  const renderBubble = () => {
    const bubbleProps = getInnerComponentProps()
    if (props.renderBubble) {
      return props.renderBubble(bubbleProps)
    }
    return <MessageContent {...bubbleProps} />
  }

  /*
  const renderAvatar = () => {
    let extraStyle
    if (
      userIsSame(props.currentMessage, props.previousMessage) &&
      dayIsTheSame(props.currentMessage, props.previousMessage)
    ) {
      // Set the invisible avatar height to 0, but keep the width, padding, etc.
      extraStyle = { height: 0 }
    }

    // const avatarProps = getInnerComponentProps()
    return (
      <Avatar
        {...avatarProps}
        imageStyle={{
          left: [styles.slackAvatar, avatarProps.imageStyle, extraStyle],
        }}
      />
    )
  }

   */

  const marginBottom = userIsSame(props.currentMessage, props.nextMessage) ? 2 : 10;

  return (
    <View>
      <>
        {renderTime()}
        <View
          style={[
            styles.container,
            { marginBottom },
            // props.containerStyle,
          ]}
        >
        </View>
        {renderBubble()}
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginLeft: 8,
    marginRight: 0,
  },
  slackAvatar: {
    // The bottom should roughly line up with the first line of message text.
    height: 40,
    width: 40,
    borderRadius: 3,
  },
})
