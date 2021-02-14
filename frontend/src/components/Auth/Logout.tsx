import React from "react";

type LogoutProps = {
  handleLogout: () => void;
};

export default function Logout({ handleLogout }: LogoutProps) {
  return (
    <button className="" onClick={handleLogout}>
      Logout
    </button>
  );
}
