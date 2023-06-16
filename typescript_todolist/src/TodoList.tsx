import React, { useState } from "react";

interface item {
  id: number;
  text: string;
  complete: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<item[]>([
    { id: 1, text: "Learn Typescript with Ja Garcia", complete: false },
    { id: 2, text: "Build Todo App", complete: false },
  ]);

  const [input, setInpt] = useState<string>("");

  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      })
    );
  };

  const handleClick = () => {
    const newTodo: item = { id: Date.now(), text: input, complete: false };
    setTodos([...todos, newTodo]);
  };
  return (
    <div className="main-container">
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => handleToggle(todo.id)}
            style={{ textDecoration: todo.complete ? "line-through" : "none" }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Add todo item"
        onChange={(e) => setInpt(e.currentTarget.value)}
      />
      <button onClick={handleClick}>Add</button>
    </div>
  );
};

export default TodoList;
