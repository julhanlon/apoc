import React, { useState } from "react";
import Header from "../Header";
import DangerChart from "../mapsAndCharts/DangerChart";
import Search from "./Search";
import Chart from "../mapsAndCharts/Chart";
import BarChart from "../mapsAndCharts/BarChart";
import { Button, Card } from "@material-ui/core";
import Loading from "../Loading";
import API from "../../utils/API";
import FeedList from "../feed/FeedList";
import Weather from "../Weather/Weather";
import FiveDay from "../Weather/FiveDay";
import MyMap from "../mapsAndCharts/MyMap";
import CityName from "../CityName";
import SearchChips from "../SearchChips";
import AuthButtons from "../auth/AuthButtons";
import "./Home.css";
const maxDays = 60;
const SuggestionsButton = (props) => {
  var array = props.options;
  let newItems = array.map((item, index) => {
    return (
      <Button
        onClick={props.handleAuxButton}
        variant="outlined"
        color="secondary"
        data-index={index}
        key={index}
      >
        {item.city}, {item.state_name}
      </Button>
    );
  });
  return newItems;
};
const initData = {
  air: null,
  covid: [],
  mapp: null,
  eq: [],
  feed: [],
  weather: null,
};
const initDanger = {
  air: { show: true, score: 0 },
  covid: { show: true, score: 0 },
  eq: { show: true, score: 0 },
  weather: { show: true, score: 0 },
};
const initSubmitData = {
  city: null,
  state_name: null,
  county: null,
  lat: null,
  lng: null,
};
const Home = () => {
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [suggestions, setSuggestionsData] = useState(null);
  const [dangerData, setDangerData] = useState(initDanger);
  const [allData, setAllData] = useState(initData);
  const [submitData, setSubmitData] = useState(initSubmitData);
  React.useEffect(() => {
    let mapStorage = localStorage.getItem("mapStorage");
    if (mapStorage) {
      mapStorage = JSON.parse(mapStorage);
      console.log(mapStorage.length);
      if (mapStorage.length > 0)
        setSubmitData({
          city: mapStorage[0].city,
          state_name: mapStorage[0].state_name,
          county: mapStorage[0].county,
          lat: mapStorage[0].lat,
          lng: mapStorage[0].lng
        });
    }
  }, []);

  React.useEffect(() => {
    let exec = true;
    const buttonSubmit = (city, state_name, county, lat, lng) => {
      if (!city || !state_name || city.trim() === "" || state_name.trim() === "")
        return;
      setLoadingInfo(true);
      setSuggestionsData(null);
      Promise.all(
        [
          loadAirData(city, state_name, lat, lng),
          loadCovidData(city, state_name, county),
          loadMapData(city, state_name, county, lat, lng),
          loadEarthquakes(city, state_name, lat, lng),
          loadFeedData(city, state_name, county),
          loadWeatherData(city, state_name, lat, lng),
        ].map((promise) =>
          promise
            .then((ok) => {
              return { success: true, data: ok };
            })
            .catch((err) => {
              return { success: false, message: err };
            })
        )
      )
        .then((values) => {
          if (!exec) return;
          if (values.length !== 6) {
            setLoadingInfo(false);
            return;
          }
          if (!values[2].success && values[2].message && values[2].message.data) {
            setLoadingInfo(false);
            setSuggestionsData(values[2].message.data.data);
            return;
          }
          let dataObj = initData;
          if (values[0].success) dataObj.air = values[0].data;
          if (values[1].success) dataObj.covid = values[1].data;
          if (values[2].success) {
            let recentSearches = localStorage.getItem("mapStorage");
            recentSearches = recentSearches ? JSON.parse(recentSearches) : [];
            if (recentSearches.length === 0) {
              recentSearches.push(values[2].data);
              localStorage.setItem("mapStorage", JSON.stringify(recentSearches));
            } else if (recentSearches.length < 5) {
              recentSearches.unshift(values[2].data);
              localStorage.setItem("mapStorage", JSON.stringify(recentSearches));
            } else {
              recentSearches.unshift(values[2].data);
              recentSearches.pop();
              localStorage.setItem("mapStorage", JSON.stringify(recentSearches));
            }
            dataObj.mapp = values[2].data;
          }
          if (values[3].success) dataObj.eq = values[3].data;
          if (values[4].success) dataObj.feed = values[4].data;
          if (values[5].success) dataObj.weather = values[5].data;
          dangerLevel(dataObj);
          setAllData(dataObj);
          setLoadingInfo(false);
        })
        .catch((err) => {
          console.log(err);
          setLoadingInfo(false);
        });
    };


    //map Data function
    const loadMapData = (city, state_name, county, lat, lng) => {
      return new Promise((resolve, reject) => {
        API.getMapData(city, state_name, county, lat, lng)
          .then((res) => {
            var mapObj = res.data.data[0];
            resolve(mapObj);
          })
          .catch((err) => {
            reject(err.response);
          });
      });
    };
    //covid function
    const loadCovidData = (city, state_name, county) => {
      return new Promise((resolve, reject) => {
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
            resolve(results);
          })
          .catch((err) => {
            reject(err.response);
          });
      });
    };
    //Weather function
    const loadWeatherData = (city, state_name, lat, lng) => {
      return new Promise((resolve, reject) => {
        API.getWeatherData(city, state_name, lat, lng)
          .then((res) => {
            var data = res.data;
            var weatherObj = {
              temp: data.data.current.temp,
              humidity: data.data.current.humidity,
              uvi: data.data.current.uvi,
              wind_speed: data.data.current.wind_speed,
              todayIcon: data.data.current.weather[0].main,
              weather2: data.data.daily[1].temp.day,
              main2: data.data.daily[1].weather[0].main,
              day2: data.data.daily[1].dt * 1000,
              weather3: data.data.daily[2].temp.day,
              main3: data.data.daily[2].weather[0].main,
              day3: data.data.daily[2].dt * 1000,
              weather4: data.data.daily[3].temp.day,
              main4: data.data.daily[3].weather[0].main,
              day4: data.data.daily[3].dt * 1000,
              weather5: data.data.daily[4].temp.day,
              main5: data.data.daily[4].weather[0].main,
              day5: data.data.daily[4].dt * 1000,
              weather6: data.data.daily[5].temp.day,
              main6: data.data.daily[5].weather[0].main,
              day6: data.data.daily[5].dt * 1000,
            };
            resolve(weatherObj);
          })
          .catch((err) => {
            reject(err.response);
          });
      });
    };
    const loadEarthquakes = (city, state_name, lat, lng) => {
      return new Promise((resolve, reject) => {
        API.getEarthquakeData(city, state_name, lat, lng)
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err.response);
          });
      });
    };
    //Air Quality function
    const loadAirData = (city, state_name, lat, lng) => {
      return new Promise((resolve, reject) => {
        API.getAirData(city, state_name, lat, lng)
          .then((res) => {
            var data = res.data;
            if (data.data) {
              var airObj = {
                aqi: data.data.data.aqi ? data.data.data.aqi : null,
                dominentpol: data.data.data.dominentpol
                  ? data.data.data.dominentpol
                  : null,
                co: data.data.data.iaqi.co ? data.data.data.iaqi.co.v : null,
                no2: data.data.data.iaqi.no2 ? data.data.data.iaqi.no2.v : null,
                o3: data.data.data.iaqi.o3 ? data.data.data.iaqi.o3.v : null,
                pm25: data.data.data.iaqi.pm25
                  ? data.data.data.iaqi.pm25.v
                  : null,
              };
              resolve(airObj);
            }
          })
          .catch((err) => {
            reject(err.response);
          });
      });
    };
    const loadFeedData = (city, state_name, county) => {
      return new Promise((resolve, reject) => {
        API.getFeedData(city, state_name, county)
          .then((res) => {
            console.log("feed", res.data.data);
            resolve(res.data.data);
          })
          .catch((err) => {
            reject(err.response);
          });
      });
    };

    const dangerLevel = (allData) => {

      let scoreObj = { covid: -1, weather: -1, eq: -1, air: -1 };
      if (allData.covid.length > 0) {
        let CovidDanger = allData.covid[allData.covid.length - 1].totalDeaths;
        if (CovidDanger <= 1000) {
          scoreObj.covid = 25;
        } else if (1000 < CovidDanger && CovidDanger < 2000) {
          scoreObj.covid = 50;
        } else if (4000 > CovidDanger && CovidDanger >= 2000) {
          scoreObj.covid = 75;
        } else if (CovidDanger >= 4000) {
          scoreObj.covid = 100;
        }
      }
      if (allData.weather) {
        let weatherDanger = allData.weather.temp;
        if (weatherDanger <= 273 || weatherDanger >= 313) {
          scoreObj.weather = 100;
        } else if (weatherDanger <= 295 && weatherDanger < 313) {
          scoreObj.weather = 75;
        } else if (weatherDanger > 273 || weatherDanger < 295) {
          scoreObj.weather = 50;
        }
      }
      if (allData.eq && allData.eq.length > 0) {
        let eqDanger = allData.eq.length;
        if (eqDanger >= 200) {
          scoreObj.eq = 100;
        } else if (eqDanger >= 100 && eqDanger < 200) {
          scoreObj.eq = 75;
        } else if (eqDanger >= 50 && eqDanger < 100) {
          scoreObj.eq = 50;
        } else if (eqDanger < 50) {
          scoreObj.eq = 25;
        }
      }
      if (allData.air) {
        let airDanger = allData.air.aqi;
        if (airDanger >= 200) {
          scoreObj.air = 100;
        } else if (airDanger >= 150 && airDanger < 200) {
          scoreObj.air = 75;
        } else if (airDanger >= 75 && airDanger < 150) {
          scoreObj.air = 50;
        } else if (airDanger < 75) {
          scoreObj.air = 25;
        }
      }
      let dangerObj = {
        air: { score: scoreObj.air, show: true },
        covid: { score: scoreObj.covid, show: true },
        eq: { score: scoreObj.eq, show: true },
        weather: { score: scoreObj.weather, show: true }
      };
      setDangerData(dangerObj);
    };

    let { city, state_name, county, lat, lng } = submitData
    buttonSubmit(city, state_name, county, lat, lng)
    return function () {
      exec = false;
    }
  }, [submitData])


  const handleAuxButton = (e) => {
    let value = suggestions[e.currentTarget.dataset.index];
    setSubmitData({
      city: value.city,
      state_name: value.state_name,
      county: value.county,
      lat: value.lat,
      lng: value.lng
    });
  };



  const showCard = (attribute) => {
    let showAttribute = dangerData[attribute].show;
    let obj = {
      ...dangerData,
      [attribute]: { ...dangerData[attribute], show: !showAttribute }
    }
    setDangerData(obj)
  }



  return (
    <div className="page">
      <>
        <AuthButtons />
        <Header />
        <div style={{ marginTop: "60px" }}>
          <Search
            className="search"
            buttonSubmit={setSubmitData}
            loadingInfo={loadingInfo}
          />
          <div className="QueryBtnsBox">
            {<SearchChips buttonSubmit={setSubmitData} />}
            {suggestions ? (
              <SuggestionsButton
                handleAuxButton={handleAuxButton}
                options={suggestions}
              />
            ) : null}
          </div>
        </div>
        <div id="loader">{loadingInfo ? <Loading /> : null}</div>
        {!loadingInfo ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "60px",
              }}
            >
              <Card id="topItems">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {allData.mapp && (
                    <CityName id="cityName" mapObj={allData.mapp} />
                  )}
                  {dangerData && <DangerChart danger={dangerData} />}
                </div>
              </Card>
            </div>
            <div className="mapAndFeed" style={{ marginTop: "60px" }}>
              <div style={{ width: "45%", marginLeft: "35px" }}>
                {allData.mapp && (
                  <MyMap mapObj={allData.mapp} showCard={showCard} show={dangerData.eq.show} eqData={allData.eq} />
                )}
              </div>
              <div style={{ width: "45%", marginRight: "40px"}}>
                {allData.mapp && (
                  <FeedList mapInfo={allData.mapp} feedData={allData.feed} />
                )}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "60px",
              }}
            >
              {allData.mapp && <Chart showCard={showCard} show={dangerData.covid.show} data={allData.covid} />}
            </div>
            <div
              className="weather"
              style={{ marginTop: "60px", marginBottom: "50px" }}
            >
              {/* <div style = {{display: "flex", justifyContent: "center"}}> */}
              {allData.weather && <Weather showCard={showCard} show={dangerData.weather.show} weatherObj={allData.weather} />}
              {allData.weather && <FiveDay weatherObj={allData.weather} />}
              {/* </div> */}
              {allData.air && (
                <div>
                  <BarChart showCard={showCard} show={dangerData.air.show} airObj={allData.air} />
                </div>
              )}
            </div>
          </>
        ) : null}
        {/* </ThemeProvider> */}
      </>
    </div>
  );
};
export default Home;
