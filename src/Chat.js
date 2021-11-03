import React, { useEffect, useState } from "react";
import ChatBody from "./ChatBody";
import axios from "./axios";
import { RiSendPlaneFill } from "react-icons/ri";
import Pusher from "pusher-js";

function Chat({ userEmail, setCurrentChat }) {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const sendMessage = () => {
    axios
      .post("/message/new", { message: message, to: userEmail })
      .then()
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    userEmail !== undefined ? axios
      .get("/messages", {params: {userEmail: userEmail}})
      .then((response) => {
        setChatMessages(response.data);
      })
      .catch((err) => {
        console.log(err);
      }) : console.log("");;
  }, [userEmail]);

  useEffect(() => {
    const pusher = new Pusher("ebd64cb1e9692b5b79e8", {
      cluster: "ap2",
    });
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (data) => {
      setChatMessages([...chatMessages, data]);
      setCurrentChat(userEmail);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [chatMessages]);
  
  return (
    <div className="chat d-flex flex-column">
      <div className="chat__header p-3 bg-dark rounded text-light">
        <p className="mb-0 fw-bold">{userEmail}</p>
        <span className="mb-0 small text-white-50">Last seen sometime ago</span>
      </div>
      <ChatBody messages={chatMessages} />
      <div className="chat__footer px-3 py-2 d-flex">
        <input
          type="text"
          className="form-control rounded-pill"
          id="searchField
        "
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        ></input>
        <button
          className={`btn btn-primary ms-3 rounded-circle fs-4 ${
            message !== "" ? "" : "disabled"
          }`}
          onClick={() => {
            if (message !== "") {
              sendMessage();
            }
            setMessage("");
          }}
        >
          <RiSendPlaneFill />
        </button>
      </div>
    </div>
  );
}

export default Chat;
