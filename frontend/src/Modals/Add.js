import React, { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./Add.css";

const Add = (setShowAdd) => {
  //e.preventDefault();
  const [url, setUrl] = useState();
  const [title, setTitle] = useState();
  const [error, setError] = useState();
  const [cookies, setCookie, removeCookies] = useCookies();
  const user_email = cookies.Email;
  //console.log(user_email);

  const submit = async (e) => {
    // e.preventDefault();
    if (!url || !title) {
      setError("Please fill all fields");
      return;
    }
    const config = {
      headers: { "Content-type": "application/json" },
    };
    const response = await axios.post(
      "http://localhost:5000/add",
      { url, title, user_email },
      config
    );
    if (response.data.success == "Added") {
      setError("Link added successfully");
      window.location.reload();
    }
    //window.location.reload();
  };
  return (
    <div className="container-fluid add-modal">
      <h3>Add link</h3>

      <input
        type="url"
        className="form-control"
        placeholder="Enter link"
        onChange={(e) => setUrl(e.target.value)}
      />

      <input
        type="text"
        className="form-control"
        placeholder="Enter link name"
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={submit}>Submit</button>
      <button onClick={() => setShowAdd}>Close</button>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Add;
