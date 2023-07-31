import axios from "axios";
import React, { useState } from "react";
import EditLink from "./Modals/EditLink";
import "./Links.css";

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
    <>
      <div
        class="modal fade"
        id="editModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Edit Link
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <EditLink item={item} />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-5">
        <div className="link">
          <a href={item.url} target="_blank">
            <h3>{item.title}</h3>
          </a>
          <button onClick={deleteData}>Delete</button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#editModal"
            data-bs-whatever="@mdo"
          >
            Edit
          </button>
          <i class="bi bi-clipboard copy" link={item.url}></i>
        </div>
      </div>
    </>
  );
};

export default Links;
