import React, { useState } from "react";
import { Card, Paper } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Sun from "./images/sun.png";
import Cloud from "./images/cloud.png";
import Rain from "./images/rain.png";
import Snow from "./images/snow.png";
import Haze from "./images/haze.png";
import Smog from "./images/smog.png";
import "./Weather.css";

const tempConversion = (temp) => ((temp - 273.0) * 1.8 + 32).toFixed(1);

const weatherIcon = (icon) => {
  if (icon === "Clear" || icon === "Sunny") {
    return <img src={Sun} alt="not working" />;
  } else if (icon === "Clouds") {
    return <img src={Cloud} alt="not working" />;
  } else if (icon === "Rain") {
    return <img src={Rain} alt="not working" />;
  } else if (icon === "Snow") {
    return <img src={Snow} alt="not working" />;
  } else if (icon === "Fog" || icon === "Foggy" || icon === "Smog") {
    return <img src={Smog} alt="not working" />;
  } else if (icon === "Haze" || icon === "Smoke") {
    return <img src={Haze} alt="not working" />;
  } else {
    return <img src={Sun} alt="not working" />;
  }
};

const Weather = (props) => {
  const [show, setShow] = useState(true);

  const showCard = () => {
    setShow(!show);
  };

  return (
    <>
      <div style={{ height: "540px", width: "330px" }}>
        <FormControlLabel
          control={<Checkbox id="checkbox" onClick={showCard}  defaultChecked
          color="default"
          inputProps={{ 'aria-label': 'checkbox with default color' }} size = "small" checked={show} />}
        />
        {show && (
          <Card
            id="card"
            style={{ width: "320px", height: "530px" }}
            variant="outlined"
          >
            {/* <FormControlLabel control={<Checkbox onClick={showCard} checked = {show}  />}  /> */}
            <CardContent id = "cardContent">
              <Typography variant="h4" component="h4">
                <p>Current Weather</p>
              </Typography>
              <Typography variant="h5" component="h5" size = "1.4rem" color="textSecondary">
              <p> Temp: {tempConversion(props.weatherObj.temp)}°F</p>
              </Typography>
              <Typography variant="h5" component="h4" size = "1.4rem" color="textSecondary">
              <p> UVI: {props.weatherObj.uvi}</p>
              </Typography>
              <Typography variant="h5" component="h4" size = "1.4rem" color="textSecondary">
              <p> Humidity: {props.weatherObj.humidity}%</p>
              </Typography>
              <Typography variant="h5" component="h5" size = "1.4rem" color="textSecondary">
              <p> Wind Speed: {props.weatherObj.wind_speed} mph</p>
              </Typography>
              <div id = "icon">{weatherIcon(props.weatherObj.todayIcon)}</div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default Weather;
