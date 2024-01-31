/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';
import styles from './Style';
import HeaderComponent from '../../components/HeaderComponent';
import VerticalSpacer from '../../utils/VerticalSpacer';
import NestedCategoryTodo from '../../components/NestedCategoryTodo';

const MainScreen = () : React.JSX.Element => {
  return (
    <View style={styles.container}>
          <HeaderComponent name="Abhijith K A" />
          <VerticalSpacer amount={20} />
          <NestedCategoryTodo />
    </View>
  );
};

export default MainScreen;
