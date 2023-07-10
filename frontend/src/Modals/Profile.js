import React from "react";
import { useCookies } from "react-cookie";

const Profile = (setShowProfile) => {
  const [cookies, setCookies, removeCookies] = useCookies();
  const userEmail = cookies.Email;
  const username = cookies.Name;
  return (
    <div>
      <h4>Uername: {username}</h4>
      <h4>Email: {userEmail}</h4>
      <button onClick={() => setShowProfile}>Close</button>
    </div>
  );
};

export default Profile;
