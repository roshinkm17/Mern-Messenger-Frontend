import React, { useState } from "react";
import { GrRefresh } from "react-icons/gr";
import axios from "./axios";
import { MdPersonAddAlt1 } from "react-icons/md";

function AddChatButton({ setCurrentChat }) {
  const [emailToFind, setEmailToFind] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  
  const findUser = () => {
    axios
      .get("/users/find", { params: { query: emailToFind } })
      .then((res) => {
        setFoundUsers(res.data);
      })
      .catch((error) => console.log(error));
  };

  const addUser = (email) => {
    axios
      .post("message/new", { to: email })
      .then((res) => {
        setCurrentChat(email);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add Chat
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add a friend
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <input
                  value={emailToFind}
                  onChange={(e) => {
                    setEmailToFind(e.target.value);
                  }}
                  type="email"
                  className="form-control"
                  placeholder="Try searching for Katarina/Ben"
                  aria-label="search field"
                  aria-describedby="button-addon2"
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                  onClick={() => findUser()}
                >
                  <GrRefresh />
                </button>
              </div>
              {foundUsers.length === 0 ? (
                ""
              ) : (
                <div className="mt-3">
                  {foundUsers.map((user) => (
                    <div
                      key={user._id}
                      className="rounded p-2 bg-warning bg-opacity-25 d-flex align-items-center justify-content-between mb-1"
                    >
                      <div>
                        <p className="mb-0 fw-bold">{user.name}</p>
                        <p className="mb-0 small text-black-50">{user.email}</p>
                      </div>
                      <button
                        className="btn"
                        onClick={() => addUser(user.email)}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <MdPersonAddAlt1
                          size="20px"
                          className="me-1"
                          color="black"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddChatButton;
