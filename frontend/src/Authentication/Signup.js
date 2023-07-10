import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [error, setError] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [cookies, setCookie, removeCookies] = useCookies();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill all the fields");
      return;
    }
    if (password != confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    //console.log(username);

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const response = await axios.post(
      "http://localhost:5000/signup",
      {
        username,
        email,
        password,
      },
      config
    );
    {
      /*const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });*/
    }
    //console.log(response.data);
    const info = response.data;
    console.log(info);

    if (info.error) {
      setError(info.error);
      window.location.reload();
    } else {
      setCookie("Email", info.email);
      setCookie("Token", info.token);
      navigate("/links");
    }
  };

  return (
    <div className="container">
      <h3>Signup</h3>
      <form>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" type="submit" onClick={submit}>
          Signup
        </button>
      </form>
      <div>{error && <p>{error}</p>}</div>
    </div>
  );
};

export default Signup;
