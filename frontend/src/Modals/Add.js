import React, { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const Add = () => {
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
    <div>
      <form>
        <div class="mb-3">
          <label for="recipient-name" class="col-form-label">
            Title:
          </label>
          <input
            type="text"
            class="form-control"
            id="recipient-name"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="recipient-name" class="col-form-label">
            URL:
          </label>
          <input
            type="text"
            class="form-control"
            id="recipient-name"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={submit}>
          Save
        </button>
      </form>
    </div>
  );
};

export default Add;
