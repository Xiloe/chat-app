import React from "react";
import { useSelector } from "react-redux";
import { pb } from "./PocketBaseInit";

const signout = async () => {
  await pb.authStore.clear();
};

export const Dashboard = () => {
  const { token, userModel } = useSelector((state) => state.user);

  return (
    <>
      <p>
        Logged in as <span className="font-bold">{userModel.username}</span> (
        <span className="font-bold">{userModel.id}</span>)
      </p>
      <p>TOKEN: {token}</p>
      <button onClick={() => signout()}>Sign out</button>
    </>
  );
};
