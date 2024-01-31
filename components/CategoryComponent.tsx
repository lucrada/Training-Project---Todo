/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchCategoryItems } from '../utils/UtilFunctions';

const CategoryItem = (props): React.JSX.Element => {
    return (
        <TouchableOpacity onPress={props.handlePress}>
            <View style={{ ...styles.categoryContainer, backgroundColor: props.color }}>
                <Text style={styles.categoryTitle}>{props.title}</Text>
                <Text style={styles.categoryPending}>{props.pending} pending tasks</Text>
                <TouchableOpacity style={{width: 30, }}><Text style={{fontSize: 40, fontWeight: 'bold', width: 30}}>+</Text></TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const AddCategoryItem = (props): React.JSX.Element => {
    return (
        <TouchableOpacity>
            <View style={styles.addContainer}>
                <Text style={{ fontSize: 80, marginBottom: 10, color: '#9545ca' }}>+</Text>
            </View>
        </TouchableOpacity>
    );
};

const CategoryComponent = (props): React.JSX.Element => {
    const [categoryItems, setCategoryItems] = React.useState([]);

    React.useEffect(() => {
        setCategoryItems(fetchCategoryItems());
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Category</Text>
            <ScrollView horizontal={true}>
                <AddCategoryItem />
                {categoryItems.map(category => <CategoryItem key={category.id} {...category} handlePress={() => props.handleItemPress(category.id)} />)}
            </ScrollView>
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
        justifyContent: 'flex-end',
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
