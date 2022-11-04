import React, { useState } from "react";
import { ResultsList } from "./components/ResultsList/ResultsList";
import { Input } from "./components/Input/Input";
import { Button } from "./components/Button/Button";
import "./App.css";

const API_URL = "http://localhost:8010/proxy/suburbs.json?q=";

export default function App() {
  const [results, setResults] = useState([]);
  const [selectTerm, setSelectTerm] = useState("");
  //   Fecth relate data from API and get the feedback
  const fecthData = async (query) => {
    await fetch(`${API_URL}${query.toLowerCase()}`)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result) {
            let currentList = [];
            // Find the items with the same starts as the input
            // Only searching by the suburb name not include the state with comma divider
            // eslint-disable-next-line
            result.map((item) => {
              if (
                query.toLowerCase() ===
                item.name.slice(0, query.length).toLowerCase()
              ) {
                currentList.push({
                  name: item.name,
                  state: item.state.abbreviation,
                });
              }
            });
            // Sort the unique item
            // eslint-disable-next-line
            const uniqueList = currentList.filter((value, index, self) => {
              return (
                self.map((item) => item.name).indexOf(value.name) === index ||
                self.map((item) => item.state).indexOf(value.state) === index
              );
            });
            setResults(uniqueList);
          } else {
            setResults([]);
          }
        },
        (error) => {
          console.log("error", error);
        }
      );
  };
  // Parameter pass to <Input />
  const onChange = (value) => {
	// Reduce 1 time API call when the input is empty
    if (value === "") {
      setResults([]);
    } else {
      fecthData(value);
    }
  };
  //   Parameter pass to <ResultsList />
  const handleSelect = (item) => {
    setSelectTerm(`${item.name}, ${item.state}`);
    setResults([]);
  };
  //   Parameter pass to <Button />
  const handleClick = () => {
    if (selectTerm) {
      alert(`You have selected ${selectTerm}`);
      setSelectTerm("");
      setResults([]);
    }
  };
  return (
    <>
      <section>
        TODO: Implement a suburb autocomplete using &lt;Input /&gt;,
        &lt;ResultsList /&gt; and &lt;Button /&gt; and data provided by the{" "}
        <a href="http://localhost:8010/proxy/suburbs.json?name=Syd">API</a>.
      </section>
      <section className="title">Zhen Yang Coding Test</section>
      <section className="searching-container">
        <div className="searching-container_item">Suburb</div>
        <div className="searching-container_input-button-container">
          <Input onChange={onChange} value={selectTerm} />
          <Button
            onClick={handleClick}
            className="searching-container_button"
          />
          <ResultsList
            items={results}
            onSelect={handleSelect}
            className="searching-container_resultList"
          />
        </div>
      </section>
    </>
  );
}
