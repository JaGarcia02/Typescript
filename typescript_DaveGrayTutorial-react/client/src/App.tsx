import { useState } from "react";
import Heading from "./components/Heading";
import { Section } from "./components/Section";
import Counter from "./components/Counter";

function App() {
  return (
    <>
      <Heading title={"Hello"} />
      <Section title={"Different Title"}>This is My section</Section>
      <Counter />
    </>
  );
}

export default App;
