import React, { useEffect, useState } from 'react';
import Todo from '../Todo/Todo';
import TodoForm from '../TodoForm/TodoForm';

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch('https://todo-app-server-site.herokuapp.com/todoList')
            .then(res => res.json())
            .then(data => setTodos(data))
    }, [])

    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }

        fetch('https://todo-app-server-site.herokuapp.com/addTodo', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo)
        })
            .then(res => res.json())
            .then(data => setTodos([data, ...todos]))
    }

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }

        const updatedTodo = { text: newValue.text };

        fetch(`https://todo-app-server-site.herokuapp.com/update/${todoId}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTodo)
        })
            .then(res => res.json())
            .then(result => {
                result && setTodos(prev => prev.map(item => (item._id === todoId ? newValue : item)));
            })
    };

    const removeTodo = id => {
        const removedArr = [...todos].filter(todo => todo._id !== id);

        fetch(`https://todo-app-server-site.herokuapp.com/delete/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(result => {
                result && setTodos(removedArr);
            })
    };

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo._id === id) {
                todo.isComplete = !todo.isComplete;

                fetch(`https://todo-app-server-site.herokuapp.com/completedTodo/${id}`, {
                    method: "PATCH",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(todo)
                })
            }
            return todo;
        })
        setTodos(updatedTodos)
    }

    return (
        <>
            <h1>What's the Plan for Today?</h1>
            <TodoForm onSubmit={addTodo} />
            <Todo todos={todos}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
            />
        </>
    );
};

export default TodoList;