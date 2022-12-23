import React from "react";
import { useSelector } from "react-redux";
import { Messages } from "./Messages";
import { pb } from "./PocketBaseInit";

const signout = async () => {
  await pb.authStore.clear();
};

export const Dashboard = () => {
  const { userModel } = useSelector((state) => state.user);

  return (
    <>
      <div className="flex flex-col mb-5">
        <p>
          Logged in as <span className="font-bold">{userModel.username}</span> (
          <span className="font-bold">{userModel.id}</span>)
        </p>
        <button onClick={() => signout()}>Sign out</button>
      </div>
      <Messages />
    </>
  );
};
