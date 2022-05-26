import React, {useState} from 'react';
import {Image, View, Text, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {ViewCol, ViewRow} from '../FlexLayout/FlexViews';
import {User} from "types/User";
import {Team} from "types/Team";
import {Channel} from "../../../types/Channel";
import {Friend} from "../../../types/Friend";
import {TeamLayout} from "./TeamLayout";
import {Avatar} from "../../common/Avatar/Avatar";
import {CurrentTeamLayout} from "./CurrentTeamLayout";
import {ConvLayout} from "./ConvLayout";
import {Divider} from "../../common/Divider/Divider";

// TODO Pass the team
type Props = {
  children?: React.ReactNode;
  teams?: Team[];
  channels?: Channel[];
  friends?: Friend[];
  currentTeam?: number;
  currentConv?: number;
  currentUser: User;
  isCurrentConvPrivate?: boolean;
  onTeamClicked: (newValue: number) => void;
  onConvClicked: (newValue: number) => void;
  setCurrentConvPrivacy: (newValue: boolean) => void;
  navigateToProfile: () => void;
  signOut: () => void;
  deleteAccount: () => void;
};

// TODO Apply Team's info to the layout
// TODO Teams list component
// TODO Channels list component
// TODO Users list component
// TODO
export const MainLayout = (props: Props) => {
  const [isUserModalVisible, setUserModalVisibility] = useState(false);

  const onProfilePicClicked = () => {
    setUserModalVisibility(!isUserModalVisible);
  };

  const removeProfileModal = () => {
    setUserModalVisibility(false);
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={removeProfileModal} style={{flex: 1}}>
    <ViewCol>
      <ViewRow align={"center"} justify={"space-between"} style={{
        backgroundColor: '#000',
        height: '5%',
        minHeight: 55,
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10
      }}>
        <View/>
        <Text style={{color: '#FFF', fontWeight: "600"}}>Club Manchot | Team | Channel</Text>
        <TouchableOpacity onPress={onProfilePicClicked}>
          <Avatar sizeName={"sz35"}/>
        </TouchableOpacity>
      </ViewRow>
      <ViewRow align={"center"} justify={"center"} style={{flex: 1}}>
        <ViewRow style={{height: '100%', width: '17%', minWidth: 200, backgroundColor: '#171630'}}>
          <TeamLayout onTeamClicked={props.onTeamClicked} teams={props.teams} currentTeam={props.currentTeam}/>
          <ViewCol style={{height: '100%', borderWidth: 1, borderBottomWidth: 0, borderRightWidth: 0, borderColor: '#393939'}}>
            <CurrentTeamLayout team={props.teams[props.currentTeam]}/>
            <ConvLayout setCurrentConvPrivacy={props.setCurrentConvPrivacy} onConvClicked={props.onConvClicked}
                        channels={props.channels} friends={props.friends} currentConv={props.currentConv}
                        isCurrentConvPrivate={props.isCurrentConvPrivate}/>
          </ViewCol>
        </ViewRow>
        <ViewRow style={{flex: 1, height: '100%', backgroundColor: '#FFF'}}>
          {props.children}
        </ViewRow>
      </ViewRow>
      {isUserModalVisible &&
          <ViewCol style={{
            position: 'absolute',
            backgroundColor: '#FFF',
            right: 10, top: 50,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            borderRadius: 10,
            elevation: 3,
            minWidth: 300
          }}>
              <ViewRow align={"bottom"} style={{paddingHorizontal: 20, paddingTop: 20, paddingBottom: 20}}>
                  <Avatar sizeName={'sz50'} style={{shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    borderRadius: 10,
                    elevation: 3,}}/>
                  <ViewCol style={{marginLeft: 10}}>
                      <Text style={{fontWeight: 'bold', fontSize: 18}}>{props.currentUser.name}</Text>
                      <Text>{props.currentUser.firstName} {props.currentUser.lastName}</Text>
                  </ViewCol>
              </ViewRow>
              <Divider color={'#B6B6B6'} />
              <TouchableOpacity style={{paddingVertical: 10, paddingLeft: 20}} onPress={props.navigateToProfile}>
                <Text>Profile</Text>
              </TouchableOpacity>
              <Divider color={'#B6B6B6'} />
              <TouchableOpacity style={{paddingVertical: 10, paddingLeft: 20}} onPress={props.signOut}>
                  <Text>Sign out</Text>
              </TouchableOpacity>
              <Divider color={'#B6B6B6'} />
              <TouchableOpacity style={{paddingVertical: 10, paddingLeft: 20}} onPress={props.deleteAccount}>
                  <Text>Delete your account</Text>
              </TouchableOpacity>
          </ViewCol>
      }
    </ViewCol>
    </TouchableOpacity>
  );
};
