import React from "react";
import Avatar from "react-nice-avatar";

function UserTile({ name, lastMessage, setCurrentChat }) {
  const setChat = () => {
    setCurrentChat(name);
  };
  return (
    <div
      className="usertile d-flex align-items-center p-2 ps-4"
      onClick={() => {
        setChat();
      }}
    >
      <div className="bg-primary text-white fw-bold rounded-circle d-flex justify-content-center align-items-center" style={{height:"30px", width:"30px"}}>
        {name[0].toUpperCase()}
      </div>
      <div className="ms-3">
        <p className="mb-0 fw-bold">{name}</p>
        <p className="mb-0 small text-secondary">{lastMessage}</p>
      </div>
    </div>
  );
}

export default UserTile;
