import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
const { memo, useEffect, useState, useTransition } = React;

const targetURL =
  "https://raw.githubusercontent.com/jason-chao/wordle-solver/main/english_words_original_wordle.txt";

function FilterWords() {
  const [filter, setFilter] = useState(""); // 필터
  const [deferedFilter, setDeferedFilter] = useState("");

  const [list, setList] = useState([]); // 한번만 fetch 해옴

  const [isPending, startTransition] = useTransition();

  const handleChange = ({ target: { value } }) => {
    startTransition(() => {
      setDeferedFilter(value);
    });
    setFilter(value);
  };

  useEffect(() => {
    fetch(targetURL)
      .then((r) => r.text())
      .then((r) => setList(r.split("\n").sort()));
  }, []);

  return (
    <main>
      <label>
        Filter:
        <input type="search" value={filter} onChange={handleChange} />
      </label>
      <Words list={list} filter={deferedFilter} />
    </main>
  );
}

const Words = memo(function Words({ list, filter }) {
  const counts = countLetters(filter);
  const filteredList = list.filter((name) => isMatch(name, counts));

  return (
    <ul>
      {filteredList.map((name) => (
        <Word key={name} name={name} highlight={filter} />
      ))}
    </ul>
  );
});

function Word({ name, highlight = "" }) {
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
}

function App() {
  return <FilterWords />;
}

function countLetters(str) {
  return str.split("").reduce((cs, l) => {
    cs[l] = (cs[l] || 0) + 1;
    return cs;
  }, {});
}

function isMatch(word, letterCounts) {
  const ws = word.split("");

  return Object.entries(letterCounts).every(
    ([l, c]) => ws.filter((w) => w == l).length >= c,
  );
}

const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);
root.render(<App />);
