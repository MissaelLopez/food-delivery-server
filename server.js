require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const connection = require("./db");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const restaurantRoutes = require("./routes/restaurant.routes");
const clientRoutes = require("./routes/client.routes");

// Database connection
connection();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/clients", clientRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Server started at port ${port}`));
