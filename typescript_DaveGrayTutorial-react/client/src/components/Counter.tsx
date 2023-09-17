import React, { ReactNode, useState } from "react";
type CounterProps = {
  setCount: React.Dispatch<React.SetStateAction<number>>;
  children: ReactNode;
  count: number;
};

const Counter = ({ setCount, children, count }: CounterProps) => {
  console.log(count);
  return (
    <>
      <h1>{children}</h1>
      {/* <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      <button onClick={() => setCount((prev) => prev - 1)}>-</button> */}

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
