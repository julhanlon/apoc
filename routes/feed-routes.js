const router = require("express").Router();
const auth = require("../middleware/auth");
const db = require("../models");
const controller = require("../controllers");
const mongoose = require("mongoose");

//get all posts based on user
router.get("/feed/user", auth, async (req, res) => {
  try {
    const feedList = await db.Feed.find({
      author: {
        id: mongoose.Types.ObjectId(req.user),
      },
    });

    res.json(feedList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//get all posts based on location
router.get("/feed/city", auth, async (req, res) => {
  const { city, state_name, county, profilePic } = req.query;

  if (!city || !state_name)
    return res.status(400).json({ msg: "Please enter city and state" });

  if (city && state_name && county)
    //this try catch checks for query string city/state with exact match
    try {
      const feedListData = await db.Feed.find({
        location: {
          city: city,
          state_name: state_name,
        },
        
      }).populate({ path: "author.id", select: "displayName profilePic -_id" })
      return res.json({ data: feedListData });
    } catch (err) {
      return res.status(500).json({ msg: "no data found" });
    }
  //this obj finds city/state query matching similar strings in citydb
  // const dbCityInfo = await controller.db.findInfoFromCity(city, state_name);
  let dbCityInfo = { data: [] };
  try {
    const data = await controller.db.findInfoFromCity(city, state_name);
    dbCityInfo.data = data.data || [];
  } catch (error) {
    return res.status(500).json({ msg: "no data found" });
  }
  //return err if 1 not found
  if (dbCityInfo.data.length !== 1)
    return res.status(400).json({ data: dbCityInfo.data });
  try {
    const feedListData = await db.Feed.find({
      location: {
        city: `${dbCityInfo.data[0].city}`,
        state_name: `${dbCityInfo.data[0].state_name}`,
      },
    }).populate({ path: "author.id", select: "displayName profilePic -_id" })
    console.log("feedlist data from feeroutes: ", { feedListData });
    return res.json({ data: feedListData });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ msg: "no data found" });
  }
});

router.post("/feed/new", auth, async (req, res) => {
  try {
    const { text } = req.body;
    const { city, state_name } = req.query;

    if (!city || !state_name)
      return res.status(400).json({ msg: "Please enter city and state" });

    // const location = `${city}, ${state_name}`;
    //validation
    if (!text) return res.status(400).json({ msg: "Complete required fields" });

    const newPost = new db.Feed({
      text,
      location: {
        city: city,
        state_name: state_name,
      },
      author: {
        id: req.user,
      },
    });
    console.log(newPost);
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// router.get("/feed/example", (req, res) => {
//   res.send("msg success from feed-route");
// });

router.delete("/remove/:id", (req, res) => {
  db.Feed.findByIdAndRemove(req.params.id).then(() => res.send("success"));
});
module.exports = router;
