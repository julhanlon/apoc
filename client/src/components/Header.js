import React from "react";
import { Typography } from '@material-ui/core';
import "./Header.css";
// import Animation from "./Animation"

import icon from "../images/virus.png";
import warning from "../images/warning.png";


const Header = () => {
  return (
    <div style={{ text: "center", marginBottom: "50px"}} >
      <header >
        <div id="header">
        <Typography variant="h1" component="h1">
          <span className="title">
            APOCALYPSE
        </span>
          <span className="title blink">
            . . . ?
        </span>
        </Typography>
          {/* <img id = "img" src={icon} /> */}
        </div>
      </header>
    </div>
  );
};
export default Header;
