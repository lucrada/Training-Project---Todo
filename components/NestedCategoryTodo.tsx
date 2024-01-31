/* eslint-disable prettier/prettier */
import React from 'react';
import CategoryComponent from './CategoryComponent';
import TodoItemsComponent from './TodoItemsComponent';
import VerticalSpacer from '../utils/VerticalSpacer';
import { StyleSheet, View } from 'react-native';
import dummyTodo from '../data/DUMMY_TODO';
import dummyCategory from '../data/DUMMY_CATEGORY';

const NestedCategoryTodo = (): React.JSX.Element => {
    const [todoList, setTodoList] = React.useState(dummyTodo);
    const [todoListWithId, setTodoListWithId] = React.useState([]);
    const [categories, setCategories] = React.useState(dummyCategory);
    const [categoryId, setCategoryId] = React.useState(1);
    const [categoryName, setCategoryName] = React.useState('');

    React.useEffect(() => {
        setCategoryName(_fetchCategoryNameFromId(categoryId));
        setTodoListWithId(_fetchTodoListFromCategoryId(categoryId));
    }, [categoryId]);

    React.useEffect(() => {
        setCategories(_fetchUpdatedCategories());
        setTodoListWithId(_fetchTodoListFromCategoryId(categoryId));
    }, [todoList]);

    const addTodoListItem = (item) => {
        setTodoList([item, ...todoList]);
    };

    const _fetchCategoryNameFromId = (id) => {
        let name = '';
        categories.forEach(category => {
            if (category.id === id) name = category.title;
        });
        return name;
    };

    const _fetchTodoListFromCategoryId = (id) => {
        return todoList.filter(item => item.category_id === id);
    };

    const _fetchUpdatedCategories = () => {
        let categoryItems = [];

        categories.forEach(category => {
            let item = {};
            item.title = category.title, item.id = category.id, item.color = category.color, item.pending = 0;
            todoList.forEach(todo => { if (!todo.finished && todo.category_id == item.id) item.pending++ });
            categoryItems.push(item);
        });

        return categoryItems;
    };

    const handleCategoryItemPress = (id) => {
        setCategoryId(id);
    };

    const finishTask = (id) => {
        setTodoList(prevTodoList => {
            return prevTodoList.map(item => {
                if (item.id === id) {
                    return { ...item, finished: true };
                }
                return item;
            });
        });
    };

    const undoFinishTask = (id) => {
        setTodoList(prevTodoList => {
            return prevTodoList.map(item => {
                if (item.id === id) {
                    return { ...item, finished: false };
                }
                return item;
            });
        });
    };

    const deleteTask = (id) => {
        setTodoList(prevTodoList => {
            return prevTodoList.map(item => {
                if (item.id === id) {
                    return { ...item, deleted: true, finished: true };
                }
                return item;
            });
        });
    };

    return (
        <View style={styles.nest_container}>
            <CategoryComponent items={categories} handleItemPress={handleCategoryItemPress} addTodoFunc={addTodoListItem} />
            <VerticalSpacer amount={40} />
            <TodoItemsComponent categoryId={categoryId} categoryName={categoryName} items={todoListWithId} finishTask={finishTask} undoFinishTask={undoFinishTask} deleteTask={deleteTask} addTodoFunc={addTodoListItem} />
        </View>
    );
};

const styles = StyleSheet.create({
    nest_container: {
        flex: 1,
    },
});

export default NestedCategoryTodo;
