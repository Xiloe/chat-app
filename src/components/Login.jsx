import React, { useRef } from "react";
import { pb } from "./PocketBaseInit";

export const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const login = async () => {
    try {
      await pb
        .collection("users")
        .authWithPassword(usernameRef.current.value, passwordRef.current.value);
    } catch (error) {
      console.error(error);
    }
  };

  const signup = async () => {
    try {
      const data = {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        passwordConfirm: passwordRef.current.value,
      };

      await pb.collection("users").create(data);
      await login();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
      }}
      className="flex flex-col justify-center items-center [&>*]:w-full [&>*]:m-2"
    >
      <input type="text" ref={usernameRef} placeholder="Username" />

      <input type="password" ref={passwordRef} placeholder="Password" />

      <div className="flex [&>*]:grow">
        <button onClick={() => login()} className="mr-2">
          Login
        </button>
        <button onClick={() => signup()}>Register</button>
      </div>
    </form>
  );
};
