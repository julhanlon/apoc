import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';

import { useUserContext } from "../context/UserContext";


const buttonStyle = {
  marginLeft: '10px',
};


const ProfileButtons = () => {
  const { userData, setUserData } = useUserContext();

  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const profile = () => history.push("/profile");
  const main = () => history.push("/search");

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <nav className="auth-options" style = {{marginTop: "10px"}}>
      {userData.user ? (
        <>     <Button style={{ float: 'right', marginRight: "20px" }} variant="contained" size="small" color="primary" onClick={logout}>
          Log Out
    </Button>

          <Button style={{ float: 'right', marginRight: "20px" }} variant="contained" size="small" color="primary" onClick={main}>
            Dashboard
     </Button>

        </>
      ) : (
          <>
            <Button variant="contained" color="secondary" size = "small" style={buttonStyle} onClick={register}>
              Register
    </Button>

            <Button variant="contained" color="secondary" size = "small" style={buttonStyle} onClick={login}>
              Log in
    </Button>
          </>
        )}
    </nav>
  );
};

export default ProfileButtons;
