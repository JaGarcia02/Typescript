import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <>
      <h1>Count is {count}</h1>
      {count == 10 ? (
        ""
      ) : (
        <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      )}

      {count == 0 ? (
        ""
      ) : (
        <button onClick={() => setCount((prev) => prev - 1)}>-</button>
      )}
    </>
  );
};

export default Counter;
