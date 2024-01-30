/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import VerticalSpacer from '../utils/VerticalSpacer';
import { fetchTodoListFromCategoryId, fetchCategoryNameFromCategoryId } from '../utils/UtilFunctions';

const TodoItem = (props): React.JSX.Element => {
    return (
        <View style={styles.todoItem}>
            <View style={styles.todoItemDetail}>
                <View style={styles.todoItemBullet} />
                <Text style={{ ...styles.todoItemText, textDecorationLine: props.finished ? 'line-through' : 'none', color: props.finished ? '#888' : '#000' }}>{props.task}</Text>
            </View>
            <View style={styles.todoItemActions}>
                <TouchableOpacity><View style={{...styles.action1, backgroundColor: props.finished ? '#077ffc' : '#3dc2a5'}} /></TouchableOpacity>
                <TouchableOpacity><View style={styles.action2} /></TouchableOpacity>
            </View>
        </View>
    );
};

const TodoItemsComponent = (): React.JSX.Element => {
    const [categoryId, setCategoryId] = React.useState(1);
    const [todoList, setTodoList] = React.useState([]);
    const [categoryName, setCategoryName] = React.useState('');

    React.useEffect(() => {
        setTodoList(fetchTodoListFromCategoryId(categoryId));
        setCategoryName(fetchCategoryNameFromCategoryId(categoryId));
    }, [categoryId]);

    return (
        <View style={styles.container}>
            <Text style={styles.categoryTitle}>{categoryName}</Text>
            <VerticalSpacer amount={15} />
            <ScrollView style={styles.list}>
                {todoList.map(item => <TodoItem key={item.id} {...item} />)}
            </ScrollView>
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
        width: (Dimensions.get('window').width * 100) / 100,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginLeft: -(Dimensions.get('window').width * 5.5) / 100,
        paddingVertical: 30,
        paddingHorizontal: 15,
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
    todoItem: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f1effa',
        marginBottom: 10,
        borderRadius: 10,
    },
    todoItemDetail: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    todoItemBullet: {
        marginRight: 10,
        width: 10,
        height: 10,
        borderRadius: 3,
        backgroundColor: '#9545ca',
    },
    todoItemText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
    todoItemActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    action1: {
        width: 15,
        height: 15,
        marginRight: 10,
        borderRadius: 10,
    },
    action2: {
        width: 15,
        height: 15,
        backgroundColor: '#ff3461',
        borderRadius: 10,
    },

});

export default TodoItemsComponent;
