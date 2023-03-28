import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import ConnectDB from './backend/config/db.js';
import userRoutes from "./backend/routes/userRoutes.js";
import bookingRoutes from "./backend/routes/bookingRoutes.js";
import  cors from 'cors';
dotenv.config();
ConnectDB();


const app = express();
app.use(cors())
app.use(express.json())

// app.listen(5000, console.log("server"));

// app.get("/", (req, res) => {
//   res.send("pi running");
// });


app.use("/api/users",userRoutes);
app.use("/api/booking", bookingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `server running ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .yellow.bold
  )
);

