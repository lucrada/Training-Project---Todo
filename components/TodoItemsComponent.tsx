/* eslint-disable prettier/prettier */
import React from 'react';
import VerticalSpacer from '../utils/VerticalSpacer';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Alert, Animated } from 'react-native';
import AddTodoModal from './AddTodoModal';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleStatus, deleteTodo } from '../reducers/todoSlice';
import { decrementPendingTask, incrementPendingTask, selectCategory } from '../reducers/categorySlice';

const TodoItem = (props): React.JSX.Element => {
    const width = React.useState(new Animated.Value(0))[0];
    const opacity = React.useState(new Animated.Value(0))[0];

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false,
            }),
            Animated.timing(width, {
                toValue: Dimensions.get('window').width * 0.915,
                duration: 500,
                useNativeDriver: false,
            }),
        ]).start();
    });

    return (
        <Animated.View style={{...styles.todoItem, width: width, opacity: opacity}}>
            <View style={styles.todoItemDetail}>
                <View style={styles.todoItemBullet} />
                <Text style={{ ...styles.todoItemText, textDecorationLine: props.finished ? 'line-through' : 'none', color: props.finished ? '#888' : '#000' }}>{props.task}</Text>
            </View>
            <View style={styles.todoItemActions}>
                <TouchableOpacity onPress={props.finished ? props.undoFinishTask : props.finishTask}><View style={{...styles.action1, backgroundColor: props.finished ? '#077ffc' : '#3dc2a5'}} /></TouchableOpacity>
                <TouchableOpacity onPress={props.deleteTask}><View style={styles.action2} /></TouchableOpacity>
            </View>
        </Animated.View>
    );
};

const TodoItemsComponent = (props): React.JSX.Element => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [newTodoItem, setNewTodoItem] = React.useState('');

    const dispatch = useDispatch();
    const todoState = useSelector(state => state.todo);
    const todos = todoState.todos;
    const categoryState = useSelector(state => state.category);
    const categoryTitle = categoryState.selectedCategory.title;
    const categoryId = categoryState.selectedCategory.id;

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);
    const handleTextChange = (task) => setNewTodoItem(task);

    const addNewItem = () => {
        if (newTodoItem === '') {
            Alert.alert('Warning', 'Task cannot be empty!');
            closeModal();
            return;
        }
        if (categoryId === 0) {
            Alert.alert('Warning', 'Create a category first');
            closeModal();
            return;
        }
        let newTodo = { id: nanoid(), category_id: categoryId, task: newTodoItem, finished: false};
        setNewTodoItem('');
        dispatch(addTodo(newTodo));
        dispatch(incrementPendingTask(categoryId));
        closeModal();
    };

    const finishTask = (itemId) => {
        dispatch(toggleStatus(itemId));
        dispatch(decrementPendingTask(categoryId));
    };

    const undoFinishTask = (itemId) => {
        dispatch(toggleStatus(itemId));
        dispatch(incrementPendingTask(categoryId));
    };

    const deleteTask = (itemId) => {
        dispatch(deleteTodo(itemId));
        todos.map(item => item.id === itemId && !item.finished && dispatch(decrementPendingTask(categoryId)));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.categoryTitle}>{categoryTitle}</Text>
            <VerticalSpacer amount={15} />
            {
                todos.filter(item => item.category_id === categoryId).length === 0 ? <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center', color: 'black'}}>Your todo list appear here</Text> : 
                <ScrollView style={styles.list}>
                        {todos.map(item => item.category_id === categoryId && <TodoItem key={item.id} {...item} finishTask={() => finishTask(item.id)} undoFinishTask={() => undoFinishTask(item.id)} deleteTask={() => deleteTask(item.id)} />)}
                </ScrollView>
            }
            <VerticalSpacer amount={15} />
            <TouchableOpacity style={styles.addButtonTouch} onPress={openModal}><View style={styles.addButton}><Text style={{ fontSize: 40, color: '#fff', marginTop: -7}}>+</Text></View></TouchableOpacity>
            <AddTodoModal closeModal={closeModal} handleTextChange={handleTextChange} addItem={addNewItem} modalVisible={modalVisible} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
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
    addButtonTouch: {
        position: 'absolute',
        right: Dimensions.get('window').width * 0.05,
        top: Dimensions.get('window').height * 0.45,
    },
    addButton: {
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
