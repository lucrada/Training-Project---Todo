/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import AddTodoModal from './AddTodoModal';
import AddCategoryModal from './AddCategoryModal';

const CategoryItem = (props): React.JSX.Element => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [newTodoItem, setNewTodoItem] = React.useState('');

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);
    const handleTextChange = (task) => setNewTodoItem(task);

    const addNewItem = () => {
        if (newTodoItem === '') return;
        let newTodo = { id: Date.now().toString() + Math.random().toString(36).substring(2), category_id: props.id, task: newTodoItem, finished: false, deleted: false };
        props.addTodoFunc(newTodo);
        closeModal();
    };

    return (
        <View>
        <TouchableOpacity onPress={props.handlePress}>
            <View style={{ ...styles.categoryContainer, backgroundColor: props.color }}>
                <Text style={styles.categoryTitle}>{props.title}</Text>
                <Text style={styles.categoryPending}>{props.pending ? props.pending : 0} pending tasks</Text>
                <TouchableOpacity onPress={openModal} style={{width: 30, }}><Text style={{fontSize: 40, fontWeight: 'bold', width: 30, }}>+</Text></TouchableOpacity>
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

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);
    const handleTextChange = (task) => setNewCategoryItem(task);
    const handleColorSelect = (color) => setColor(color);

    const addNewCategoryItem = () => {
        if (newCategoryItem === '') return;
        if (color === '') return; 
        let newCategory = { id: Date.now().toString() + Math.random().toString(36).substring(2), title: newCategoryItem, color: color};
        props.addCategoryItem(newCategory);
        closeModal();
        props.handleItemPress(newCategory.id);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Category</Text>
            <ScrollView horizontal={true} style={{minHeight: 150,}}>
                <AddCategoryItem handlePress={openModal} />
                {props.items.map(category => <CategoryItem key={category.id} {...category} handlePress={() => props.handleItemPress(category.id)} addTodoFunc={props.addTodoFunc} />)}
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
        flex: 1,
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
});

export default CategoryComponent;
