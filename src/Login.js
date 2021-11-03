import React, { useState } from "react";
import { BsMessenger } from "react-icons/bs";
import { Link } from "react-router-dom";
import { signIn } from "./auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const LoginUser = async () => {
    await signIn(email, password);
  };

  return (
    <div className="login rounded p-4 shadow-sm">
      <span className="fs-4 fw-bold text-primary">
        MERN <BsMessenger />
      </span>
      <form className="login__form mt-4">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
            className="form-control p-3"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            value={password}
            type="password"
            className="form-control p-3"
            id="exampleInputPassword1"
            required
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            LoginUser();
          }}
          type="submit"
          className="btn btn-success w-100 mt-4 p-3 fw-bold"
        >
          Login
        </button>
      </form>
      <Link to="/signup" className="mt-4">
        New? SignUp
      </Link>
    </div>
  );
}

export default Login;
