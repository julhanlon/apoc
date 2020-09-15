import Axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../Header";
import LoginButtons from "./LoginButtons"
import { useUserContext } from "../context/UserContext";
import ErrorNotice from ".././misc/ErrorNotice";
import { Input, Button } from "@material-ui/core";
import "./Register.css"


export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();
  const { userData, setUserData } = useUserContext();

  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    //instead of reloading the page we need to send axios request
    try {
      const newUser = { email, password, passwordCheck, displayName };
      await Axios.post("/users/register", newUser);
      const loginRes = await Axios.post("/users/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/search");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <>
    <LoginButtons/>
    <Header/>
    <div >
      {/* <h2>Register</h2> */}
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <div id = "form">
      <form className="form" onSubmit={submit} >
        <label htmlFor="register-email">Email</label>
        <Input
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="register-password">Password</label>
        <Input
          id="register-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Verify password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
        <label htmlFor="register-display-name">Display Name</label>
        <Input
          id="register-display-name"
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          value="Register"
        >
          Register
        </Button>
      </form>
      </div>
  
    </div>
    </>
  );
}
