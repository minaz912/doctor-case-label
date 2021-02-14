import React, { useContext, useEffect, useState } from "react";
import { API_URL } from "../../constants";
import ApplicationContext from "../ApplicationProvider";

export default function ProfileInfo() {
  const [name, setName] = useState("");
  const { jwt } = useContext(ApplicationContext);

  useEffect(() => {
    async function getProfileInfo() {
      try {
        const res = await fetch(`${API_URL}/users/profile`, {
          method: "get",
          headers: { Authorization: `Bearer ${jwt}` },
        });

        const { firstName, lastName } = await res.json();
        setName(`${firstName} ${lastName}`);
      } catch (err) {
        console.error(err);
      }
    }

    getProfileInfo();
  }, [jwt]);

  return (
    <div className="text-white text-white px-3 py-2 font-medium">
      {`Welcome back, Dr. ${name}`}
    </div>
  );
}
