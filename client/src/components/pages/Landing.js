import React from "react";
import ParticlesBg from "particles-bg";
import { Typography } from "@material-ui/core";
import LoginButtons from "../auth/LoginButtons";
import Virus from "./images/virus.png"
import "./Landing.css"


const Landing = () => {

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

  return (
    <>
    <LoginButtons/>
    <div style = {{display: "flex" , justifyContent: "center", alignItems: "center", marginTop: "150px" }}>
      <Typography variant="h1" component="h1">
        <span className="title fade-in">APOCALYPSE</span>
        <span className="title">. . . ?</span>
        <span><img src={Virus} className = "covidImage" alt = "not working" /></span>
      </Typography>

      <ParticlesBg type="custom" config={config} bg={true} />
      
    </div>
    <div style = {{ height: "500px", display: "flex", justifyContent: "center"}}>
      <h5>© Julia and Sosuke</h5>
      </div>
    </>
  );
};

export default Landing;
