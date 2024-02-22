/* eslint-disable prettier/prettier */
import React from 'react';
import VerticalSpacer from '../utils/VerticalSpacer';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Alert, Animated } from 'react-native';
import AddTodoModal from './AddTodoModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAddTodoRequest, getDecrementRequest, getFetchTodosRequest, getIncrementRequest, getRemoveTodoRequest, getToggleTodoRequest } from '../actions/actions';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const TodoItem = (props): React.JSX.Element => {
    const width = React.useState(new Animated.Value(0))[0];
    const opacity = React.useState(new Animated.Value(0))[0];
    const [formattedDate, setFormattedDate] = React.useState('');
    const [formattedTime, setFormattedTime] = React.useState('');

    React.useEffect(() => {
        if (props.date) {
            const date = new Date(props.date);
            const formattedDate = date.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            });
            setFormattedDate(formattedDate);
        }

        if (props.time) {
            const time = new Date(props.time);
            let formattedTime = time.toLocaleDateString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            });
            formattedTime = formattedTime.split(' ')[1] + ' ' + formattedTime.split(' ')[2];
            setFormattedTime(formattedTime);
        }
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false,
            }),
            Animated.timing(width, {
                toValue: WINDOW_WIDTH * 0.915,
                duration: 500,
                useNativeDriver: false,
            }),
        ]).start();
    }, [props.date, props.time, opacity, width]);

    return (
        <Animated.View style={{ ...styles.todoItem, width: width, opacity: opacity }}>
            <View style={styles.todoItemDetail}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.todoItemBullet} />
                    <Text style={{ ...styles.todoItemText, textDecorationLine: props.finished ? 'line-through' : 'none', color: props.finished ? '#888' : '#000' }}>{props.task}</Text>
                </View>
                <VerticalSpacer amount={10} />
                <View style={{ flexDirection: 'row' }}>
                    <VerticalSpacer amount={10} />
                    {props.date ? <View style={{ backgroundColor: '#040d3a', padding: 5, borderRadius: 5, marginRight: 5 }}><Text style={{ color: 'lightgrey' }}>{formattedDate}</Text></View> : null}
                    <VerticalSpacer amount={10} />
                    {props.time ? <View style={{ backgroundColor: '#040d3a', padding: 5, borderRadius: 5 }}><Text style={{ color: 'lightgrey' }}>{formattedTime}</Text></View> : null}
                </View>
            </View>
            <View style={styles.todoItemActions}>
                <TouchableOpacity onPress={props.finished ? props.undoFinishTask : props.finishTask}><View style={{ ...styles.action1, backgroundColor: props.finished ? '#077ffc' : '#3dc2a5' }} /></TouchableOpacity>
                <TouchableOpacity onPress={props.deleteTask}><View style={styles.action2} /></TouchableOpacity>
            </View>
        </Animated.View>
    );
};

const TodoItemsComponent = (props): React.JSX.Element => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [newTodoItem, setNewTodoItem] = React.useState('');
    const [date, setDate] = React.useState(new Date());
    const [time, setTime] = React.useState(new Date());

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getFetchTodosRequest());
    }, [dispatch]);

    const todoState = useSelector(state => state.todo);
    const todos = todoState.todos;
    const categoryState = useSelector(state => state.category);
    const categoryTitle = categoryState.selectedCategory.title;
    const categoryId = categoryState.selectedCategory.id;

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);
    const handleTextChange = (task) => setNewTodoItem(task);
    const handleDateChange = (date) => setDate(date);
    const handleTimeChange = (time) => setTime(time);

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
        let newTodo = { category_id: categoryId, task: newTodoItem, date: date, time: time, finished: false };
        setNewTodoItem('');
        dispatch(getAddTodoRequest(newTodo));
        dispatch(getIncrementRequest(categoryId));
        closeModal();
    };

    const finishTask = (itemId) => {
        dispatch(getToggleTodoRequest(itemId));
        dispatch(getDecrementRequest(categoryId));
    };

    const undoFinishTask = (itemId) => {
        dispatch(getToggleTodoRequest(itemId));
        dispatch(getIncrementRequest(categoryId));
    };

    const deleteTask = (itemId) => {
        dispatch(getRemoveTodoRequest(itemId));
        todos.map(item => item.id === itemId && !item.finished && dispatch(getDecrementRequest(categoryId)));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.categoryTitle}>{categoryTitle}</Text>
            <VerticalSpacer amount={15} />
            {
                todos.filter(item => item.category_id === categoryId).length === 0 ? <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center', color: 'black' }}>Your todo list appear here</Text> :
                    <ScrollView style={styles.list}>
                        {todos.map(item => item.category_id === categoryId && <TodoItem key={item.id} {...item} finishTask={() => finishTask(item.id)} undoFinishTask={() => undoFinishTask(item.id)} deleteTask={() => deleteTask(item.id)} />)}
                    </ScrollView>
            }
            <VerticalSpacer amount={15} />
            <TouchableOpacity style={styles.addButtonTouch} onPress={openModal}><View style={styles.addButton}><Text style={{ fontSize: 40, color: '#fff', marginTop: -7 }}>+</Text></View></TouchableOpacity>
            <AddTodoModal closeModal={closeModal} handleTextChange={handleTextChange} handleDateChange={handleDateChange} handleTimeChange={handleTimeChange} addItem={addNewItem} modalVisible={modalVisible} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        flexDirection: 'column',
        backgroundColor: '#fff',
        width: (WINDOW_WIDTH * 100) / 100,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginLeft: -(WINDOW_WIDTH * 5.5) / 100,
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
        right: WINDOW_WIDTH * 0.05,
        top: WINDOW_HEIGHT * 0.45,
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
        flexDirection: 'column',
        alignItems: 'flex-start',
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
