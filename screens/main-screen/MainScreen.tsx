/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';
import styles from './Style';
import HeaderComponent from '../../components/HeaderComponent';
import VerticalSpacer from '../../utils/VerticalSpacer';
import CategoryComponent from '../../components/CategoryComponent';
import TodoItemsComponent from '../../components/TodoItemsComponent';

const MainScreen = () : React.JSX.Element => {
  return (
    <View style={styles.container}>
          <HeaderComponent name="Abhijith K A" />
      <VerticalSpacer amount={20} />
      <CategoryComponent />
      <VerticalSpacer amount={40} />
      <TodoItemsComponent />
    </View>
  );
};

export default MainScreen;
