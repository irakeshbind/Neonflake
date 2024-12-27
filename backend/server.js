const express = require("express");
const { connection } = require("./config");
const app = express();


connection()
app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
