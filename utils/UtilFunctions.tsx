/* eslint-disable prettier/prettier */
import dummyTodo from '../data/DUMMY_TODO';
import dummyCategory from '../data/DUMMY_CATEGORY';

const fetchTodoListFromCategoryId = (categoryId) => {
    let todoList = [];
    dummyTodo.forEach(todo => todo.category_id === categoryId && todoList.push(todo));
    return todoList;
};

const fetchCategoryNameFromCategoryId = (categoryId) => {
    let name;
    dummyCategory.forEach(category => {
        if (category.id === categoryId) name = category.name;
    });
    return name;
};

export { fetchTodoListFromCategoryId, fetchCategoryNameFromCategoryId };
