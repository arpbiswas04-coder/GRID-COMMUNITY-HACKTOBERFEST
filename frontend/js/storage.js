// ==========================================================================
// TYPE.E — STORAGE & STATE MANAGEMENT (storage.js)
// Centralized, migration-safe LocalStorage data layer
// ==========================================================================

const STORAGE_KEY = "hackday-haldia-team-zenith";

const DEFAULT_STATE = {
  version: "3.0.0",
  theme: "neo-yellow",        // 'neo-yellow' | 'dark-arcade' | 'light-minimal'
  soundEnabled: false,        // Default disabled
  keyboardLayout: "qwerty",   // 'qwerty' | 'dvorak' | 'colemak'
  difficulty: "medium",       // 'easy' | 'medium' | 'hard' | 'custom'
  duration: 60,               // 30 | 60 | 120
  promptChoice: "default",    // 'default' | 'custom'
  customPassage: "",
  previousSessionRace: null,  // { timeline: [{time, progress, wpm}], wpm: N, duration: D, date: "..." }
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
  practiceHistory: []
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
      
      // Preserve or migrate previous session race
      if (parsed.previousSessionRace && parsed.previousSessionRace.timeline) {
        appState.previousSessionRace = parsed.previousSessionRace;
      } else if (parsed.bestRaceTimelines && (parsed.bestRaceTimelines["60"] || parsed.bestRaceTimelines["30"])) {
        const legacy = parsed.bestRaceTimelines["60"] || parsed.bestRaceTimelines["30"] || parsed.bestRaceTimelines["120"];
        if (legacy && legacy.timeline) {
          appState.previousSessionRace = {
            timeline: legacy.timeline,
            wpm: legacy.wpm || 0,
            duration: legacy.duration || 60,
            date: legacy.date || new Date().toISOString()
          };
        }
      }
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

// Global accessor for starter compatibility
window.TypeEStorage = {
  get: getState,
  load: loadState,
  save: saveState,
  update: updateState
};
