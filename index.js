import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import ConnectDB from './backend/config/db.js';

dotenv.config();
ConnectDB();


const app = express();


// app.listen(5000, console.log("server"));

// app.get("/", (req, res) => {
//   res.send("pi running");
// });

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `server running ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .yellow.bold
  )
);

