const express = require("express");
const { connection } = require("./config");
const videoRoute = require("./Routes/videoRoute");
const fileUpload = require("express-fileupload");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();

app.use(bodyParser.json());
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
app.use(
  cors({
    origin: ["http://localhost:5173", "*"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Application/json"],
    credentials: true,
  })
);
app.options("*", cors());
connection();
app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
