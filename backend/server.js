const express = require("express");
const { connection } = require("./config");
const videoRoute = require("./Routes/videoRoute");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api", videoRoute);
connection();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
