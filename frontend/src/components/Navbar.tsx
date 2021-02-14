import React, { useContext } from "react";
import Login from "./Auth/Login";
import Logout from "./Auth/Logout";
import ProfileInfo from "./Auth/ProfileInfo";
import ApplicationContext from "./ApplicationProvider";

export default function Navbar() {
  const { isAuthenticated, onLogout } = useContext(ApplicationContext);

  const handleLogout = () => {
    onLogout();
  };

  return (
    <nav className="bg-gray-800 mb-2 fixed w-full">
      <div className="px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex justify-end items-stretch">
            <div className="block sm:ml-6">
              <div className="flex">
                <div className="flex space-x-4 justify-right">
                  {isAuthenticated ? (
                    <>
                      <ProfileInfo />
                      <Logout handleLogout={handleLogout} />
                    </>
                  ) : (
                    <Login />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
