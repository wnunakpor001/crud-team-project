const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  playerName: { type: String, required: true },
  jerseyNumber: { type: Number, required: true },
  playerPosition: { type: String, required: true, enum: ["Goalkeeper", "Defender", "Midfielder", "Attacker"] }
});

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  president: { type: String, required: true },
  vicePresident: { type: String, required: true },
  sportingDirector: { type: String, required: true },
  location: { type: String, required: true },
  yearFormed: { type: Number, required: true },
  stadium: { type: String, required: true },
  league: { type: String, required: true },

  // coaching staff
  headCoach: { type: String, required: true },
  assistantCoach: { type: String },
  goalkeeperCoach: { type: String },

  // multiple players in one team
  players: [playerSchema],
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
