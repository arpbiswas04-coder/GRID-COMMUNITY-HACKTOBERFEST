// Typing Speed Trainer - Hack Day Haldia x GRID community starter. Build the core tasks from README.md.
const KEY = "hackday-haldia-team-zenith";
const $ = (sel) => document.querySelector(sel);

// App state - reshape it to fit your project.
let state = { items: [] };

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage blocked */ }
}

function load() {
  try { state = JSON.parse(localStorage.getItem(KEY)) || state; } catch (e) { /* ignore */ }
}

function render() {
  // TODO: draw your UI into #app
}

// ---- TODO(core): fill these in -------------------------------------------
// TODO(core): pick a prompt and start the timer
function startTest() {
}

// TODO(core): handle every keystroke
function onKeyInput() {
}

// TODO(core): WPM, accuracy, errors per key
function calcStats() {
}

// TODO(core): show the results screen
function renderResults() {
}

// TODO(core): draw the per-key error heatmap
function renderKeyHeatmap() {
}

// TODO(core): generate text that drills the weakest keys
function buildPracticeText() {
}


document.addEventListener("DOMContentLoaded", () => {
  load();
  $("#status").textContent = "script.js loaded.";
  render();
});
