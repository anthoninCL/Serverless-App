import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppProvider from "./src/AppProvider";
import {RootStack} from "./src/navigation/RootStackNavigator";

const config = {
  screens: {
    Login: 'Login',
  },
};

const linking = {
    prefixes: ['http://localhost:19006/', 'serverless-app://'],
    config,
};

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" translucent backgroundColor="#00000000" />
      <NavigationContainer linking={linking}>
        <AppProvider>
          <RootStack />
        </AppProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
