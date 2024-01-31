/* eslint-disable prettier/prettier */
import React from 'react';
import CategoryComponent from './CategoryComponent';
import TodoItemsComponent from './TodoItemsComponent';
import VerticalSpacer from '../utils/VerticalSpacer';
import { StyleSheet, View } from 'react-native';

const NestedCategoryTodo = (): React.JSX.Element => {
    const [categoryId, setCategoryId] = React.useState(1);

    const handleCategoryItemPress = (id) => {
        setCategoryId(id);
    };

    return (
        <View style={styles.nest_container}>
            <CategoryComponent handleItemPress={handleCategoryItemPress} />
            <VerticalSpacer amount={40} />
            <TodoItemsComponent categoryId={categoryId} />
        </View>
    );
};

const styles = StyleSheet.create({
    nest_container: {
        flex: 1,
    },
});

export default NestedCategoryTodo;