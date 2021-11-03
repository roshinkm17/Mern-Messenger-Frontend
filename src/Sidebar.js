import React, {  } from "react";
import UserTile from "./UserTile";
import { logOut } from "./auth";
import AddChatButton from "./AddChatButton";
import Avatar from "react-nice-avatar";


function Sidebar({friends, setCurrentChat}) {
  const LogoutUser = async () => {
    await logOut();
  };
  return (
    <div className="sidebar">
      <div className="sidebar__header d-flex align-items-center justify-content-between px-3 py-2">
        <div className="sidebar__headerAvatar rounded-circle shadow">
          <Avatar style={{ width: "2.5rem", height: "2.5rem" }}/>
        </div>
        <div className="d-flex">
          <AddChatButton setCurrentChat={setCurrentChat} />
          <button
            className="btn btn-sm btn-outline-danger ms-3"
            onClick={() => LogoutUser()}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="sidebar__search p-2">
        <input
          type="text"
          className="form-control rounded-pill"
          id="searchField
        "
          placeholder="Search for people"
        ></input>
      </div>
      <div className="sidebar__body">
        {friends.map((friend) => (
          <div key={friend.id}>
            <UserTile
              name={friend.email}
              lastMessage={friend.lastMessage}
              setCurrentChat={setCurrentChat}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
