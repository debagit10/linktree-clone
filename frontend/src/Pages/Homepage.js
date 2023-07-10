import React, { useState } from "react";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";

const Homepage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const viewLogin = (status) => {
    //setError(null);
    setIsLogin(status);
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        {isLogin ? <Login /> : <Signup />}
        <div className="auth-options">
          <button
            className="m-5"
            onClick={() => viewLogin(false)}
            style={{
              backgroundColor: !isLogin
                ? "rgb(255, 255, 255"
                : "rgb(188, 188, 188",
            }}
          >
            Sign up
          </button>
          <button
            className="m-5"
            onClick={() => viewLogin(true)}
            style={{
              backgroundColor: isLogin
                ? "rgb(255, 255, 255"
                : "rgb(188, 188, 188",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
