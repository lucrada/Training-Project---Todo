/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './screens/main-screen/MainScreen';
import AddTodoScreen from './screens/add-todo-screen/AddTodoScreen';

const Stack = createStackNavigator();

const App = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="main_screen">
        <Stack.Screen name="main_screen" component={MainScreen} options={{headerShown: false}} />
        <Stack.Screen name="add_todo_screen" component={AddTodoScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
