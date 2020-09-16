import React, {useState} from "react";
import GaugeChart from "react-gauge-chart";

const Danger = (props) => {



const [dangerValue, setDangerValue] = useState("");

  return (
    <>
      <div
        style={{
          height: "530px",
          width: "730px",
          marginBottom: "20px",
        }}
      >
        <GaugeChart
          id="gauge-chart2"
          nrOfLevels={30}
          colors={["#edd134","#FFC371","#FF5F6D"]} 
          hideText = {true}
          percent={props.danger/100}
        />
      </div>
    </>
  );
};

export default Danger;
