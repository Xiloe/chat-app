import React, { useState } from "react";
import { pb } from "./PocketBaseInit";

const login = async (username, password) => {
  try {
    await pb.collection("users").authWithPassword(username, password);
  } catch (error) {
    console.error(error);
  }
};

const signup = async (username, password) => {
  try {
    const data = {
      username,
      password,
      passwordConfirm: password,
    };

    await pb.collection("users").create(data);
    await login();
  } catch (error) {
    console.error(error);
  }
};

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
      }}
      className="flex flex-col justify-center items-center [&>*]:w-full [&>*]:m-2"
    >
      <input
        type="text"
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex [&>*]:grow">
        <button onClick={() => login(username, password)} className="mr-2">
          Login
        </button>
        <button onClick={() => signup(username, password)}>Register</button>
      </div>
    </form>
  );
};
