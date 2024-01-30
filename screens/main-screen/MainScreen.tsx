/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';
import styles from './Style';
import HeaderComponent from '../../components/HeaderComponent';

const MainScreen = () : React.JSX.Element => {
  return (
    <View style={styles.container}>
          <HeaderComponent name="Abhijith K A" />
    </View>
  );
};

export default MainScreen;
