const convertDateFormat = (date) => {
  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  return `${year}-${month.length === 1 ? "0" + month : month}-${
    day.length === 1 ? "0" + day : day
  }`;
};

const degToRad = (value) => (value * Math.PI) / 180.0;

const earthRadius = 3963.0;

function findDistByLatLng(lat1, lng1, lat2, lng2) {
  return (
    Math.acos(
      Math.sin(lat1) * Math.sin(lat2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1)
    ) * earthRadius
  );
}

function getCircleLng(radians, radius) {
  return Math.cos(radians) * radius;
}

module.exports = {
  findEqData: async function (lat, lng, d) {
    const axios = require("axios");
    //find the API key and add to dotenv
    require("dotenv").config();
    try {
      const earthquake = await axios({
        method: "GET",
        url:
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson",
      });
      // console.log("earthquake.data");
      let result = [];
      let array = earthquake.data.features || [];
      array.map((feature) => {
        let eqLat = feature.geometry.coordinates[1];
        let eqLng = feature.geometry.coordinates[0];
        var time = new Date(feature.properties.time);
        let converted = convertDateFormat(time);
        let distance = findDistByLatLng(
          degToRad(lat),
          degToRad(lng),
          degToRad(eqLat),
          degToRad(eqLng)
        );
     

        if (distance <= d) {
          const eqObj = {
            distance: distance,
            mag: feature.properties.mag,
            time: converted,
            title: feature.properties.title,
            lat: eqLat,
            lng: eqLng,
          };
          result.push(eqObj);
        }
      });
    
      return result;
    } catch (error) {
      console.log(error);
    }
  },
};

