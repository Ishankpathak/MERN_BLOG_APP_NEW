const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

//dotenv
dotenv.config();

//router import
const userRoutes = require("./routes/userRoutes.js");
const blogRoutes = require("./routes/blogRoutes.js");

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);
//routes
// app.get("/", (req, res) => {
//   res.status(200).send({
//     message: "Node server",
//   });
// });

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//PORT
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} ${PORT}`.bgCyan.white);
});
