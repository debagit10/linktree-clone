import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const Login = () => {
  const [error, setError] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cookies, setCookie, removeCookies] = useCookies();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Fill all fields");
      return;
    }

    const config = {
      headers: { "Content-type": "application/json" },
    };

    const response = await axios.post(
      "http://localhost:5000/login",
      { email, password },
      config
    );
    //console.log(response.data);
    const info = response.data;

    if (info.detail) {
      setError("User does not exist!");
      window.location.reload();
    } else if (info.error) {
      setError("Incorrect password");
      window.location.reload();
    } else {
      setCookie("Email", info.email);
      setCookie("Token", info.token);
      setCookie("Name", info.name);
      navigate("/links");
    }
  };

  return (
    <div className="container">
      <h3>Login</h3>
      <form>
        <div className="mb-3">
          <input
            type="text"
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
        <button className="btn btn-primary" type="submit" onClick={submit}>
          Login
        </button>
      </form>
      <div>{error && <p>{error}</p>}</div>
    </div>
  );
};

export default Login;
