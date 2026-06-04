import "./styles.css";
import React, { useEffect, experimental_use as use } from "react";

const getUsers = () =>
  new Promise((resolve) => setTimeout(() => resolve(), 1000));

export default function App() {
  const [count1, setCount1] = React.useState(0);
  const [count2, setCount2] = React.useState(0);

  // 한번 클릭시 2번 실행됨
  // await지우면 한번이네 ㄷㄷ
  // 18에서는 한번만 실행되네
  // 중간에 await를 넣으면 batching안되서 2번
  useEffect(() => {
    console.log("count1", count1);
    console.log("count2", count2);
  }, [count1, count2]);

  const onClick = async () => {
    await getUsers();
    setCount1(count1 + 1);
    setCount2(count2 + 1);
  };

  return (
    <div className="App">
      <h1>Counter</h1>
      <h2>Count1: {count1}</h2>
      <h2>Count2: {count2}</h2>
      <button onClick={onClick}>Click</button>
    </div>
  );
}
