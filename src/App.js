import React from "react";
import "./styles.css";
import { Container } from "./components/Containter";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Container />
      </BrowserRouter>
    </div>
  );
}
