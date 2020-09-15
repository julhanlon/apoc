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

module.exports = {
  getFireData: async function (lat, lng, d) {
    const axios = require("axios");

    require("dotenv").config();
    console.log(lat, lng, d);

    try {
      const fires = await axios({
        method: "GET",
        url:
          "https://eonet.sci.gsfc.nasa.gov/api/v2.1/categories/8?status=open",
      });
      let fireArr = fires.data.events;
      // console.log("Obj return from fireController; FIRES URL: ", fireArr);
      let result = [];

      fireArr.map((item) => {
        let fLat = item.geometries[0].coordinates[0];
        let fLng = item.geometries[0].coordinates[1];
        // let ftime = item.geometries[0].date;
        // let converted = convertDateFormat(time);

        let distance = findDistByLatLng(
          degToRad(lat),
          degToRad(lng),
          degToRad(fLat),
          degToRad(fLng)
        );

        if (distance <= d) {
          const fireObj = {
            distance: distance,
            title: item.title,
            time: item.geometries[0].date,
            lat: fLat,
            lng: fLng,
          };
          result.push(fireObj);
        }
      });

      console.log("n=", result.length, "fire objects");
      return result;
    } catch (error) {
      console.log(error);
    }
  },
};
