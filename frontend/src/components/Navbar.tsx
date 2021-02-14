import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Login from "./Auth/Login";
import Logout from "./Auth/Logout";
import ProfileInfo from "./Auth/ProfileInfo";

export default function Navbar() {
  const [jwt, setJwt] = useLocalStorage("jwt", null);

  const handleLogout = () => {
    setJwt(null);
  };

  return jwt ? (
    <>
      <ProfileInfo />
      <Logout handleLogout={handleLogout} />
    </>
  ) : (
    <Login />
  );
}
