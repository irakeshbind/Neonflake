const express = require("express");
const { connection } = require("./config");
const videoRoute = require("./Routes/videoRoute");
const fileUpload = require("express-fileupload");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
app.use(express.json());
app.use("/api", videoRoute);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
connection();
app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
