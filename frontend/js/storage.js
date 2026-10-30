// ==========================================================================
// TYPE.E — STORAGE & STATE MANAGEMENT (storage.js)
// Centralized, migration-safe LocalStorage data layer
// ==========================================================================

const STORAGE_KEY = "hackday-haldia-team-zenith";

const DEFAULT_STATE = {
  version: "4.1.0",
  soundEnabled: false,        // Default disabled
  keyboardLayout: "qwerty",   // 'qwerty' | 'dvorak' | 'colemak'
  difficulty: "medium",       // 'easy' | 'medium' | 'hard' | 'custom'
  duration: 60,               // 30 | 60 | 120
  promptChoice: "default",    // 'default' | 'custom' (independent of difficulty)
  customPassage: "",
  bestGhostRace: null,        // Overall personal best ghost
  ghostRecords: {             // Independent ghost PB timelines by race duration
    "30": null,
    "60": null,
    "120": null
  },
  personalBests: {
    highestWPM: 0,
    bestAccuracy: 0,
    best30s: 0,
    best60s: 0,
    best120s: 0,
    totalTests: 0,
    totalCharsTyped: 0
  },
  keyStatistics: {},          // { 'a': { attempts: N, errors: E }, ... }
  testHistory: [],            // Completed sprint records
  practiceHistory: [],        // Dedicated practice session records

  // Dedicated Programming Mode State (Completely isolated from Normal typing records)
  programmingLanguage: "javascript",   // 'javascript' | 'python' | 'c' | 'cpp' | 'html' | 'css' | 'sql' | 'random'
  programmingDifficulty: "intermediate", // 'beginner' | 'intermediate' | 'advanced'
  programmingGhostRecords: {           // Independent programming ghost PB timelines by race duration
    "30": null,
    "60": null,
    "120": null
  },
  programmingPersonalBests: {
    highestWPM: 0,
    bestAccuracy: 0,
    best30s: 0,
    best60s: 0,
    best120s: 0,
    totalTests: 0,
    totalCharsTyped: 0
  },
  programmingHistory: []               // Dedicated programming sprint history
};

let appState = JSON.parse(JSON.stringify(DEFAULT_STATE));

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      appState = { ...DEFAULT_STATE, ...parsed };
      appState.personalBests = { ...DEFAULT_STATE.personalBests, ...(parsed.personalBests || {}) };
      appState.keyStatistics = parsed.keyStatistics || {};
      appState.testHistory = Array.isArray(parsed.testHistory) ? parsed.testHistory : [];
      appState.practiceHistory = Array.isArray(parsed.practiceHistory) ? parsed.practiceHistory : [];
      appState.ghostRecords = parsed.ghostRecords || { "30": null, "60": null, "120": null };

      // Programming state migration & safe defaults
      appState.programmingLanguage = parsed.programmingLanguage || "javascript";
      appState.programmingDifficulty = parsed.programmingDifficulty || "intermediate";
      appState.programmingGhostRecords = parsed.programmingGhostRecords || { "30": null, "60": null, "120": null };
      appState.programmingPersonalBests = { ...DEFAULT_STATE.programmingPersonalBests, ...(parsed.programmingPersonalBests || {}) };
      appState.programmingHistory = Array.isArray(parsed.programmingHistory) ? parsed.programmingHistory : [];

      ["30", "60", "120"].forEach(d => {
        if (appState.programmingGhostRecords[d] === undefined) {
          appState.programmingGhostRecords[d] = null;
        }
      });

      // Migration: migrate legacy bestGhostRace or previousSessionRace into duration-specific ghostRecords
      if (parsed.bestGhostRace && parsed.bestGhostRace.timeline && parsed.bestGhostRace.timeline.length > 0) {
        appState.bestGhostRace = parsed.bestGhostRace;
        const dur = String(parsed.bestGhostRace.duration || 60);
        if (!appState.ghostRecords[dur]) {
          appState.ghostRecords[dur] = parsed.bestGhostRace;
        }
      } else if (parsed.previousSessionRace && parsed.previousSessionRace.timeline && parsed.previousSessionRace.timeline.length > 0) {
        appState.bestGhostRace = parsed.previousSessionRace;
        const dur = String(parsed.previousSessionRace.duration || 60);
        if (!appState.ghostRecords[dur]) {
          appState.ghostRecords[dur] = parsed.previousSessionRace;
        }
      } else if (parsed.bestRaceTimelines) {
        ["30", "60", "120"].forEach(d => {
          if (parsed.bestRaceTimelines[d] && parsed.bestRaceTimelines[d].timeline) {
            appState.ghostRecords[d] = parsed.bestRaceTimelines[d];
          }
        });
        if (!appState.bestGhostRace && appState.ghostRecords["60"]) {
          appState.bestGhostRace = appState.ghostRecords["60"];
        }
      }

      // Ensure ghostRecords object has all keys
      ["30", "60", "120"].forEach(d => {
        if (appState.ghostRecords[d] === undefined) {
          appState.ghostRecords[d] = null;
        }
      });
    } else {
      appState = JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
  } catch (e) {
    console.warn("Storage load error, falling back to defaults:", e);
    appState = JSON.parse(JSON.stringify(DEFAULT_STATE));
  }
  return appState;
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch (e) {
    console.warn("Storage save failed or quota exceeded:", e);
  }
}

function getState() {
  return appState;
}

function updateState(updates) {
  Object.assign(appState, updates);
  saveState();
  return appState;
}

function getGhostForDuration(duration) {
  const d = String(duration || 60);
  if (appState.ghostRecords && appState.ghostRecords[d]) {
    return appState.ghostRecords[d];
  }
  if (appState.bestGhostRace && String(appState.bestGhostRace.duration) === d) {
    return appState.bestGhostRace;
  }
  return null;
}

function saveGhostForDuration(duration, ghostData) {
  const d = String(duration || 60);
  if (!appState.ghostRecords) {
    appState.ghostRecords = { "30": null, "60": null, "120": null };
  }
  appState.ghostRecords[d] = ghostData;

  // Also update overall bestGhostRace if this run is faster or if none exists
  if (!appState.bestGhostRace || (ghostData.wpm && ghostData.wpm >= (appState.bestGhostRace.wpm || 0))) {
    appState.bestGhostRace = ghostData;
  }

  saveState();
}

function savePracticeRecord(record) {
  if (!Array.isArray(appState.practiceHistory)) {
    appState.practiceHistory = [];
  }
  appState.practiceHistory.unshift(record);
  if (appState.practiceHistory.length > 50) {
    appState.practiceHistory.pop();
  }
  saveState();
}

// --------------------------------------------------------------------------
// DEDICATED PROGRAMMING GHOST & RECORD ISOLATION
// --------------------------------------------------------------------------
function getProgrammingGhostForDuration(duration) {
  const d = String(duration || 60);
  if (appState.programmingGhostRecords && appState.programmingGhostRecords[d]) {
    return appState.programmingGhostRecords[d];
  }
  return null;
}

function saveProgrammingGhostForDuration(duration, ghostData) {
  const d = String(duration || 60);
  if (!appState.programmingGhostRecords) {
    appState.programmingGhostRecords = { "30": null, "60": null, "120": null };
  }
  appState.programmingGhostRecords[d] = ghostData;
  saveState();
}

function saveProgrammingRecord(record) {
  if (!Array.isArray(appState.programmingHistory)) {
    appState.programmingHistory = [];
  }
  appState.programmingHistory.unshift(record);
  if (appState.programmingHistory.length > 60) {
    appState.programmingHistory.pop();
  }
  saveState();
}

// Global accessor
window.TypeEStorage = {
  get: getState,
  load: loadState,
  save: saveState,
  update: updateState,
  getGhostForDuration,
  saveGhostForDuration,
  savePracticeRecord,
  getProgrammingGhostForDuration,
  saveProgrammingGhostForDuration,
  saveProgrammingRecord
};

