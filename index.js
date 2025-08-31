const express = require("express");
const mongoose = require("mongoose");
const teamRoutes = require("./routes/team.route.js");
const path = require("path");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(cors()); // allow all origins (can be restricted later)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ API Routes
app.use("/api/teams", teamRoutes);

// ✅ Serve static frontend (make sure "frontend" folder has index.html, style.css, etc.)
app.use(express.static(path.join(__dirname, "frontend")));

// ✅ Fallback: send index.html only for non-API routes
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// ✅ Connect to MongoDB & Start Server
mongoose
  .connect(
    "mongodb+srv://admin:"
  )
  .then(() => {
    console.log("✅ Connected to database");
    const PORT = process.env.PORT || 3000; // use PORT from env in production
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
  });
