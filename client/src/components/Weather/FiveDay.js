import React, { useState } from "react";
import { Card } from "@material-ui/core";
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
import "./FiveDay.css";

const tempConversion = (temp) => ((temp - 273.0) * 1.8 + 32).toFixed(1);

const convertDateFormat = (date) => {
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  return `${month.length === 1 ? "0" + month : month}/${
    day.length === 1 ? "0" + day : day
  }`;
};

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

const FiveDay = (props) => {
  const [show, setShow] = useState(true);

  const showCard = () => {
    setShow(!show);
  };

  return (
    <>
      <div style={{ height: "540px", width: "450px" }}>
        <FormControlLabel
          control={<Checkbox onClick={showCard} defaultChecked
            color="default"
            inputProps={{ 'aria-label': 'checkbox with default color' }} size="small" checked={show} />}
        /> 5 Day Forescast
        {show && (
          <Card
            id="card"
            style={{ width: "520px", height: "530px" }}
            variant="outlined"
          >
            <CardContent>
              <Typography variant="h4" component="h4">
                <p>5 Day Forecast</p>
              </Typography>
              <div id="fiveDay">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px", width: "90%" }}>
                  <div >
                    <Typography
                      variant="h5"
                      component="h4"
                      size="1.4rem"
                      color="textSecondary"
                    >
                      {convertDateFormat(new Date(props.weatherObj.day2))}:{" "}
                      {tempConversion(props.weatherObj.weather2)}°F{" "}
                    </Typography>
                  </div>
                  {weatherIcon(props.weatherObj.main2)}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px", width: "90%" }}>
                  <div >
                    <Typography
                      variant="h5"
                      component="h4"
                      size="1.4rem"
                      color="textSecondary"
                    >
                      {convertDateFormat(new Date(props.weatherObj.day3))}:{" "}
                      {tempConversion(props.weatherObj.weather3)}°F{" "}
                    </Typography>
                  </div>
                  {weatherIcon(props.weatherObj.main3)}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px", width: "90%" }}>
                  <div >
                    <Typography
                      variant="h5"
                      component="h4"
                      size="1.4rem"
                      color="textSecondary"
                    >
                      {convertDateFormat(new Date(props.weatherObj.day4))}:{" "}
                      {tempConversion(props.weatherObj.weather4)}°F{" "}
                    </Typography>
                  </div>
                  {weatherIcon(props.weatherObj.main4)}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px", width: "90%" }}>
                  <div >
                    <Typography
                      variant="h5"
                      component="h4"
                      size="1.4rem"
                      color="textSecondary"
                    >
                      {convertDateFormat(new Date(props.weatherObj.day5))}:{" "}
                      {tempConversion(props.weatherObj.weather5)}°F{" "}
                    </Typography>
                  </div>
                  {weatherIcon(props.weatherObj.main5)}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px", width: "90%" }}>
                  <div >
                    <Typography
                      variant="h5"
                      component="h4"
                      size="1.4rem"
                      color="textSecondary"
                    >
                      {convertDateFormat(new Date(props.weatherObj.day6))}:{" "}
                      {tempConversion(props.weatherObj.weather6)}°F{" "}
                    </Typography>
                  </div>
                  {weatherIcon(props.weatherObj.main6)}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default FiveDay;
