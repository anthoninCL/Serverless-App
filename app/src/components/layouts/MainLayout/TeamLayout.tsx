import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import {ViewCol, ViewRow} from '../FlexLayout/FlexViews';
import {Team} from "types/Team";
import {Avatar} from "../../common/Avatar/Avatar";
import useTheme from "../../../hooks/useTheme";
import {ClickableIcon} from "../../common/ClickableIcon/ClickableIcon";

type Props = {
  teams?: Team[];
  currentTeam?: number;
  onTeamClicked: (newValue: number) => void;
};

export const TeamLayout = (props: Props) => {
  const {theme} = useTheme();

  return (
    <ViewCol justify={"center"} style={{paddingVertical: 20, height: '100%', width: '20%', minWidth: 60, borderTopWidth: 1, borderTopColor: '#393939'}}>
      {props.teams && props.teams.map((team, key) => {
        return (
          <TouchableOpacity key={key} onPress={() => props.onTeamClicked(key)} style={{ marginBottom: 20}}>
            <Avatar sizeName={"high"} style={{backgroundColor: '#fff', borderWidth: props.currentTeam === key ? 5 : 0, borderColor: '#FFF', borderRadius: theme.sizings.high/5}} />
          </TouchableOpacity>
        );
      })}
      <ClickableIcon type={"IonIcons"} name={"add"} onPress={() => {}} colorName={"lightHigh"} sizeName={'huge'}/>
    </ViewCol>
  );
};
