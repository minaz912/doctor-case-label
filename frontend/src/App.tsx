import React from "react";
import Navbar from "./components/Navbar";
import { AppProvider } from "./components/ApplicationProvider";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Navbar />
        <Layout />
      </AppProvider>
    </div>
  );
}

export default App;
