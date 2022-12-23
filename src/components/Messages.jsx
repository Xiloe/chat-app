import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { pb } from "./PocketBaseInit";

export const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { userModel } = useSelector((state) => state.user);
  const messageRef = useRef();

  let ranOnce = false;

  useEffect(() => {
    console.log("Messages ranOnce: ", ranOnce);
    let unsubscribe;

    const init = async () => {
      const resultList = await pb.collection("messages").getList(1, 50, {
        sort: "created",
        expand: "user", // Used to get the User model in each message
      });

      setMessages(resultList.items);

      // Subscribe to any change in messages to get real-time updates
      unsubscribe = await pb
        .collection("messages")
        .subscribe("*", async ({ action, record }) => {
          if (action === "create") {
            const user = await pb.collection("users").getOne(record.user);
            record.expand = { user };
            setMessages((prevMessages) => [...prevMessages, record]);
          }

          if (action === "delete") {
            setMessages((messages) =>
              messages.filter((message) => message.id !== record.id)
            );
          }
        });
    };

    if (!ranOnce) {
      init();
      ranOnce = true;
    }

    // Cleanup: unsubscribe when we unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const sendMessage = async () => {
    try {
      const data = {
        text: messageRef.current.value,
        user: pb.authStore.model.id,
      };

      await pb.collection("messages").create(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMessage = async (id) => {
    try {
      await pb.collection("messages").delete(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {messages.map((message) => (
        <div
          key={message.id}
          className="w-64 my-2 p-5 rounded-lg shadow-lg bg-slate-900"
        >
          <p className="mb-2">{message.text}</p>
          <p className="text-xs text-slate-500">
            Sent by {message.expand.user.username} ({message.expand.user.id})
          </p>
          {userModel.id === message.expand.user.id && (
            <button
              onClick={() => deleteMessage(message.id)}
              className="bg-red-500 hover:bg-red-700 mt-5 w-full"
            >
              Delete
            </button>
          )}
        </div>
      ))}
      <form
        className="flex flex-col mt-5"
        onSubmit={async (e) => {
          e.preventDefault();

          sendMessage();
          messageRef.current.value = "";
        }}
      >
        <input ref={messageRef} type="text" placeholder="Message..." />
        <button type="submit" className="my-2">
          Send
        </button>
      </form>
    </>
  );
};
