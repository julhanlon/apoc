const router = require("express").Router();
const controller = require("../controllers");

router.get("/api/earthquake", async (req, res) => {
  const d = 1000.0;
  const { city, state_name, lat, lng } = req.query;

  if (!city || !state_name) {
    return res.status(400).json({ msg: "query string is empty" });
  }

  if (lat && lng) {
    try {
      var data = (await controller.earthquake.findEqData(lat, lng, d)) || [];

      // console.log("earthquake route");
      return res.json(data);
    } catch (error) {
      // console.log("error", error);
      return res.status(404).json({ msg: "no data found" });
    }
  }

  const info = await controller.db.findInfoFromCity(city, state_name);
  if (info.data.length !== 1) return res.status(400).json({ data: info.data });
  // console.log(info, ": location query match w/ city-db");
  try {
    var data =
      (await controller.earthquake.findEqData(
        info.data[0].lat,
        info.data[0].lng,
        d
      )) || [];

    //console.log("earthquake route", data);
    res.json(data);
  } catch (error) {
    console.log("error", error);
    return res.status(404).json({ msg: "no data found" });
  }
  // });
});
module.exports = router;
