import React, { useState } from "react";
import { Map, Marker, Popup, TileLayer, CircleMarker } from "react-leaflet";
import { Button, Slider, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ModalEq from "./ModalEq"
import "./MyMap.css";

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

const marks = [
  {
    value: 0,
    label: "2.5",
  },
  {
    value: 33,
    label: "5.0",
  },
  {
    value: 66,
    label: "7.5",
  },
  {
    value: 100,
    label: "10",
  },
];

const marks2 = [
  {
    value: 0,
    label: "200",
  },
  {
    value: 25,
    label: "400",
  },
  {
    value: 50,
    label: "600",
  },
  {
    value: 75,
    label: "800",
  },
  {
    value: 100,
    label: "1000",
  },
];

const MyMap = (props) => {
  const classes = useStyles();
  const [sliderValue, setSliderValue] = useState(0);
  const [sliderValue2, setSliderValue2] = useState(100);
  const [show, setShow] = useState(true)
  const [magValue, setMag] = useState(2.5);
  const [radiusValue, setRadius] = useState(1000);
  const [mapData, setMapData] = useState({
    lat: props.mapObj.lat,
    lng: props.mapObj.lng,
    zoom: 5,
  });

  const handleChangeMag = (event, newValue) => {
    // let newValue = event.target.getAttribute("aria-valuenow");
    const newMagValue = (7.5 * newValue + 250) / 100;
    setMag(newMagValue);
    setSliderValue(newValue);
  };

  const handleChangeRadius = (event, newValue) => {
    // let newValue = event.target.getAttribute("aria-valuenow");
    const newRadiusValue = 200.0 + 8 * newValue;
    //(1/8 * newValue) - 25;;
    setRadius(newRadiusValue);
    setSliderValue2(newValue);
  };

  const showCard = () => {
    setShow(!show)
  }


  const eqColor = (value) => {
    if (value >= 2.5 && value < 3.0) {
      return "yellow";
    } else if (value >= 3.0 && value < 4.5) {
      return "orange";
    } else {
      return "red";
    }
  };

  const markers = [];
  props.eqData.map((element, index) => {
    if (element.mag >= magValue && element.distance <= radiusValue) {
      markers.push(
        <CircleMarker
          key={index}
          center={[element.lat, element.lng]}
          color={eqColor(element.mag)}
          radius={element.mag * 8}
        >
          <Popup>{element.title}</Popup>
        </CircleMarker>
      );
    }
  });

  const position = [props.mapObj.lat, props.mapObj.lng];

  return (
    <>
      <div style={{ height: "670px", width: "100%" }}>
        <FormControlLabel style={{ marginLeft: "30px" }} control={<Checkbox id="checkbox" onClick={showCard} defaultChecked
          color="default"
          inputProps={{ 'aria-label': 'checkbox with default color' }} size="small" checked={show} />} />
        {show && <Card id="mapCard">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h4" component="h4">
              <p style={{ textAlign: "center" }}>Earthquakes</p>
            </Typography>
            <ModalEq />
          </div>

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div className={classes.root}>
              <Typography id="discrete-slider-small-steps" gutterBottom>
                Earthquake Magnitude
              </Typography>
              <Slider
                style={{ marginLeft: "20px" }}
                color="primary"
                value={sliderValue}
                onChange={handleChangeMag}
                marks={marks}
                track="inverted"
                aria-labelledby="continuous-slider"
              />
            </div>
            <div className={classes.root}>
              <Typography id="discrete-slider-small-steps" gutterBottom>
                Earthquake Radius mi
              </Typography>
              <Slider
                style={{ marginLeft: "50px" }}
                color="primary"
                value={sliderValue2}
                onChange={handleChangeRadius}
                marks={marks2}
                aria-labelledby="continuous-slider"
              />
            </div>
          </div>
          <div className="leaflet-container">
            Collapse
            <Map center={position} zoom={mapData.zoom}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
              />

              <Marker position={position}>
                <Popup>
                  {props.mapObj.city}, {props.mapObj.state_name}
                </Popup>
              </Marker>
              {markers}
            </Map>
          </div>
        </Card>}
      </div>
    </>
  );
};

export default MyMap;
