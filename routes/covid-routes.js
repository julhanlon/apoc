const router = require("express").Router();
const { findCovidData } = require("../controllers/covidController");
const db = require("../models");
router.get("/api/covid", async (req, res) => {
  var city = req.query.city;
  var state_name = req.query.state_name;
  var numDays = Number(req.query.days) || 3;

  if (!city || !state_name) {
    return res.status(400).json({msg: "query string is empty"})
  }
  if (numDays % 1 !== 0 || !(numDays > 0 && numDays <= 60)) {
    return res.status(400).json({msg: "days should be an integer within 1 and 60"})
  }
  //console.log(city, state_name);
  db.City.find({ city, state_name }).then((info) => {
    //console.log(info);
    if (info && info.length != 0) {
      return {county: info[0].county_name, state_name};
    } else {
      return { msg: "no data from api" };
    }
  }).then( async(info) => {  
    if (!info.county) return res.json(info)
    try {
      var data = await findCovidData(info.state_name, info.county, numDays);
      return res.json({data});
    } catch(error) {
      console.log("error",error)
      return res.json({ msg: "no data found" });
    }
  })
});
// router.get("/api/city", async (req, res) => {
//   var city = req.body.city;
//   var state_name = req.body.state_name;
//   cities
//     .find({ city, state_name })
//     .then((info) => {
//       console.log(info);
//       if (info && info.length != 0) {
//         res.json(info[0].county_name);
//       } else {
//         res.json({ msg: "no data" });
//       }
//     })
//     .catch((err) => res.send(err));
// });

module.exports = router;
