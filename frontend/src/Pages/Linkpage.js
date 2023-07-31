import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
//import { useNavigate } from "react-router-dom";
import Add from "../Modals/Add";
import axios from "axios";
import Links from "../Links";
import "./Linkpage.css";
import Navbar from "../Modals/Navbar";
//import Add from "../Modals/Add";

const Linkpage = () => {
  const [cookies, setCookie, removeCookies] = useCookies();
  const authToken = cookies.Token;
  const userEmail = cookies.Email;
  const username = cookies.Name;
  const [link, setLink] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

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
    <div className="container-fluid">
      <div>
        <Navbar />
      </div>

      <div>
        <h5 className="text-white">Your links, {username}:</h5>
        {link.map((item) => (
          <Links key={item.id} item={item} />
        ))}
        {showAdd && <Add setShowAdd={setShowAdd} />}
      </div>
    </div>
  );
};

export default Linkpage;
