import React, { ChangeEvent, useCallback, useState } from "react";
import { API_URL } from "../../constants";
import useLocalStorage from "../../hooks/useLocalStorage";
import LoginForm from "./LoginForm";

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [jwt, setJwt] = useLocalStorage("jwt", null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCredentials((prevCreds) => ({
      ...prevCreds,
      [id]: value,
    }));
  };

  const onLogin = useCallback((token) => {
    setJwt(token);
    setError(null);
  }, []);

  const handleLogin = async () => {
    try {
      const { username, password } = credentials;
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const { access_token: accessToken } = await res.json();
      onLogin(accessToken);
    } catch (err) {
      setError(err);
    }
  };

  return jwt ? (
    <div>Logged in</div>
  ) : (
    <LoginForm
      username={credentials.username}
      password={credentials.password}
      error={error}
      handleChange={handleChange}
      handleLogin={handleLogin}
    />
  );
}
