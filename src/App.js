import React, { useState, useEffect } from "react";
import { ResultsList } from "./components/ResultsList/ResultsList";
import { Input } from "./components/Input/Input";
import { Button } from "./components/Button/Button";
import "./App.css";

const API_URL = "http://localhost:8010/proxy/suburbs.json?q=";

const API_SAMPLE = [
  { name: "Sydney South", state: { abbreviation: "NSW" } },
  { name: "Sydney", state: { abbreviation: "NSW" } },
  { name: "Sydney International Airport", state: { abbreviation: "NSW" } },
  { name: "Sydney Domestic Airport", state: { abbreviation: "NSW" } },
  { name: "Sydenham", state: { abbreviation: "VIC" } },
];

export default function App() {
  // parameter pass to <Input />
  const onChange = (value) => {
    // console.log(value);
	fecthData(value);
  };
  //   Fecth relate data from API and get the feedback
  const fecthData = async (query) => {
    await fetch(`${API_URL}${query}`)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result", result);
        },
        (error) => {
          console.log("error", error);
        }
      );
  };
  useEffect(() => {
    fecthData('syd');
  }, []);
  return (
    <>
      <section>
        TODO: Implement a suburb autocomplete using &lt;Input /&gt;,
        &lt;ResultsList /&gt; and &lt;Button /&gt; and data provided by the{" "}
        <a href="http://localhost:8010/proxy/suburbs.json?q=Syd">API</a>.
      </section>
      <section className="searching-container">
        <div className="searching-container_item">Suburb</div>
        <Input
          className="searching-container_item"
          onChange={onChange}
        />
        <Button />
        {/* <ResultsList /> */}
      </section>
    </>
  );
}
