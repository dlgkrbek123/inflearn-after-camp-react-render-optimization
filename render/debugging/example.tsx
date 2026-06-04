import React, { useTransition } from "react";
import { createRoot } from "react-dom/client";
const { memo, useEffect, useState } = React;
import "./index.css";

const targetURL =
  "https://raw.githubusercontent.com/jason-chao/wordle-solver/main/english_words_original_wordle.txt";

const Word = memo(
  ({ name, highlight = "" }) => {
    const letters = name.split("");
    return (
      <li>
        {letters.map((l, i) => (
          <span className={highlight.includes(l) ? "h" : ""} key={i}>
            {l}
          </span>
        ))}
      </li>
    );
  },
  (prevProps, nextProps) => {
    const letters = prevProps.name.split("");
    // 'aahed' -> ['a', 'a', 'h', 'e', 'd']

    return letters.every((l) => {
      return (
        nextProps.highlight.includes(l) === prevProps.highlight.includes(l)
      );
    });
  },
);

const Words = ({ list, filter }) => {
  return (
    <ul>
      {list.map((name) => (
        <Word key={name} name={name} highlight={filter} />
      ))}
    </ul>
  );
};

function FilterWords() {
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(targetURL)
      .then((r) => r.text())
      .then((r) => setList(r.split("\n").sort()));
  }, []);
  const [filter, setFilter] = useState("");

  const handleChange = ({ target: { value } }) => {
    setFilter(value);
  };

  return (
    <main>
      <label>
        Filter:
        <input type="search" value={filter} onChange={handleChange} />
      </label>
      <Words list={list} filter={filter} />
    </main>
  );
}

function App() {
  return <FilterWords />;
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
