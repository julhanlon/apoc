import React, { useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { Button, Card } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import "./Chart.css"

const maxDays = 60;

const useStyles = makeStyles({
  root: {
    background: "#F01711",
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



const buttonStyle = {
  marginRight: "10px",
};

const titleStyle = {
 textAlign: "center"
};

export default (props) => {

  const classes = useStyles();
  const [numDays, setNumDays] = useState(maxDays);
  const [showArea, setshowArea] = useState("false");
  // const [show, setShow] = useState(true)


  const showCard = () => {
    props.showCard("covid")
}


  const changeNumber = (e) => {
    var numberDays = parseInt(e.currentTarget.value);
    setNumDays(numberDays);
  };

  const addArea = (e) => {
    var areaChart = e.currentTarget.value;
    setshowArea(areaChart);
  };

  let dailyDeaths = { data: [] },
    totalDeaths = { data: [] },
    dailyInfected = { data: [] };
  props.data.map((item) => {
    dailyDeaths.data.push({
      x: item.date,
      y: item.dailydeaths,
    });
    totalDeaths.data.push({
      x: item.date,
      y: item.totalDeaths,
    });
    dailyInfected.data.push({
      x: item.date,
      y: item.dailyInfected,
    });
  });
  let data = [
    {
      id: "Daily Deaths",
      data: dailyDeaths.data.slice(-numDays),
    },
    {
      id: "Total Deaths",
      data: totalDeaths.data.slice(-numDays),
    },
    {
      id: "Daily Cases",
      data: dailyInfected.data.slice(-numDays),
    },
  ];
  return (
    <>
    <div style = {{ height: "670px", width: "100%"}}>
    <FormControlLabel style = {{marginLeft: "30px"}} control={<Checkbox id = "checkbox" onClick={showCard} 
          color="default"
          inputProps={{ 'aria-label': 'checkbox with default color' }} size = "small" checked = {props.show}  />}  />Covid
    <div style = {{display: "flex", justifyContent: "center"}}>
    {props.show && <Card id = "chartCard" >
    <Typography variant="h4" component="h4">
        <p style={titleStyle}>Covid Chart</p>
      </Typography>
      <div style={{display: "flex", justifyContent: "space-between" }}>
        <div style = {{marginLeft: "20px"}}> 
        <Button
       classes={{
        root: classes.root, // class name, e.g. `classes-nesting-root-x`
        label: classes.label, // class name, e.g. `classes-nesting-label-x`
      }}
          variant="contained"
          color="primary"
          size="small"

          style={buttonStyle}
          onClick={changeNumber}
          value={7}
        >
          1 Week
        </Button>
        <Button   classes={{
        root: classes.root, // class name, e.g. `classes-nesting-root-x`
        label: classes.label, // class name, e.g. `classes-nesting-label-x`
      }}
          variant="contained"
          color="primary"
          size="small"
          style={buttonStyle}
          onClick={changeNumber}
          value={30}
        >
          1 Month
        </Button>
        <Button
          classes={{
            root: classes.root, // class name, e.g. `classes-nesting-root-x`
            label: classes.label, // class name, e.g. `classes-nesting-label-x`
          }}
          variant="contained"
          color="primary"
          size="small"
          style={buttonStyle}
          onClick={changeNumber}
          value={60}
        >
          2 Months
        </Button>
        </div>
        <div style={{ float: "right", marginRight: "20px" }}>
          <Button
            classes={{
              root: classes.root, // class name, e.g. `classes-nesting-root-x`
              label: classes.label, // class name, e.g. `classes-nesting-label-x`
            }}
          color = "orange"
            variant="contained"
            color="primary"
            size="small"
            style={{ marginRight: "10px" }}
            onClick={addArea}
            value="true"
          >
            Area
          </Button>
          <Button
          classes={{
            root: classes.root, // class name, e.g. `classes-nesting-root-x`
            label: classes.label, // class name, e.g. `classes-nesting-label-x`
          }}
            variant="contained"
            color="primary"
            size="small"
            onClick={addArea}
            value="false"
          >
            Line
          </Button>
        </div>
      </div>
      <div style={{ height: "500px", display: "flex", justifyContent: "center"}}>
        <ResponsiveLine
          data={data}
          enableArea={showArea === "true"}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 90,
            //legend: 'Date',
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "count",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          enableGridX={true}
          enableGridY={false}
          colors={{ scheme: "nivo" }}
          // enableArea = {true}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabel="y"
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </Card>}
    </div>
  
    </div>


    </>
  );
};
