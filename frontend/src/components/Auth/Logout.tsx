import React from "react";

type LogoutProps = {
  handleLogout: () => void;
};

export default function Logout({ handleLogout }: LogoutProps) {
  return (
    <button
      className="p-2 text-indigo-100 transition-colors duration-150 bg-gray-600 rounded-lg focus:shadow-outline hover:bg-gray-500"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
