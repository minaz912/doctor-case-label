import React from "react";
import Navbar from "./components/Navbar";
import CaseLayout from "./components/Case/CaseContainer";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [jwt] = useLocalStorage("jwt", null);

  return (
    <div className="App">
      <Navbar />
      <div className="pt-16">
        {jwt ? <CaseLayout /> : <div>Please log in first</div>}
      </div>
    </div>
  );
}

export default App;
