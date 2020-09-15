import React, {useState} from "react";
import GaugeChart from "react-gauge-chart";

const Danger = (props) => {



const [dangerValue, setDangerValue] = useState("");

  return (
    <>
      <div
        style={{
          height: "45%",
          width: "45%",
          marginBottom: "50px",
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
