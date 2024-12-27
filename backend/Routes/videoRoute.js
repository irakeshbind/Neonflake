const express = require("express");
const router = express.Router();
const { uploadVideo } = require("../controllers/videoController");

router.get("/", (req, res) => {
  res.send("Hello World");
});
router.post("/upload", uploadVideo);

module.exports = router;
