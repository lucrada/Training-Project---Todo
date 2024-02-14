/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';
import styles from './Style';
import HeaderComponent from '../../components/HeaderComponent';
import VerticalSpacer from '../../utils/VerticalSpacer';
import CategoryComponent from '../../components/CategoryComponent';
import TodoItemsComponent from '../../components/TodoItemsComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getUpdateAuthStatusRequest } from '../../actions/actions';

const MainScreen = ({ navigation }): React.JSX.Element => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  React.useEffect(() => {
    dispatch(getUpdateAuthStatusRequest());
    if (auth.userId === '') {
      navigation.navigate('auth_screen');
    }
  }, [navigation, auth.userId, dispatch]);

  return (
    <View style={styles.container}>
      <HeaderComponent navigation={navigation} name={auth.name} />
      <VerticalSpacer amount={20} />
      <CategoryComponent />
      <VerticalSpacer amount={40} />
      <TodoItemsComponent />
    </View>
  );
};

export default MainScreen;
