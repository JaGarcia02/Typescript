import React, { useRef } from "react";

interface InputFeildProps {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputFeild: React.FC<InputFeildProps> = ({
  todo,
  setTodo,
  handleAdd,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter a task"
        className="input__box"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        required
      />
      <button className="input_submit" type="submit">
        Go
      </button>
    </form>
  );
};

export default InputFeild;
