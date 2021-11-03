import React from "react";
import { auth } from "./auth";
import { useAuthState } from "react-firebase-hooks/auth";

function Message({ message }) {
  const [user] = useAuthState(auth);

  return (
    message.message ? 
    <div
      className={`${
        user.email === message.from ? "sent" : ""
      } chat__bodyMessage small bg-dark text-light mb-1 rounded`}
    >
      <p className="mb-0">
        {message.message}
        <span className="text-secondary d-block">{message.time}</span>
      </p>
    </div> : ""
  );
}

export default Message;
