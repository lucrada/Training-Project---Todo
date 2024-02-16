/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AddTodoModal from './AddTodoModal';
import AddCategoryModal from './AddCategoryModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAddCategoryRequest, getAddTodoRequest, getDeleteCategoryRequest, getFetchCategoriesRequest, getIncrementRequest } from '../actions/actions';
import { selectCategory } from '../reducers/categorySlice';

const CategoryItem = (props): React.JSX.Element => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [newTodoItem, setNewTodoItem] = React.useState('');

    const dispatch = useDispatch();

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);
    const handleTextChange = (task) => setNewTodoItem(task);

    const addNewItem = () => {
        if (newTodoItem === '') {
            Alert.alert('Warning', 'Task cannot be empty');
            closeModal();
            return;
        }
        let newTodo = { category_id: props.id, task: newTodoItem, finished: false };
        dispatch(getAddTodoRequest(newTodo));
        dispatch(selectCategory(newTodo.category_id));
        dispatch(getIncrementRequest(newTodo.category_id));
        closeModal();
    };

    return (
        <View style={{ position: 'relative' }}>
            <TouchableOpacity onPress={() => dispatch(getDeleteCategoryRequest(props.id))} style={styles.categoryCloseButton}>
                <View style={styles.categoryContainerCloseButtonContainer}>
                    <Text style={styles.categoryCloseButtonText}>&#10060;</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(selectCategory(props.id))}>
                <View style={{ ...styles.categoryContainer, backgroundColor: props.color }}>
                    <Text style={styles.categoryTitle}>{props.title}</Text>
                    <Text style={styles.categoryPending}>{props.pending} pending tasks</Text>
                    <TouchableOpacity onPress={openModal} style={{ width: 30 }}><Text style={{ fontSize: 40, fontWeight: 'bold', width: 30 }}>+</Text></TouchableOpacity>
                </View>
            </TouchableOpacity>
            <AddTodoModal closeModal={closeModal} handleTextChange={handleTextChange} addItem={addNewItem} modalVisible={modalVisible} />
        </View>
    );
};

const AddCategoryItem = (props): React.JSX.Element => {
    return (
        <TouchableOpacity onPress={props.handlePress}>
            <View style={styles.addContainer}>
                <Text style={{ fontSize: 80, marginBottom: 10, color: '#9545ca' }}>+</Text>
            </View>
        </TouchableOpacity>
    );
};

const CategoryComponent = (props): React.JSX.Element => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [newCategoryItem, setNewCategoryItem] = React.useState('');
    const [color, setColor] = React.useState('');

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getFetchCategoriesRequest());
    }, [dispatch]);

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);
    const handleTextChange = (task) => setNewCategoryItem(task);
    const handleColorSelect = (color) => setColor(color);

    const categoryState = useSelector(state => state.category);
    const items = categoryState.categories;

    const addNewCategoryItem = () => {
        if (newCategoryItem === '') { return; }
        if (color === '') { return; }
        let newCategory = { title: newCategoryItem, color: color, pending: 0 };
        dispatch(getAddCategoryRequest(newCategory));
        setNewCategoryItem('');
        closeModal();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Category</Text>
            <ScrollView horizontal={true} style={{ minHeight: 170 }} contentContainerStyle={{ alignItems: 'center' }}>
                <AddCategoryItem handlePress={openModal} />
                {items.map(category => <CategoryItem key={category.id} {...category} />)}
            </ScrollView>
            <AddCategoryModal closeModal={closeModal} handleTextChange={handleTextChange} handleColorChange={handleColorSelect} addItem={addNewCategoryItem} modalVisible={modalVisible} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    categoryContainer: {
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: 120,
        height: 150,
        borderRadius: 10,
        marginRight: 10,
        padding: 10,
    },
    categoryTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    categoryPending: {
        color: '#fff',
        fontSize: 12,
        marginTop: 5,
        fontWeight: 'bold',
    },
    addContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 150,
        borderRadius: 10,
        padding: 10,
        borderStyle: 'dotted',
        borderWidth: 2,
        borderColor: '#9545ca',
        marginRight: 10,
    },
    categoryCloseButton: {
        position: 'absolute',
        zIndex: 10,
        right: 4,
        top: -10,
    },
    categoryContainerCloseButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
        borderRadius: 50,
        backgroundColor: '#fff',
        elevation: 3,
        shadowRadius: 3,
    },
    categoryCloseButtonText: {
        fontWeight: 'bold',
        fontSize: 10,
        textAlign: 'center',
    },
});

export default CategoryComponent;
