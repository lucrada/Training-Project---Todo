/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View } from 'react-native';
import styles from './Style';

const AddTodoScreen = () : React.JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Todo Screen</Text>
    </View>
  );
};

export default AddTodoScreen;
