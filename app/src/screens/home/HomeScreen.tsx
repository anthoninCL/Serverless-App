import React, {useEffect} from 'react';
import {Text} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigation/RootStackParamList';
import {MainLayout} from "../../components/layouts/MainLayout/MainLayout";

export type ScreenProps = NativeStackScreenProps<RootStackParamList, 'home'>;

const HomeScreen = ({ navigation }: ScreenProps) => {
  //const {theme} = useTheme();
  //const styles = fnStyles(theme);

  return (
    <MainLayout>
      <Text>TEST</Text>
    </MainLayout>
  );
};

export default HomeScreen;
