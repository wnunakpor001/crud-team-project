// ------ API Base URL ------
const API_BASE = "http://localhost:3000/api/teams";

// ------ DOM refs ------
const form = document.getElementById("teamForm");
const playersContainer = document.getElementById("playersContainer");
const addPlayerBtn = document.getElementById("addPlayerBtn");
const teamList = document.getElementById("teamList");
const submitBtn = form.querySelector("button[type='submit']");

let editingTeamId = null;
let cancelBtnEl = null; // dynamic cancel button

// ------ helpers ------
function setSubmitMode(mode) {
  if (mode === "edit") {
    submitBtn.textContent = "Update Team";
    if (!cancelBtnEl) {
      cancelBtnEl = document.createElement("button");
      cancelBtnEl.type = "button";
      cancelBtnEl.textContent = "Cancel";
      cancelBtnEl.className = "cancel-edit";
      cancelBtnEl.addEventListener("click", () => {
        editingTeamId = null;
        submitBtn.textContent = "Create Team";
        form.reset();
        playersContainer.innerHTML = "";
        addPlayerInput();
        cancelBtnEl.remove();
        cancelBtnEl = null;
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      submitBtn.insertAdjacentElement("afterend", cancelBtnEl);
    }
  } else {
    submitBtn.textContent = "Create Team";
    if (cancelBtnEl) {
      cancelBtnEl.remove();
      cancelBtnEl = null;
    }
  }
}

// add player row
function addPlayerInput(player = {}) {
  const div = document.createElement("div");
  div.classList.add("player-entry");
  div.innerHTML = `
    <input type="text" placeholder="Player Name" class="playerName" value="${player.playerName ?? ""}" required />
    <input type="number" placeholder="Jersey Number" class="jerseyNumber" value="${player.jerseyNumber ?? ""}" required />
    <select class="playerPosition" required>
      <option value="">Select Position</option>
      <option value="Goalkeeper" ${player.playerPosition === "Goalkeeper" ? "selected" : ""}>Goalkeeper</option>
      <option value="Defender" ${player.playerPosition === "Defender" ? "selected" : ""}>Defender</option>
      <option value="Midfielder" ${player.playerPosition === "Midfielder" ? "selected" : ""}>Midfielder</option>
      <option value="Attacker" ${player.playerPosition === "Attacker" ? "selected" : ""}>Attacker</option>
    </select>
    <button type="button" class="removeBtn">Remove</button>
  `;
  div.querySelector(".removeBtn").addEventListener("click", () => div.remove());
  playersContainer.appendChild(div);
}

// collect players
function collectPlayers() {
  return Array.from(playersContainer.querySelectorAll(".player-entry")).map(entry => ({
    playerName: entry.querySelector(".playerName").value.trim(),
    jerseyNumber: Number.parseInt(entry.querySelector(".jerseyNumber").value, 10),
    playerPosition: entry.querySelector(".playerPosition").value
  })).filter(p => p.playerName);
}

function getTeamPayload() {
  return {
    teamName: document.getElementById("teamName").value.trim(),
    president: document.getElementById("president").value.trim(),
    vicePresident: document.getElementById("vicePresident").value.trim(),
    sportingDirector: document.getElementById("sportingDirector").value.trim(),
    location: document.getElementById("location").value.trim(),
    yearFormed: Number.parseInt(document.getElementById("yearFormed").value, 10),
    stadium: document.getElementById("stadium").value.trim(),
    league: document.getElementById("league").value.trim(),
    headCoach: document.getElementById("headCoach").value.trim(),
    assistantCoach: document.getElementById("assistantCoach").value.trim(),
    goalkeeperCoach: document.getElementById("goalkeeperCoach").value.trim(),
    players: collectPlayers(),
  };
}

// ------ create first player row ------
if (!playersContainer.querySelector(".player-entry")) addPlayerInput();

// ------ add player row button ------
addPlayerBtn.addEventListener("click", () => addPlayerInput());

// ------ submit (create/update) ------
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const teamData = getTeamPayload();

    const url = editingTeamId ? `${API_BASE}/${editingTeamId}` : API_BASE;
    const method = editingTeamId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(teamData),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Request failed with ${res.status}`);
    }

    editingTeamId = null;
    setSubmitMode("create");
    form.reset();
    playersContainer.innerHTML = "";
    addPlayerInput();

    await loadTeams();
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  } catch (err) {
    console.error(err);
    alert(`Save failed: ${err.message}`);
  }
});

// ------ render ------
function renderTeam(team) {
  const card = document.createElement("div");
  card.classList.add("team");

  card.innerHTML = `
    <h3>${team.teamName}</h3>
    <p><strong>President:</strong> ${team.president || "-"}</p>
    <p><strong>Vice-President:</strong> ${team.vicePresident || "-"}</p>
    <p><strong>Sporting Director:</strong> ${team.sportingDirector || "-"}</p>
    <p><strong>Location:</strong> ${team.location || "-"}</p>
    <p><strong>Year Formed:</strong> ${team.yearFormed || "-"}</p>
    <p><strong>Stadium:</strong> ${team.stadium || "-"}</p>
    <p><strong>League:</strong> ${team.league || "-"}</p>

    <h4>Coaching Staffs</h4>
    <p><strong>Head Coach:</strong> ${team.headCoach || "-"}</p>
    <p><strong>Assistant Coach:</strong> ${team.assistantCoach || "-"}</p>
    <p><strong>Goalkeeper Coach:</strong> ${team.goalkeeperCoach || "-"}</p>

    <h4>Players</h4>
    <ul>
      ${(team.players || []).map(p => `<li>${p.playerName} (#${p.jerseyNumber}) - ${p.playerPosition || "-"}</li>`).join("")}
    </ul>

    <div class="actions">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  // edit
  card.querySelector(".edit-btn").addEventListener("click", () => {
    editingTeamId = team._id;
    setSubmitMode("edit");

    document.getElementById("teamName").value = team.teamName || "";
    document.getElementById("president").value = team.president || "";
    document.getElementById("vicePresident").value = team.vicePresident || "";
    document.getElementById("sportingDirector").value = team.sportingDirector || "";
    document.getElementById("location").value = team.location || "";
    document.getElementById("yearFormed").value = team.yearFormed || "";
    document.getElementById("stadium").value = team.stadium || "";
    document.getElementById("league").value = team.league || "";
    document.getElementById("headCoach").value = team.headCoach || "";
    document.getElementById("assistantCoach").value = team.assistantCoach || "";
    document.getElementById("goalkeeperCoach").value = team.goalkeeperCoach || "";

    playersContainer.innerHTML = "";
    (team.players || []).forEach(p => addPlayerInput(p));
    if (!(team.players || []).length) addPlayerInput();

    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // delete
  card.querySelector(".delete-btn").addEventListener("click", async () => {
    if (!confirm(`Delete team "${team.teamName}"?`)) return;
    try {
      const res = await fetch(`${API_BASE}/${team._id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Delete failed (${res.status})`);
      await loadTeams();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  });

  teamList.appendChild(card);
}

// ------ fetch + list ------
async function loadTeams() {
  teamList.innerHTML = "";
  try {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error(`Load failed (${res.status})`);
    const teams = await res.json();

    if (!Array.isArray(teams) || teams.length === 0) {
      teamList.innerHTML = `<p>No teams yet. Create one above.</p>`;
      return;
    }

    teams.forEach(renderTeam);
  } catch (err) {
    console.error(err);
    teamList.innerHTML = `<p style="color:red">Could not load teams: ${err.message}</p>`;
  }
}

// ------ init ------
loadTeams();
