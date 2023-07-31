import axios from "axios";
import React, { useState } from "react";

const EditLink = ({ item, setEdit }) => {
  const [url, setUrl] = useState();
  const [title, setTitle] = useState();
  //const navigate = useNavigate();

  const editData = async (e) => {
    //e.preventDefault();
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
            Url:
          </label>
          <input
            type="text"
            class="form-control"
            id="recipient-name"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button onClick={editData} className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditLink;
