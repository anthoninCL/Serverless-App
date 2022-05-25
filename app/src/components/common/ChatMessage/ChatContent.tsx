/* eslint-disable no-underscore-dangle, no-use-before-define */

import PropTypes from 'prop-types'
import React from 'react'
import {
  Text,
  Clipboard,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes,
  Platform, TextStyle,
} from 'react-native'

import {
  MessageText,
  MessageImage,
  Time,
  utils, IMessage,
} from 'react-native-gifted-chat'
import {User} from "../../../types/User";

const { isSameUser, isSameDay } = utils

type Props = {
  touchableProps?: object;
  onLongPress?: (value: any) => void;
  renderMessageImage?: (value: any) => void;
  renderMessageText?: (value: any) => void;
  renderCustomView?: (value: any) => void;
  renderUsername?: (value: any) => void;
  renderTime?: (value: any) => void;
  renderTicks?: (value: any) => void;
  currentMessage?: IMessage;
  nextMessage?: IMessage;
  previousMessage?: IMessage;
  user?: User;
  containerStyle?: {
    left?: string,
    right?: string,
  },
  wrapperStyle?: {
    left?: string,
    right?: string,
  },
  messageTextStyle?: TextStyle,
  usernameStyle?: TextStyle,
  tickStyle?: TextStyle,
  containerToNextStyle?: {
    left?: string,
    right?: string,
  },
  containerToPreviousStyle?: {
    left?: string,
    right?: string,
  },
}

export const MessageContent = (props: Props) => {
  /*
  const onLongPress = () => {
    if (this.props.onLongPress) {
      this.props.onLongPress(this.context, this.props.currentMessage)
    } else {
      if (this.props.currentMessage.text) {
        const options = ['Copy Text', 'Cancel']
        const cancelButtonIndex = options.length - 1
        this.context.actionSheet().showActionSheetWithOptions(
          {
            options,
            cancelButtonIndex,
          },
          buttonIndex => {
            switch (buttonIndex) {
              case 0:
                Clipboard.setString(this.props.currentMessage.text)
                break
            }
          },
        )
      }
    }
  }
  */

  const renderMessageText = () => {
    if (props.currentMessage.text) {
      const {
        containerStyle,
        wrapperStyle,
        messageTextStyle,
        ...messageTextProps
      } = props
      if (props.renderMessageText) {
        return props.renderMessageText(messageTextProps)
      }
      return (
        <MessageText
          {...messageTextProps}
        />
      )
    }
    return null
  }

  /*
  renderMessageImage() {
    if (this.props.currentMessage.image) {
      const { containerStyle, wrapperStyle, ...messageImageProps } = this.props
      if (this.props.renderMessageImage) {
        return this.props.renderMessageImage(messageImageProps)
      }
      return (
        <MessageImage
          {...messageImageProps}
          imageStyle={[styles.slackImage, messageImageProps.imageStyle]}
        />
      )
    }
    return null
  }


  renderTicks() {
    const { currentMessage } = this.props
    if (this.props.renderTicks) {
      return this.props.renderTicks(currentMessage)
    }
    if (currentMessage.user._id !== this.props.user._id) {
      return null
    }
    if (currentMessage.sent || currentMessage.received) {
      return (
        <View style={[styles.headerItem, styles.tickView]}>
          {currentMessage.sent && (
            <Text
              style={[styles.standardFont, styles.tick, this.props.tickStyle]}
            >
              ✓
            </Text>
          )}
          {currentMessage.received && (
            <Text
              style={[styles.standardFont, styles.tick, this.props.tickStyle]}
            >
              ✓
            </Text>
          )}
        </View>
      )
    }
    return null
  }
  */

  const renderUsername = () => {
    const username = props.currentMessage.user.name
    if (username) {
      const { containerStyle, wrapperStyle, ...usernameProps } = props
      if (props.renderUsername) {
        return props.renderUsername(usernameProps)
      }
      return (
        <Text
          style={[
            styles.standardFont,
            styles.headerItem,
            styles.username,
            props.usernameStyle,
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
      if (props.renderTime) {
        return props.renderTime(timeProps)
      }
      return (
        <Time
          {...timeProps}
        />
      )
    }
    return null
  }

  /*
  renderCustomView() {
    if (props.renderCustomView) {
      return props.renderCustomView(props)
    }
    return null
  }
  */
  const isSameThread =
    isSameUser(props.currentMessage, props.previousMessage) &&
    isSameDay(props.currentMessage, props.previousMessage)

  const messageHeader = isSameThread ? null : (
    <View style={styles.headerView}>
      <>
        {renderUsername()}
        {renderTime()}
      </>
      {/* renderTicks() */}
    </View>
  )

  return (
    <View style={[styles.container, props.containerStyle]}>
      <TouchableOpacity
        accessibilityLabel='text'
        {...props.touchableProps}
      >
        <View style={[styles.wrapper, props.wrapperStyle]}>
          <>
            {/* renderCustomView() */}
            {messageHeader}
            {/* renderMessageImage() */}
            {renderMessageText()}
          </>
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
    marginBottom: 0,
  },
  headerItem: {
    marginRight: 10,
  },
  headerView: {
    // Try to align it better with the avatar on Android.
    marginTop: Platform.OS === 'android' ? -2 : 0,
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
