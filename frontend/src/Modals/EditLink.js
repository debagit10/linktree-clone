import axios from "axios";
import React, { useState } from "react";

const EditLink = ({ item, setEdit }) => {
  const [url, setUrl] = useState();
  const [title, setTitle] = useState();

  const editData = async (e) => {
    e.preventDefault();
    console.log(item.id, url, title, item.user_email);
    const user_email = item.user_email;
    const config = {
      headers: { "Content-type": "application/json" },
    };
    try {
      const response = await axios.put(
        `http://localhost:5000/link/edit/${item.id}`,
        { url, title, user_email },
        config
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const changeValue = () => {};

  return (
    <div>
      <form>
        <input
          required
          //placeholder={item.url}
          value={item.url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          required
          maxLength={30}
          //placeholder={item.title}
          value={item.title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input type="submit" onClick={editData} />
      </form>
      <button onClick={() => setEdit}>Close</button>
    </div>
  );
};

export default EditLink;
