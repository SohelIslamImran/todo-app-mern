import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import Logout from '../Logout/Logout';
import Todo from '../Todo/Todo';
import TodoForm from '../TodoForm/TodoForm';

const TodoList = ({ showPopup }) => {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/todoList')
            .then(res => res.json())
            .then(data => {
                setTodos(data);
                setLoggedInUser(data[0]);
            })
    }, [])

    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }

        loggedInUser.isSignedIn ? (
            fetch('http://localhost:5000/addTodo', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...loggedInUser, ...todo })
            })
                .then(res => res.json())
                .then(data => setTodos([data, ...todos]))
        ) : showPopup(true);
    }

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }

        const updatedTodo = { text: newValue.text };

        fetch(`http://localhost:5000/update/${todoId}`, {
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

        fetch(`http://localhost:5000/delete/${id}`, {
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

                fetch(`http://localhost:5000/completedTodo/${id}`, {
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
            <div>
                <Logout todos={todos} />
                <h1>What's the Plan for Today?</h1>
            </div>
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