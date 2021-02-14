import React, { useContext } from "react";
import ApplicationContext from "./ApplicationProvider";
import CaseContainer from "./Case/CaseContainer";

export default function Layout() {
  const { isAuthenticated } = useContext(ApplicationContext);

  return isAuthenticated ? (
    <CaseContainer />
  ) : (
    <div className="m-auto text-xl justify-center">Please log in first</div>
  );
}
