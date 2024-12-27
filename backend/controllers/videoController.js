const cloudinary = require("../config/cloudinary");
const Video = require("../model/videoModel");

module.exports = {
  uploadVideo: async (req, res) => {
    try {
      const { video, thumbnail } = req.files;
      const { title, description } = req.body;
      const uploadThumbnail = await cloudinary.uploader.upload(
        thumbnail.tempFilePath,
        {
          resource_type: "image",
          folder: "thumbnail",
          public_id: `${title}-thumbnail`,
        }
      );
      const uploadVideo = await cloudinary.uploader.upload(video.tempFilePath, {
        resource_type: "video",
        folder: "video",
        public_id: `${title}-video`,
      });
      const videoData = await Video.create({
        title,
        description,
        videoUrl: uploadVideo.secure_url,
        thumbnailUrl: uploadThumbnail.secure_url,
      });
      if (!videoData) {
        return res
          .status(400)
          .json({ message: "Error uploading video in database" });
      }
      return res
        .status(200)
        .json({ message: "Video uploaded successfully", videoData });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Error uploading video" });
    }
  },
  videoList: async (req, res) => {
    try {
      const videoData = await Video.find();
      if (!videoData) {
        return res
          .status(400)
          .json({ message: "Error fetch video in database" });
      }
      return res
        .status(200)
        .json({ message: "Video fetch successfully", videoData });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Error fetch video" });
    }
  },
};
