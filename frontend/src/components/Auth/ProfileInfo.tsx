import React, { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function ProfileInfo() {
  const [name, setName] = useState("");
  const [jwt] = useLocalStorage("jwt", null);

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
    <div>
      <span className="">{`Welcome back, Dr. ${name}`}</span>
    </div>
  );
}
