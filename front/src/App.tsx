import { useState } from "react";
import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>

      
      <footer
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          backgroundColor: "rgba(145, 143, 143, 0.8)",
          padding: "5px 10px",
          borderRadius: "5px 0 0 0",
          fontSize: "0.9rem",
        }}
      >
        © Developed by <strong>Edward Giraldo</strong>
      </footer>
    </>
  );
}

export default App;
