import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Login from "./Login/Login";

export default function Navbar() {
  const [jwt] = useLocalStorage("jwt", null);

  return jwt ? <div>"Welcome back"</div> : <Login />;
}
