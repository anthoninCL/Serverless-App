import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from 'screens/auth/login/LoginScreen';
import { RootStackParamList } from './RootStackParamList';

const MainStack = createStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Login',
        }}
      />
    </MainStack.Navigator>
  );
};
