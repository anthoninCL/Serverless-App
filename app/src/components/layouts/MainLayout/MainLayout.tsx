import React from 'react';
import {Image, View, Text} from 'react-native';
import {ViewCol, ViewRow} from '../FlexLayout/FlexViews';
import {User} from "types/User";
import {Team} from "types/Team";
import {Channel} from "../../../types/Channel";
import {Friend} from "../../../types/Friend";
import {TeamLayout} from "./TeamLayout";

// TODO Pass the team
type Props = {
  children?: React.ReactNode;
  user?: User;
  teams?: Team[];
  channels?: Channel[];
  friends?: Friend[];
  currentTeam?: number;
  currentConv?: number;
  isCurrentConvPrivate?: boolean;
  onTeamClicked: (newValue: number) => void;
  onConvClicked: (newValue: number) => void;
  setCurrentConvPrivacy: (newValue: boolean) => void;
};

// TODO Apply Team's info to the layout
// TODO Teams list component
// TODO Channels list component
// TODO Users list component
// TODO
export const MainLayout = (props: Props) => {

  return (
    <ViewCol>
      <ViewRow align={"center"} justify={"space-between"} style={{backgroundColor: '#000', height: '5%', minHeight: 55, width: '100%', paddingHorizontal: 20, paddingVertical: 10}}>
        <View/>
        <Text style={{color: '#FFF', fontWeight: "600"}}>Club Manchot | Team | Channel</Text>
        <View style={{width: 35, height: 35, borderRadius: 35/3, backgroundColor: 'red'}}/>
      </ViewRow>
      <ViewRow align={"center"} justify={"center"} style={{flex: 1}}>
        <ViewRow style={{height: '100%', width: '17%', minWidth: 150, backgroundColor: '#171630'}}>
          <TeamLayout onTeamClicked={props.onTeamClicked} teams={props.teams} currentTeam={props.currentTeam} />
          <ViewCol style={{height: '100%', borderWidth: 1, borderBottomWidth: 0, borderColor: '#393939'}}>
            <ViewRow style={{height: 50, borderBottomWidth: 1, borderBottomColor: '#393939'}}>
              <Text>Team !</Text>
            </ViewRow>
            <Text>Channel</Text>
            <Text>Channel</Text>
          </ViewCol>
        </ViewRow>
        <ViewRow style={{flex: 1, height: '100%', backgroundColor: '#FFF'}}>
          {props.children}
        </ViewRow>
      </ViewRow>
    </ViewCol>
  );
};
