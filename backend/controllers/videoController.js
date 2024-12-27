module.exports = {
  uploadVideo: async (req, res) => {
    try {
      const { title, description, videoUrl, thumbnailUrl } = req.body;
    } catch (error) {
      res.status(500).json({ message: "Error uploading video" });
    }
  },
};
