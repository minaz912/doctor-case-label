import { ChangeEvent } from "react";

type LoginFormProps = {
  username: string;
  password: string;
  error: string | null;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleLogin: () => void;
};

export default function LoginForm({
  username,
  password,
  error,
  handleChange,
  handleLogin,
}: LoginFormProps) {
  return (
    <form>
      <div className="">
        <label>Email/Username</label>
        <input
          type="email"
          className=""
          id="username"
          aria-describedby="usernameHelp"
          placeholder="Enter username"
          value={username}
          onChange={handleChange}
        />
      </div>
      <div className="">
        <label>Password</label>
        <input
          type="password"
          className=""
          id="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />
      </div>
      <div>{error ? error : ""}</div>
      <button onClick={handleLogin}>Submit</button>
    </form>
  );
}
