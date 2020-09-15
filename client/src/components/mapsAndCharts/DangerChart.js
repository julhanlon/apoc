import React from "react";
import GaugeChart from "react-gauge-chart";

const Danger = (props) => {
  return (
    <>
      <div
        style={{
          height: "45%",
          width: "45%",
          marginBottom: "50px",
          // background: "grey",
        }}
      >
        <GaugeChart
          id="gauge-chart2"
          nrOfLevels={30}
          hideText = {true}
          percent={props.danger/100}
        />
      </div>
    </>
  );
};

export default Danger;
