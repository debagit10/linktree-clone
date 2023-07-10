import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Add from "../Modals/Add";
import axios from "axios";
import Links from "../Links";
import Profile from "../Modals/Profile";
//import Add from "../Modals/Add";

const Linkpage = () => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const navigate = useNavigate();
  const authToken = cookies.Token;
  const userEmail = cookies.Email;
  const username = cookies.Name;
  const [link, setLink] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const signout = () => {
    removeCookies("Email");
    removeCookies("Token");
    removeCookies("Name");
    //window.location.reload();
    navigate("/");
  };

  const getData = async () => {
    const config = {
      headers: { "Content-type": "application/json" },
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/links",
        { userEmail },
        config
      );
      const userLinks = response.data;
      //console.log(userLinks);
      setLink(userLinks);
      //console.log(link);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  });

  return (
    <div>
      <h2>Welcome @{username}</h2>
      <nav className="bg-dark text-white">
        <div className="d-flex mb-3 align-items-center">
          <div className="me-auto p-2">
            <button onClick={() => setShowProfile(true)}>Show Profile</button>
            {showProfile && <Profile setShowProfile={setShowProfile} />}
          </div>
          <div className="p-2 ">
            <button onClick={() => setShowAdd(true)}>Add link</button>
          </div>
          <button className="signout" onClick={signout}>
            Signout
          </button>
        </div>
      </nav>

      {link.map((item) => (
        <Links key={item.id} item={item} />
      ))}
      {showAdd && <Add setShowAdd={setShowAdd} />}
    </div>
  );
};

export default Linkpage;
