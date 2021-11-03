import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./auth";
import axios from "./axios";


function Home() {
  const [user] = useAuthState(auth);
  const [friends, setfriends] = useState([]);
  const [currentChat, setCurrentChat] = useState("");

  const getMessages = async () => {
    axios
      .get("/messages", { params: { userEmail: user.email, reverse: true } })
      .then((res) => {
        filterUniqueChats(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    //get all the messages of the logged in user
    getMessages();
  }, [currentChat]);

  const filterUniqueChats = (messages) => {
    let list = [];
    let uniqueFriends = {};
    messages.forEach(async (message) => {
      let temp = {};
      let tempUser = message.from === user.email ? message.to : message.from;
      if (tempUser in uniqueFriends) {
      } else {
        temp["id"] = message._id;
        temp["lastMessage"] = message.message;
        temp["email"] = tempUser;
        temp["name"] = "Name";
        uniqueFriends[tempUser] = true;
        list.push(temp);
      }
    });
    setfriends(list);
  };

  return (
    <div className="d-flex jutsify-content-center align-items-center w-100 vh-100 p-2">
      <div className="body shadow-lg h-100 w-100 rounded d-flex">
        <Sidebar friends={friends} setCurrentChat={setCurrentChat} />
        {friends.length !== 0 ? (
          <Chat
            userEmail={currentChat === "" ? friends[0].email : currentChat}
            setCurrentChat={setCurrentChat}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Home;
