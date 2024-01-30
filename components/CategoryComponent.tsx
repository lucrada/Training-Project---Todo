/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const CategoryItem = (props): React.JSX.Element => {
    return (
        <TouchableOpacity>
            <View style={{ ...styles.categoryContainer, backgroundColor: props.color }}>
                <Text style={styles.categoryTitle}>{props.title}</Text>
                <Text style={styles.categoryPending}>{props.pending} pending tasks</Text>
                <TouchableOpacity><Text style={{fontSize: 40, fontWeight: 'bold',}}>+</Text></TouchableOpacity>
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

const CategoryComponent = (): React.JSX.Element => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Category</Text>
            <ScrollView horizontal={true}>
                <AddCategoryItem />
                <CategoryItem title="Design" pending={3} color="#ff3461" />
                <CategoryItem title="Learning" pending={5} color="#077ffc" />
                <CategoryItem title="Meeting" pending={2} color="#fead28" />
                <CategoryItem title="Today" pending={12} color="#3dc2a5" />
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
