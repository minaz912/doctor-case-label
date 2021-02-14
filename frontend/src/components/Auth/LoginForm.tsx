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
    <form onSubmit={(ev) => ev.preventDefault()}>
      <div className="flex flex-row space-x-4">
        <div>
          <label className="text-gray-300 px-1">Email/Username</label>
          <input
            type="email"
            id="username"
            className="p-1 px-2 appearance-none outline-none w-60 text-gray-800 rounded h-10"
            aria-describedby="usernameHelp"
            placeholder="Enter username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="text-gray-300 px-1">Password</label>
          <input
            type="password"
            id="password"
            className="p-1 px-2 appearance-none outline-none w-60 text-gray-800 rounded h-10"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div>{error ? error : ""}</div>
        <button
          className="p-2 text-indigo-100 transition-colors duration-150 bg-gray-600 rounded-lg focus:shadow-outline hover:bg-gray-500"
          onClick={handleLogin}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
