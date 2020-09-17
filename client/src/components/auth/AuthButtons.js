import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useUserContext } from "../context/UserContext";


const buttonStyle = {
  marginLeft: '10px',
};

const useStyles = makeStyles({
  root: {
    background: "#cd3239",
    borderRadius: 15,
    border: 0,
    color: 'white',
    height: 33,
    padding: '0 15px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
});


const AuthButtons = () => {
  const classes = useStyles();
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
    <nav className="auth-options" style={{ marginTop: "10px" }}>
      {userData.user ? (
        <>     <Button classes={{
          root: classes.root, // class name, e.g. `classes-nesting-root-x`
          label: classes.label, // class name, e.g. `classes-nesting-label-x`
        }} style={{ float: 'right', marginRight: "20px" }} variant="contained" size="small" color="primary" onClick={logout}>
          Log Out
    </Button>
          <Button classes={{
            root: classes.root, // class name, e.g. `classes-nesting-root-x`
            label: classes.label, // class name, e.g. `classes-nesting-label-x`
          }} style={{ float: 'right', marginRight: "20px" }} variant="contained" size="small" color="primary" onClick={profile}>
            Profile
     </Button>
        </>
      ) : (
          <>
            <Button variant="contained" color="secondary" size="small" style={buttonStyle} onClick={register}>
              Register
    </Button>

            <Button classes={{
              root: classes.root, // class name, e.g. `classes-nesting-root-x`
              label: classes.label, // class name, e.g. `classes-nesting-label-x`
            }} variant="contained" color="secondary" size="small" style={buttonStyle} onClick={login}>
              Log in
    </Button>
          </>
        )}
    </nav>
  );
};

export default AuthButtons;

