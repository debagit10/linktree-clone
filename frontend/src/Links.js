import axios from "axios";
import React, { useState } from "react";
import EditLink from "./Modals/EditLink";

const Links = ({ item }) => {
  const [edit, setEdit] = useState(false);
  const deleteData = async () => {
    const config = {
      headers: { "Content-type": "application/json" },
    };
    try {
      const response = await axios.delete(
        `http://localhost:5000/link/delete/${item.id}`,
        config
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li>
      <div className="container-fluid">
        <a href="#" target="_blank">
          <h3>{item.title}</h3>
        </a>
      </div>
      <div className="buttons">
        <button className="delete" onClick={deleteData}>
          DELETE
        </button>
        <button className="edit" onClick={() => setEdit(true)}>
          EDIT
        </button>
      </div>
      {edit && <EditLink setEdit={setEdit} item={item} />}
    </li>
  );
};

export default Links;
