const express = require("express");
const Team = require("../models/team.model.js");
const router = express.Router();
const {
  getTeams,
  getTeam,
} = require("../controllers/team.controller.js");
const {
  createTeam,
  updateTeam,
  deleteTeam,
} = require("../controllers/team.controller.js");

// controller function

router.get("/", getTeams);
router.get("/:id", getTeam);

router.post("/", createTeam);

// update a product
router.put("/:id", updateTeam);

// delete a product
router.delete("/:id", deleteTeam);

module.exports = router;
