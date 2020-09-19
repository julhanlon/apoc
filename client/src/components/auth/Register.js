import Axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../Header";
import LoginButtons from "./LoginButtons"
import { useUserContext } from "../context/UserContext";
import ErrorNotice from ".././misc/ErrorNotice";
import { Input, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ParticlesBg from "particles-bg";
import "./Register.css"

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


export default function Register() {
  const classes = useStyles();
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

  let config = {
    num: [4, 6],
    rps: 0.6,
    radius: [5, 40],
    life: [1.5, 20],
    v: [2, 3],
    tha: [-40, 40],
    alpha: [0.6, 0],
    scale: [0.06, 0.1],
    position: "all",
    type: "ball",
    // body: "import some image",
    color: ["#c9c7c1", "‎#94928e"],
    // cross: "dead",
    emitter: "follow",
    random: 5,
  };

  if (Math.random() > 0.85) {
    config = Object.assign(config, {
      onParticleUpdate: (ctx, particle) => {
        ctx.beginPath();
        ctx.rect(
          particle.p.x,
          particle.p.y,
          particle.radius * 2,
          particle.radius * 2
        );
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.closePath();
      },
    });
  }


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
        <Button classes={{
                            root: classes.root, // class name, e.g. `classes-nesting-root-x`
                            label: classes.label, // class name, e.g. `classes-nesting-label-x`
                        }}
          variant="contained"
          type="submit"
          value="Register"
        >
          Register
        </Button>
      </form>
      </div>
  
    </div>
    <ParticlesBg type="custom" config={config} bg={true} />
    </>
  );
}
