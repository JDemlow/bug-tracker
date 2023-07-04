require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000; // Choose a port for your server

const ticketRoutes = require("./routes/tickets");

const session = require("express-session");
const passport = require("passport");

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Use ticket routes
app.use("/api/tickets", ticketRoutes);
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

// Enable user authentication
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
