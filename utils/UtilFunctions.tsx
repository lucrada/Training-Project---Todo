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
        if (category.id === categoryId) name = category.title;
    });
    return name;
};

const fetchCategoryItems = () => {
    let categoryItems = [];

    dummyCategory.forEach(category => {
        let item = {};
        item.title = category.title, item.id = category.id, item.color = category.color, item.pending = 0;
        dummyTodo.forEach(todo => { if (!todo.finished && todo.category_id == item.id) item.pending++ });
        categoryItems.push(item);
    });

    return categoryItems;
};

export { fetchTodoListFromCategoryId, fetchCategoryNameFromCategoryId, fetchCategoryItems };
