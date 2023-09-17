import React, { useState } from "react";
import "./App.css";
import InputFeild from "./components/InputFeild";
import { Todo } from "./models/todo_model";
import TodoList from "./components/TodoList";

// let name: string; // string
// let age: number | string; // number (this is called union)
// let isStudent: boolean; // boolean
// let hoobies: string[]; // string array
// let role: [number, string]; // tuple

// function printName(name: string) {
//   console.log(name);
// }

// let printName: (name: string) => never;

// type Person = {
//   name: string;
//   age?: number;
// };

// let person: Person = {
//   name: "Ja Garcia",
// };

// let lotsOfPeaople: Person[];

// type X = {
//   a: string;
//   b: number;
// };

// interface Person extends X {
//   name: string;
//   age?: number;
// }

// interface Guy extends Person {
//   profession: string;
// }

// type Y = X & {
//   c: string;
//   d: number;
// };

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      setTodo("");
    }
  };
  console.log(todos);
  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;

// https://www.youtube.com/watch?v=FJDVKeh7RJI&t=311s&ab_channel=freeCodeCamp.org 1:03:32
