import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'navigation/RootStackParamList';
import {MainLayout} from "../../components/layouts/MainLayout/MainLayout";
import {Team} from "../../types/Team";
import {User} from "../../types/User";
import {Channel} from "../../types/Channel";

export type ScreenProps = NativeStackScreenProps<RootStackParamList, 'home'>;

const HomeScreen = ({navigation}: ScreenProps) => {
  const [currentTeam, setCurrentTeam] = useState(0);
  const [isCurrentConvPrivate, setCurrentConvPrivacy] = useState(false);
  const [currentConv, setCurrentConv] = useState(0);
  const firstTeam: Team = {
    id: '1',
    name: 'Watchelp',
    members: null,
    channels: null,
    photo: ''
  };
  const secondTeam: Team = {
    id: '2',
    name: 'Juloa',
    members: null,
    channels: null,
    photo: ''
  };
  const teams = [firstTeam, secondTeam];
  //const {theme} = useTheme();
  //const styles = fnStyles(theme);

  return (
    <MainLayout currentTeam={currentTeam} isCurrentConvPrivate={isCurrentConvPrivate} currentConv={currentConv}
                onTeamClicked={setCurrentTeam} setCurrentConvPrivacy={setCurrentConvPrivacy} onConvClicked={setCurrentConv} teams={teams}>
      <Text>TEST</Text>
    </MainLayout>
  );
};

export default HomeScreen;
