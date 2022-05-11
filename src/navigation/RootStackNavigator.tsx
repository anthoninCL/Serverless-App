import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from 'screens/auth/login/LoginScreen';
import useTheme from 'hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from './RootStackParamList';
import RegisterScreen from "../screens/auth/register/RegisterScreen";

const MainStack = createStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="register"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
    </MainStack.Navigator>
  );
};
