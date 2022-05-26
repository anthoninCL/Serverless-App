/* eslint-disable no-underscore-dangle, no-use-before-define */

import PropTypes from 'prop-types'
import React from 'react'
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform, TextStyle,
} from 'react-native'

import {
  MessageText,
  Time,
  IMessage,
} from 'react-native-gifted-chat'
import {User} from "../../../types/User";

import { userIsSame, dayIsTheSame } from "./ChatMessage";
import {Button} from "../Button/Button";
import {Icon} from "../Icon/Icon";
import {ViewCol, ViewRow} from "../../layouts/FlexLayout/FlexViews";

type Props = {
  touchableProps?: object;
  onLongPress?: (value: any) => void;
  currentMessage?: IMessage;
  nextMessage?: IMessage;
  previousMessage?: IMessage;
  user?: User;
  containerStyle?: {
    left?: any,
    right?: any,
  },
  wrapperStyle?: {
    left?: any,
    right?: any,
  },
  messageTextStyle?: TextStyle,
  usernameStyle?: TextStyle,
  tickStyle?: TextStyle,
  containerToNextStyle?: {
    left?: any,
    right?: any,
  },
  containerToPreviousStyle?: {
    left?: any,
    right?: any,
  },
}

export const MessageContent = (props: Props) => {

  const renderMessageText = () => {
    if (props.currentMessage.text) {
      const {
        containerStyle,
        wrapperStyle,
        messageTextStyle,
        ...messageTextProps
      } = props
      return (
        <MessageText
          containerStyle={{
            left: {width: '100%'},
            right: {}
          }}
          {...messageTextProps}
        />
      )
    }
    return null
  }

  const renderUsername = () => {
    const username = props.currentMessage.user.name
    if (username) {
      return (
        <Text
          style={[
            styles.standardFont,
            styles.headerItem,
            styles.username,
          ]}
        >
          {username}
        </Text>
      )
    }
    return null
  }

  const renderTime = () => {
    if (props.currentMessage.createdAt) {
      const { containerStyle, wrapperStyle, ...timeProps } = props
      return (
        <Time
          {...timeProps}
        />
      )
    }
    return null
  }

  const isSameThread =
    userIsSame(props.currentMessage, props.previousMessage) &&
    dayIsTheSame(props.currentMessage, props.previousMessage)

  const messageHeader = isSameThread ? null : (
    <View style={styles.headerView}>
      <>
        {renderUsername()}
        {renderTime()}
      </>
    </View>
  )

  return (
    <View style={[styles.container, props.containerStyle]}>
      <TouchableOpacity
        accessibilityLabel='text'
        {...props.touchableProps}
        style={{width: '100%'}}
      >
        <View style={[styles.wrapper, props.wrapperStyle]}>
            {messageHeader}
            <ViewRow justify={"space-between"} >
              <View style={{ flex: 1, flexGrow: 1, alignItems: 'flex-start'}}>
                {renderMessageText()}
              </View>
              <View style={{ flex: 0, flexDirection: "row", justifyContent: "flex-end", alignItems: 'center'}}>
                <ViewRow style={{ paddingRight: 10, }}>
                  <Button onPress={() => console.log("Edit message id : ", props.currentMessage)}>
                    <Icon name={"pencil"}/>
                  </Button>
                  <Button onPress={() => console.log("Delete message id : ", props.currentMessage._id)}>
                    <Icon name={"trash"} colorName={"statusDangerHigh"}/>
                  </Button>
                </ViewRow>
              </View>
            </ViewRow>
        </View>
      </TouchableOpacity>
    </View>
  )
}

// Note: Everything is forced to be "left" positioned with this component.
// The "right" position is only used in the default Bubble.
const styles = StyleSheet.create({
  standardFont: {
    fontSize: 15,
  },
  slackMessageText: {
    marginLeft: 0,
    marginRight: 0,
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  wrapper: {
    marginRight: 60,
    minHeight: 20,
    justifyContent: 'flex-end',
  },
  username: {
    fontWeight: 'bold',
  },
  time: {
    textAlign: 'left',
    fontSize: 12,
  },
  timeContainer: {
    marginLeft: 0,
    marginRight: 0,
  },
  headerItem: {
    marginHorizontal: 20,
  },
  headerView: {
    // Try to align it better with the avatar on Android.
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  /* eslint-disable react-native/no-color-literals */
  tick: {
    backgroundColor: 'transparent',
    color: 'white',
  },
  /* eslint-enable react-native/no-color-literals */
  tickView: {
    flexDirection: 'row',
  },
  slackImage: {
    borderRadius: 3,
    marginLeft: 0,
    marginRight: 0,
  },
})
