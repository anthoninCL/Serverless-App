import React, {useEffect, useState} from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import {ViewCol, ViewRow} from '../FlexLayout/FlexViews';
import {Team} from "types/Team";
import {Avatar} from "../../common/Avatar/Avatar";
import useTheme from "../../../hooks/useTheme";
import {ClickableIcon} from "../../common/ClickableIcon/ClickableIcon";
import {Icon} from "../../common/Icon/Icon";
import {ManageTeamModal} from "../../modals/ManageTeamModal";
import {Friend} from "../../../types/Friend";
import {Channel} from "../../../types/Channel";
import {Button} from "../../common/Button/Button";
import {CreateTeamModal} from "../../modals/CreateTeamModal";
import {ManageChannelModal} from "../../modals/ManageChannelModal";
import useChannel from "../../../hooks/useChannel";
import {User} from "../../../types/User";
import {FriendId, FriendName} from "../../../utils/friendName";
import useFriend from "../../../hooks/useFriend";

type Props = {
  currentConv?: number;
  friends?: Friend[];
  isCurrentConvPrivate?: boolean;
  channels?: Channel[];
  currentTeam: string;
  users?: User[];
};

export const ChatHeaderLayout = (props: Props) => {
  const {theme} = useTheme();
  const [isOverlayVisible, setOverlayVisibility] = useState(false);
  const [currentFriendName, setCurrentFriendName] = useState('');
  const { deleteChannel } = useChannel();
  const { deleteFriend } = useFriend();

  const toggleVisibility = () => {
    setOverlayVisibility(!isOverlayVisible);
  };

  useEffect(() => {
    const getUser = async () => {
      const name = await FriendName(props.friends[props.currentConv].users, props.users);
      setCurrentFriendName(name);
    };

    if (props.isCurrentConvPrivate) {
      getUser().catch(console.error);
    }
  }, [props.isCurrentConvPrivate, props.currentConv, props.users, props.friends]);

  return (
    <ViewRow align={"center"} style={{paddingHorizontal: 20, height: 50, borderBottomWidth: 1, borderBottomColor: '#393939'}}>
      <ViewRow justify={"space-between"} >
        <TouchableOpacity onPress={toggleVisibility} activeOpacity={props.isCurrentConvPrivate ? 1 : 0.2}>
          <ViewRow style={{ flex: 1, flexGrow: 1}} align={'center'}>
            {
              props.isCurrentConvPrivate ? <Avatar sizeName={'larger'}/> : <Text
                style={{
                  fontSize: theme.fontSizes.larger,
                  fontWeight: 'bold',
                  color: '#393939',
                  marginRight: 5
                }}
              >#</Text>
            }
            <Text
              style={{
                fontSize: theme.fontSizes.larger,
                fontWeight: 'bold',
                color: '#393939',
                marginHorizontal: 5,
              }}
            >
              {
                props.isCurrentConvPrivate ?
                  currentFriendName :
                  props.channels[props.currentConv]?.name
              }
            </Text>
            <Icon name={'down'} type={'AntDesign'} />
          </ViewRow>
        </TouchableOpacity>
        <View style={{ flex: 0, flexDirection: "row", justifyContent: "flex-end", alignItems: 'center'}}>
          <ViewRow style={{ paddingRight: 10, }}>
            <Button onPress={() => {
              if (!props.isCurrentConvPrivate) {
                if (props.currentTeam && props.channels && props.channels[props.currentConv]) {
                  deleteChannel(props.currentTeam, props.channels[props.currentConv].id);
                }
              } else {
                if (props.friends && props.friends[props.currentConv]) {
                  deleteFriend(props.friends[props.currentConv].id);
                }
              }
            }}>
              <Icon name={"trash"} colorName={"statusDangerHigh"}/>
            </Button>
          </ViewRow>
        </View>
      </ViewRow>

      {/* TODO : Changer la modale pour mettre la modale correspondante */}
      {!props.isCurrentConvPrivate && <ManageChannelModal currentTeam={props.currentTeam} isVisible={isOverlayVisible} onBackDropPress={toggleVisibility}  currentChannel={props.channels[props.currentConv]}/> }


    </ViewRow>
  );
};
