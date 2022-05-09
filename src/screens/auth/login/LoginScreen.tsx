import React from 'react';
import {Text, View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigation/RootStackParamList';

export type ScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: ScreenProps) => {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

export default LoginScreen;
