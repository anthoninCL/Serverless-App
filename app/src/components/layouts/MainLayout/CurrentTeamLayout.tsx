import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import {ViewCol, ViewRow} from '../FlexLayout/FlexViews';
import {Team} from "types/Team";
import {Avatar} from "../../common/Avatar/Avatar";
import useTheme from "../../../hooks/useTheme";
import {ClickableIcon} from "../../common/ClickableIcon/ClickableIcon";
import {Icon} from "../../common/Icon/Icon";

type Props = {
  team?: Team;
};

export const CurrentTeamLayout = (props: Props) => {
  const {theme} = useTheme();

  return (
    <ViewRow align={"center"} style={{paddingHorizontal: 10, height: 50, borderBottomWidth: 1, borderBottomColor: '#393939'}}>
      {props.team &&
          <TouchableOpacity>
            <ViewRow align={"center"}>
                <Text style={{fontSize: theme.fontSizes.larger, fontWeight: 'bold', color: '#FFF', marginRight: 5}}>{props.team.name}</Text>
                <Icon type={"FontAwesome"} name={"caret-down"} colorName={'light'}/>
            </ViewRow>
          </TouchableOpacity>
      }
    </ViewRow>
  );
};
