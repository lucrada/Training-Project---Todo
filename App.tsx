/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/main-screen/MainScreen';
import AuthScreen from './screens/auth-screen/AuthScreen';

const Stack = createStackNavigator();

const App = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="auth_screen">
        <Stack.Screen name="main_screen" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="auth_screen" component={AuthScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
