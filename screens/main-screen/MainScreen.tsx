/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View } from 'react-native';
import styles from './Style';

const MainScreen = () : React.JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Main Screen</Text>
    </View>
  );
};

export default MainScreen;
