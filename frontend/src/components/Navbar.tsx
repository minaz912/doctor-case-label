import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Login from "./Login/Login";
import ProfileInfo from "./Login/ProfileInfo";

export default function Navbar() {
  const [jwt] = useLocalStorage("jwt", null);

  return jwt ? <ProfileInfo /> : <Login />;
}
