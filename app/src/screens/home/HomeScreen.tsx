import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'navigation/RootStackParamList';
import {MainLayout} from "../../components/layouts/MainLayout/MainLayout";
import {Team} from "../../types/Team";
import {User} from "../../types/User";
import {Channel} from "../../types/Channel";
import {Friend} from "../../types/Friend";

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
  const firstChannel: Channel = {
    id: '1',
    name: 'general',
    createdAt: '',
    posts: [],
    messages: [],
  };
  const secondChannel: Channel = {
    id: '2',
    name: 'ciligo',
    createdAt: '',
    posts: [],
    messages: [],
  };
  const firstUser: User = {
    id: '1',
    email: 'tompap@juloa.fr',
    name: 'tompap',
    firstName: 'Thomas',
    lastName: 'Papin',
    photo: '',
  };
  const secondUser: User = {
    id: '2',
    email: 'loic.cahuzac@juloa.fr',
    name: 'Loïc',
    firstName: 'Loïc',
    lastName: 'Cahuzac',
    photo: '',
  };
  const firstFriend: Friend = {
    friendId: firstUser,
    userId: 'Anthonin',
    createdAt: '',
  };
  const secondFriend: Friend = {
    friendId: secondUser,
    userId: 'Anthonin',
    createdAt: ''
  };
  const teams = [firstTeam, secondTeam];
  const channels = [firstChannel, secondChannel];
  const friends = [firstFriend, secondFriend];
  //const {theme} = useTheme();
  //const styles = fnStyles(theme);

  return (
    <MainLayout currentTeam={currentTeam} isCurrentConvPrivate={isCurrentConvPrivate} currentConv={currentConv}
                onTeamClicked={setCurrentTeam} setCurrentConvPrivacy={setCurrentConvPrivacy} onConvClicked={setCurrentConv} teams={teams} channels={channels} friends={friends}>
      <Text>TEST</Text>
    </MainLayout>
  );
};

export default HomeScreen;
