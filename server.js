require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const connection = require("./db");

// Database connection
connection();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Server started at port ${port}`));
