import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Form from "../card/AuthPost";
import Danger from "../Danger";
import Search from "./Search";
import Chart from "../Chart";
import BarChart from "../BarChart";
import { Button } from "@material-ui/core";
import Loader from "react-loader"
import API from "../../utils/API";
import { useUserContext } from "../context/UserContext";
import Weather from "../Weather";
import AirQuality from "../AirQuality"

const maxDays = 60;


const buttonStyle = {
  marginLeft: "10px",
};


const AuxButton = (props) => {
  var array = props.options
  let newItems = array.map((item, index) => {
    return <Button onClick={props.handleAuxButton} variant="outlined" color="secondary" data-index={index} key={index}>{item.city}, {item.state_name}</Button>
  })
  return newItems;
}

const Home = () => {


  const [covidData, setCovidData] = useState([]);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [numDays, setNumDays] = useState(maxDays);
  const [weatherData, setWeatherData] = useState(null);
  const [airData, setAirData] = useState(null);
  const [suggestions, setSuggestionsData] = useState(null);
  // const [input, setInput] = useState({ city: "", state_name: "" });


  const handleAuxButton = (e) => {
    let value = suggestions[e.currentTarget.dataset.index]
    buttonSubmit(value.city, value.state_name, value.county, value.lat, value.lng)
  }

  const changeNumber = (e) => {
    // setNumDays({numDays, [e.target.name]: e.target.value});
    console.log(e.currentTarget.value)
    var numberDays = parseInt(e.currentTarget.value)
    setNumDays(numberDays)

  }

  //covid function
  const loadCovidData = (city, state_name, county) => {
    setLoadingInfo(true);
    setSuggestionsData(null)
    API.getCovidData(city, state_name, county, maxDays)
      .then((res) => {
        var array = res.data.data;
        var results = array.map((item) => {
          var covidObj = {
            // totalInfected: item.confirmed,
            dailyInfected: item.confirmed_diff,
            totalDeaths: item.deaths,
            dailydeaths: item.deaths_diff,
            date: item.date.split("-").slice(-2).join("/"),
          };
          return covidObj;
        });
        setCovidData(results);
        setLoadingInfo(false);
      })
      .catch((err) => {
        console.log(err.response)
        if (err.response.data && err.response.data.data) {
          setSuggestionsData(err.response.data.data)
        }
        setLoadingInfo(false);
      });
  }


  //Weather function
  const loadWeatherData = (city, state_name, lat, lng) => {
    API.getWeatherData(city, state_name, lat, lng)
      .then((res) => {
        console.log(res.data)
        var data = res.data;
        var weatherObj = {
          temp: data.data.current.temp,
          humidity: data.data.current.humidity,
          uvi: data.data.current.uvi,
          wind_speed: data.data.current.wind_speed,
        };
        setWeatherData(weatherObj);
      })
      .catch((err) => {
        console.log(err.response)
      })
  }

  //Air Quality function
  const loadAirData = (city, state_name, lat, lng) => {
    API.getAirData(city, state_name, lat, lng)
      .then((res) => {
        console.log(res.data)
        var data = res.data;
        if (data.data) {
          var airObj = {
            aqi: data.data.data.aqi,
            dominentpol: data.data.data.dominentpol,
            co: data.data.data.iaqi.co ? data.data.data.iaqi.co.v : null,
            no2: data.data.data.iaqi.no2 ? data.data.data.iaqi.no2.v : null,
            o3: data.data.data.iaqi.o3 ? data.data.data.iaqi.o3.v : null,
            pm25: data.data.data.iaqi.pm25.v,

          };
          setAirData(airObj);
        }
      })
      .catch((err) => {
        console.log(err.response)
      })
  }

  const buttonSubmit = (city, state_name, county, lat, lng) => {
    loadWeatherData(city, state_name, lat, lng)
    loadAirData(city, state_name, lat, lng)
    loadCovidData(city, state_name, county)
  };


  const { userData } = useUserContext();

  return (
    <div className="page">
      {!userData.user ? (
        <>

        </>
      ) : (
          <>
            {loadingInfo ? null : <h3>Welcome {userData.user.displayName}</h3>}

            <Search buttonSubmit={buttonSubmit} loadingInfo={loadingInfo} />
            {suggestions ? <AuxButton handleAuxButton={handleAuxButton} options={suggestions} /> : null}
            {loadingInfo ? <Loader loaded={false} lines={13} length={20} width={10} radius={30}
              corners={1} rotate={0} direction={1} color="#000" speed={1}
              trail={60} shadow={false} hwaccel={false} className="spinner"
              zIndex={2e9} top="50%" left="50%" scale={1.00}
              loadedClassName="loadedContent" /> : null}
            {covidData.length > 0 ?
              <>
                <div style={{ height: "500px" }}>
                  <Chart data={covidData.slice(-numDays)} />
                </div >
                <Button variant="outlined" color="secondary"
                  disabled={loadingInfo}
                  style={buttonStyle} onClick={changeNumber}
                  value={7} >1 Week</Button>
                <Button variant="outlined" color="secondary" disabled={loadingInfo} style={buttonStyle} onClick={changeNumber} value={30} >1 Month</Button>
                <Button variant="outlined" color="secondary" disabled={loadingInfo} style={buttonStyle} onClick={changeNumber} value={60}>2 Months</Button>
                <br></br>

                {/* <Danger /> */}
              </> : null
            }
            {weatherData && <Weather weatherObj={weatherData} />}
            {airData && <div style={{ height: "250px" }}><BarChart airObj={airData} /></div>}
            {/* {airData && <AirQuality airObj={airData} />} */}
            {/* <Form inputName={"todoText"} /> */}


          </>
        )}

    </div>
  );
};
export default Home;
