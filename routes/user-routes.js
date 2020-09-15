const router = require("express").Router();
const db = require("../models");
// const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
router.get("/test", (req, res) => {
  res.send("express user-routes is working");
});
//////////////////// REGISTER ///////////////////////////
router.post("/register", async (req, res) => {
  try {
    let { email, password, displayName, passwordCheck, firstName, lastName, profilePic, location, phone } = req.body;
    //validate//
    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingUser = await db.User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });
    if (!displayName) displayName = "Anonymous";
    if (!profilePic) profilePic = "";
    //validate//
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new db.User({
      email,
      password: passwordHash,
      displayName,
      firstName,
      lastName,
      profilePic,
      location,
      phone,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//////////////////// LOGIN /////////////////////////////
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await db.User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//////////////////// DELETE ///////////////////////////
router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await db.User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//////////////////// TOKEN CHECK ///////////////////////
router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);
    const user = await db.User.findById(verified.id);
    if (!user) return res.json(false);
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//this route gets the user info
router.get("/", auth, async (req, res) => {
  try {
    const user = await db.User.findById(req.user);
    res.json({
      user: {
        id: user._id,
        displayName: user.displayName,
      },
    });
  } catch (err) {
    res.send(err);
  }
});

//this route gets the user profile info
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await db.User.findById(req.user).select("firstName lastName email displayName profilePic");
    res.json({user});
  } catch (err) {
    res.json({msg: err});
  }
});

//this route gets the user profile info
router.patch("/profile/edit", auth, async (req, res) => {

  let attr = req.body.attribute
  let value = req.body.value

  // db.User.findOneAndUpdate({_id: req.user}, {[attr]: value}, {new: true}, function(err, user){
  //   if (err) {
  //     return res.json({msg: err})
  //   }
  //   return res.json({user})
  // })

  try {
    console.log(attr, value)
    console.log(req.user)
    const user = await db.User.findOneAndUpdate({_id: req.user}, {[attr]: value}, {new: true})
    
    res.json({user});
  } catch (err) {
    res.json({msg: err});

  }
});


module.exports = router;
