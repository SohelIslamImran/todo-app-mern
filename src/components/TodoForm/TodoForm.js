import React, { useEffect, useRef, useState } from 'react';

const TodoForm = (props) => {
    const [inputText, setInputText] = useState(props.edit ? props.edit.value : "");

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    })

    const handleChange = e => {
        setInputText(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            text: inputText
        });
        setInputText("");
    }

    return (
        <form onSubmit={handleSubmit} className='todo-form'>
            {props.edit ? (
                <>
                    <input
                        placeholder="Update your item"
                        value={inputText}
                        onChange={handleChange}
                        name="text"
                        ref={inputRef}
                        className="todo-input edit"
                    />
                    <button onClick={handleSubmit} className="todo-button edit">
                        Update
                    </button>
                </>
            ) : (
                <>
                    <input
                        placeholder="Add a todo"
                        value={inputText}
                        onChange={handleChange}
                        name="text"
                        className="todo-input"
                        ref={inputRef}
                    />
                    <button onClick={handleSubmit} className="todo-button">
                        Add todo
                    </button>
                </>
            )}
        </form>
    );
};

export default TodoForm;