import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import CaseContainer from "./components/Case/CaseContainer";
import ApplicationContext, {
  AppProvider,
} from "./components/ApplicationProvider";

function App() {
  const context = useContext(ApplicationContext);

  return (
    <div className="App">
      <AppProvider>
        <Navbar />
        <div className="pt-16">
          {context?.isAuthenticated ? (
            <CaseContainer />
          ) : (
            <div>Please log in first</div>
          )}
        </div>
      </AppProvider>
    </div>
  );
}

export default App;
