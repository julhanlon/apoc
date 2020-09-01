const router = require("express").Router();
const auth = require("../middleware/auth");
const Feed = require("../models/feedModel");

router.post("/", auth, async (req, res) => {
  try {
    const { title } = req.body;
    //validation

    if (!title)
      return res.status(400).json({ msg: "Complete required fields" });

    const newPost = new Feed({ title, userId: req.user });
    const savedPost = await newPost.save();

    res.json(savedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/all", auth, async (req, res) => {
  const todos = await Feed.find({ userId: req.user });
  res.json(todos);
});

router.delete("/remove/:id", (req, res) => {
  Feed.findByIdAndRemove(req.params.id).then(() => res.send("success"));
});

module.exports = router;
