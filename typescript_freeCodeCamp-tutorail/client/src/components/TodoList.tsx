import React from "react";
import { Todo } from "../models/todo_model";
interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<TodoListProps> = ({ todos, setTodos }) => {
  return <div className="todos"></div>;
};

export default TodoList;
