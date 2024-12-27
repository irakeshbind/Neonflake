const express = require("express");
const router = express.Router();
const { uploadVideo, videoList } = require("../controllers/videoController");

router.get("/", (req, res) => {
  res.send("Hello World");
});
router.post("/upload", uploadVideo);
router.get("/get-all-video-list", videoList);

module.exports = router;
