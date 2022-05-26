import React, {useState} from 'react';
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

type Props = {
  currentConv?: number;
  friends?: Friend[];
  isCurrentConvPrivate?: boolean;
  channels?: Channel[];
};

export const ChatHeaderLayout = (props: Props) => {
  const {theme} = useTheme();
  const [isOverlayVisible, setOverlayVisibility] = useState(false);

  const toggleVisibility = () => {
    setOverlayVisibility(!isOverlayVisible);
  };

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
                  (typeof props.friends[props.currentConv].friendId === 'string' ?
                    props.friends[props.currentConv].friendId :
                    props.friends[props.currentConv].friendId?.name) :
                  props.channels[props.currentConv]?.name
              }
            </Text>
            <Icon name={'down'} type={'AntDesign'} />
          </ViewRow>
        </TouchableOpacity>
        <View style={{ flex: 0, flexDirection: "row", justifyContent: "flex-end", alignItems: 'center'}}>
          <ViewRow style={{ paddingRight: 10, }}>
            {/* TODO : Call pour delete la bonne conversation / bon channel*/}
            <Button onPress={() => console.log("Delete message id : ", props.isCurrentConvPrivate ?
              (typeof props.friends[props.currentConv].friendId === 'string' ?
                props.friends[props.currentConv].friendId :
                props.friends[props.currentConv].friendId?.id) :
              props.channels[props.currentConv]?.id)}>
              <Icon name={"trash"} colorName={"statusDangerHigh"}/>
            </Button>
          </ViewRow>
        </View>
      </ViewRow>

      {/* TODO : Changer la modale pour mettre la modale correspondante */}
      {!props.isCurrentConvPrivate && <ManageChannelModal isVisible={isOverlayVisible} onBackDropPress={toggleVisibility}  currentChannel={props.channels[props.currentConv]}/> }


    </ViewRow>
  );
};
