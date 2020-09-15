import React, { useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Button, Card } from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Modal from "../Modal";
import "./BarChart.css"

export default (props) => {

  const [axis, setAxis] = useState("vertical");
  const [show, setShow] = useState(true)

  const showCard = () => {
    setShow(!show)
}

  const changeAxis = (e) => {
    //   console.log(e.currentTarget.value)
    var chartAxis = e.currentTarget.value;
    setAxis(chartAxis);
  };

  let data = [
    { pollutant: "aqi", "air Quality": props.airObj.aqi },
    { pollutant: "co", "carbon Monoxide": props.airObj.co },
    { pollutant: "o3", ozone: props.airObj.o3 },
    { pollutant: "pm25", "particle Matter": props.airObj.pm25 },
    { pollutant: "no2", "nitrogen Dioxide": props.airObj.no2 },
  ];

  return (
    <>
    <div style = {{height: "540px", width: "780px"}}>
    <FormControlLabel control={<Checkbox id = "checkbox" onClick={showCard} checked = {show}  />}  />
    {show &&  <Card id = "barCard" style = {{width: "780px", height: "530px"}}>
     
      <Typography variant="h4" component="h4">
     <p style={{textAlign: "center" }}>Air Quality Index</p>
     </Typography>
     
      <div style = {{display: "flex", marginLeft: "20px"}}>
      <Modal />
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={changeAxis}
        style={{ marginLeft: "10px" }}
        value="horizontal"
      >
        Horizontal
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={changeAxis}
        style={{ marginLeft: "10px" }}
        value="vertical"
      >
        Vertical
      </Button>
      </div>
<div style = {{height: "350px"}}>
<ResponsiveBar
        layout={axis}
        data={data}
        keys={[
          "air Quality",
          "carbon Monoxide",
          "ozone",
          "particle Matter",
          "nitrogen Dioxide",
        ]}
        indexBy="pollutant"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "fries",
            },
            id: "dots",
          },
          {
            match: {
              id: "sandwich",
            },
            id: "lines",
          },
        ]}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          // legend: 'pollutant',
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "value",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
</div>
    
      </Card>}
    </div>
    </>
  );
};
