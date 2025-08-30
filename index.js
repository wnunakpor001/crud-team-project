const express = require("express");
const mongoose = require("mongoose");
const Team = require("./models/team.model.js");
const teamRoutes = require("./routes/team.route.js");
const app = express();

const cors = require("cors");
app.use(cors());



// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("frontend"));

// routes
app.use("/api/teams", teamRoutes);

const path = require("path");

// ...

// Serve index.html on root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});


mongoose
  .connect(
    "mongodb+srv://wisdomnunakpor:B1TORmAMjVG6rRGP@backenddb.auiljtk.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("Connected to database");
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
