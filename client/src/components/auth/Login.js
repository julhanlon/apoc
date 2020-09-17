import Axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Input, Button } from "@material-ui/core";
import Header from "../Header";
import { useUserContext } from "../context/UserContext";
import ErrorNotice from ".././misc/ErrorNotice";
import RegisterButton from "./ResigterButton";
import { makeStyles } from '@material-ui/core/styles';
import ParticlesBg from "particles-bg";
import "./Login.css"

const divStyle = {
  marginTop: "170px",
  display: "flex",
  justifyContent: "center",
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

let config = {
  num: [4, 6],
  rps: 0.6,
  radius: [5, 30],
  life: [1.5, 30],
  v: [2, 3],
  tha: [-40, 40],
  alpha: [0.6, 0],
  scale: [0.06, 0.14],
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


export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { userData, setUserData } = useUserContext();

  // const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post("/users/login", loginUser);
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
    <RegisterButton/>
      <Header/>
      <div className="page" style={divStyle}>
        <div id = "login">
          <div>
            <form className="form" onSubmit={submit}>

              <label htmlFor="login-email">Email:  </label>
              <Input
                id="login-email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="login-password">Password: </label>
              <Input
                id="login-password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button classes={{
                            root: classes.root, // class name, e.g. `classes-nesting-root-x`
                            label: classes.label, // class name, e.g. `classes-nesting-label-x`
                        }}  variant="contained" size="small" type="submit" value="Log in">
                Login
     </Button>
            </form>
          </div>
          <div>
            <p>forget your password?</p>
          </div>
        </div>

        {error && (
          <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
      </div>
      <ParticlesBg type="custom" config={config} bg={true} />
    </>
  );
}
