import React from "react";

type LogoutProps = {
  handleLogout: () => void;
};

export default function Logout({ handleLogout }: LogoutProps) {
  return (
    <button
      className="p-2 text-white transition-colors duration-150 bg-red-500 rounded-lg focus:shadow-outline hover:bg-red-400 font-medium"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
