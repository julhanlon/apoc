import React, {useState} from "react";
import GaugeChart from "react-gauge-chart";

const Danger = (props) => {

  const calScore = () => {
    if (props.danger) {
      let {air, covid, eq, weather} = props.danger;
      let totalWeight = 0.0;
      let airScore = 0.0, covidScore = 0.0, eqScore = 0.0, weatherScore = 0.0;
      if (air.show && air.score > 0.0) {
        airScore = 0.3 * air.score;
      }
      totalWeight += air.score > 0 ? 0.3 : 0.0;
      if (covid.show && covid.score > 0.0) {
        covidScore = 0.3 * covid.score;
      }
      totalWeight += covid.score > 0 ? 0.3 : 0.0;
      if (eq.show && eq.score > 0.0) {
        eqScore = 0.3 * eq.score;
      }
      totalWeight += eq.score > 0 ? 0.3 : 0.0;
      if (weather.show && weather.score > 0.0) {
        weatherScore = 0.1 * weather.score;
      }
      totalWeight += weather.score > 0 ? 0.1 : 0.0;
      if (totalWeight === 0.0) return 0.0;
      let finalScore = (airScore + covidScore + eqScore + weatherScore);
      return finalScore  / totalWeight / 100.0;
    }
    return 0.0;
}

// const [dangerValue, setDangerValue] = useState("");

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
          percent={calScore()}
        />
      </div>
    </>
  );
};

export default Danger;
