import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import CaseLayout from "./components/Case/CaseContainer";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [jwt] = useLocalStorage("jwt", null);

  return (
    <div className="App">
      <Navbar />
      <div className="App-header">
        {jwt ? <CaseLayout /> : <div>Please log in first</div>}
      </div>
    </div>
  );
}

export default App;
