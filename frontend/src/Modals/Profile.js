import React from "react";
import { useCookies } from "react-cookie";

const Profile = () => {
  const [cookies, setCookies, removeCookies] = useCookies();
  const userEmail = cookies.Email;
  const username = cookies.Name;
  return (
    <div>
      <h4>Username: {username}</h4>
      <h4>Email: {userEmail}</h4>
    </div>
  );
};

export default Profile;
