/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import VerticalSpacer from '../utils/VerticalSpacer';

const TodoItemsComponent = (): React.JSX.Element => {
    return (
        <View style={styles.container}>
            <Text style={styles.categoryTitle}>Today's Task</Text>
            <VerticalSpacer amount={15} />
            <View style={styles.list}></View>
            <VerticalSpacer amount={15} />
            <TouchableOpacity><View style={styles.addButton}><Text style={{ fontSize: 40, color: '#fff', marginTop: -7}}>+</Text></View></TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        width: 362,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginLeft: -20,
        padding: 30,
    },
    categoryTitle: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20,
    },
    list: {
        height: 300,
    },
    addButton: {
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        backgroundColor: '#9545ca',
        borderRadius: 10,
    },
});

export default TodoItemsComponent;
