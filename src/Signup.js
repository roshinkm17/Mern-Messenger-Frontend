import React, { useState } from "react";
import { BsMessenger } from "react-icons/bs";
import { Link } from "react-router-dom";
import { signUp } from "./auth";
import Avatar, {  } from "react-nice-avatar";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [error, setError] = useState("");

  const SignupUser = async () => {
    const res = await signUp(email, password, name);
    setError(res);
  };
  return (
    <div className="login rounded p-4 shadow-sm">
      <div className="d-flex justify-content-between w-75 px-2 align-items-center">
        <span className="fs-4 fw-bold text-primary">MERN <BsMessenger/></span>
        <Avatar style={{ width: "3rem", height: "3rem" }} />
      </div>
      {error ? (
        <div
          className="alert alert-danger alert-dismissible fade show my-5"
          role="alert"
        >
          <strong>Woops!</strong> You should check in on some of those fields
          below.
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setError("")}
          ></button>
        </div>
      ) : (
        ""
      )}
      <form className="login__form mt-4">
        <div className="mb-3">
          <label htmlFor="exampleInputText" className="form-label">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setname(e.target.value)}
            type="text"
            id="exampleInputText"
            className="form-control p-3"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control p-3"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            className="form-control p-3"
            id="exampleInputPassword1"
            required
          />
        </div>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            SignupUser();
          }}
          className="btn btn-success w-100 mt-4 p-3 fw-bold"
        >
          Sign Up
        </button>
      </form>
      <Link to="/" className="mt-4">
        Already have an account? Log in
      </Link>
    </div>
  );
}

export default Signup;
