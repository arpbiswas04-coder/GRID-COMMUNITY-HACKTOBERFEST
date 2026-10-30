// ==========================================================================
// TYPE.E — TYPING ENGINE (typing-engine.js)
// Robust single-source-of-truth typing processor & passage library
// ==========================================================================

const PASSAGES = {
  easy: [
    "The yellow race car accelerated down the straight track under the bright afternoon sun.",
    "Fast drivers know that smooth steering is the secret to winning every single race.",
    "He shifted into third gear and passed the red truck right before the final turn.",
    "Green lights flashed on the starting grid as all the engines roared with power.",
    "Clean tires and quick reflexes will give any driver the lead in a fast sprint.",
    "The pit crew changed four fresh tires in less than three seconds flat.",
    "Drive with speed and focus on the road ahead to set a new personal record.",
    "Every lap requires precision and rhythm as you master the turns of the course.",
    "The racing line is the fastest path around the track from start to finish.",
    "Push the pedal to the metal and feel the rush as you cross the checkered flag."
  ],
  medium: [
    "Precision racing isn't just about raw horsepower; it demands meticulous aerodynamic balance, sharp braking points, and steady nerves.",
    "Formula racing engineers analyze telemetry data at 120 Hz, measuring throttle input, tire temperatures, and downforce across every sector.",
    "As the rain started falling on lap 42, the crew chief ordered a switch to intermediate tires, predicting that track grip would drop significantly.",
    "The twin-turbocharged V8 engine produced over 750 brake horsepower, launching the lightweight carbon-fiber chassis from zero to sixty in 2.6 seconds.",
    "Navigating the legendary Monaco hairpin requires surgical throttle modulation; one millisecond of hesitation can cost a podium finish.",
    "Night racing at Le Mans tests human endurance to the absolute limit, with drivers hitting 330 km/h down the Mulsanne straight in pitch darkness.",
    "Brake bias was adjusted two percent forward before turn four, ensuring optimal stability as the brakes glowed bright orange under heavy deceleration.",
    "Modern kinetic energy recovery systems harvest up to 400 kilojoules per lap, deploying electrical boost whenever the driver initiates an overtaking maneuver."
  ],
  hard: [
    "Telemetry packet #894-B confirmed: aerodynamic drag coefficient (Cd) stabilized at 0.312, while the multi-link suspension dissipated 4.8 kN of lateral oscillation!",
    "Modern powertrain diagnostics execute real-time PID controllers; specifically, pulse-width modulation regulates fuel-rail pressure between 150–220 bar under extreme G-loads.",
    "The titanium-aluminide turbine spool spun at 145,000 RPM; meanwhile, variable-geometry vanes modulated exhaust gas backpressure to prevent compressor surge.",
    "Vectoring differentials distribute torque dynamically (e.g., 65% rear-biased on apex exit), mitigating snap-oversteer through closed-loop yaw-rate feedback.",
    "Computational fluid dynamics [CFD] simulations revealed turbulent vortices detaching from the front wing endplates at speeds exceeding 295 km/h (183.3 mph).",
    "Brembo carbon-ceramic brake rotors operate reliably at 950°C; however, rapid thermal cycling induces micro-fractures if cooling ducts suffer partial aerodynamic blockage."
  ]
};

class TypingEngine {
  constructor() {
    this.status = "READY"; // 'READY' | 'RUNNING' | 'FINISHED'
    this.passageText = "";
    this.chars = [];
    this.currentIndex = 0;
    this.startTime = null;
    this.timerId = null;
    this.timeRemaining = 60;
    this.totalDuration = 60;
    this.correctChars = 0;
    this.incorrectChars = 0;
    this.totalAttempted = 0;
    this.liveWPM = 0;
    this.liveAccuracy = 100;
    this.recordedTimeline = [];
    this.inputEl = null;
    this.displayEl = null;
    this.lastInputLength = 0;
  }

  init(inputSelector = "#typing-input", displaySelector = "#passage-display") {
    this.inputEl = document.querySelector(inputSelector);
    this.displayEl = document.querySelector(displaySelector);

    if (this.inputEl) {
      this.inputEl.value = "";
      this.inputEl.oninput = (e) => this.handleSingleSourceInput(e);
      this.inputEl.onkeydown = (e) => this.handleAuxiliaryKeyDown(e);
      this.inputEl.onkeyup = (e) => this.handleAuxiliaryKeyUp(e);
    }

    if (this.displayEl) {
      this.displayEl.onclick = () => {
        if (this.inputEl) this.inputEl.focus();
      };
    }
  }

  setupTest(customText = null) {
    this.stopTimer();
    const state = window.TypeEStorage.get();
    this.status = "READY";
    this.totalDuration = state.duration || 60;
    this.timeRemaining = this.totalDuration;
    this.startTime = null;
    this.recordedTimeline = [];
    this.correctChars = 0;
    this.incorrectChars = 0;
    this.totalAttempted = 0;
    this.liveWPM = 0;
    this.liveAccuracy = 100;
    this.lastInputLength = 0;

    // Choice logic: Default prompts always pick predefined; Custom text picks custom
    if (customText) {
      this.passageText = customText.trim();
    } else if (state.promptChoice === "custom" && state.customPassage && state.customPassage.trim().length > 0) {
      this.passageText = state.customPassage.trim();
    } else {
      const diffKey = state.difficulty === "custom" ? "medium" : state.difficulty;
      const pool = PASSAGES[diffKey] || PASSAGES.medium;
      this.passageText = pool[Math.floor(Math.random() * pool.length)];
    }

    this.chars = this.passageText.split("");
    this.currentIndex = 0;

    if (this.inputEl) {
      this.inputEl.value = "";
      this.inputEl.disabled = false;
      this.inputEl.focus();
    }

    this.renderPassageSpans();
    this.updateTelemetryUI();
    this.updateStatusUI("READY");
    if (window.TypeERace) {
      window.TypeERace.resetRace();
    }
  }

  renderPassageSpans() {
    if (!this.displayEl) return;
    this.displayEl.innerHTML = "";
    const frag = document.createDocumentFragment();

    for (let i = 0; i < this.chars.length; i++) {
      const span = document.createElement("span");
      span.className = "char";
      span.id = `char-${i}`;
      span.textContent = this.chars[i];
      if (i === 0) span.classList.add("char-current");
      frag.appendChild(span);
    }

    this.displayEl.appendChild(frag);
    this.updateProgressBar(0);
  }

  handleSingleSourceInput(e) {
    if (this.status === "FINISHED") {
      this.inputEl.value = this.inputEl.value.slice(0, this.chars.length);
      return;
    }

    const currentVal = this.inputEl.value;
    const currentLen = currentVal.length;

    // Start timer on first keystroke
    if (this.status === "READY" && currentLen > 0) {
      this.startTest();
    }

    // Process new keystrokes vs backspace
    const diff = currentLen - this.lastInputLength;
    if (diff > 0) {
      for (let i = this.lastInputLength; i < currentLen && i < this.chars.length; i++) {
        const typedChar = currentVal[i];
        const expectedChar = this.chars[i];
        const isMatch = (typedChar === expectedChar);

        this.totalAttempted++;
        const targetKey = expectedChar.toLowerCase();

        if (isMatch) {
          this.correctChars++;
          this.trackKey(targetKey, true);
          if (window.TypeESettings) window.TypeESettings.synth.playKey(true);
        } else {
          this.incorrectChars++;
          this.trackKey(targetKey, false);
          if (window.TypeESettings) window.TypeESettings.synth.playKey(false);
        }
      }
    } else if (diff < 0) {
      this.recalculateAccurateCounts(currentVal);
    }

    this.lastInputLength = currentLen;
    this.currentIndex = Math.min(currentLen, this.chars.length);

    this.updateHighlights(currentVal);
    this.calcStats();
    this.updateTelemetryUI();
    this.sampleRaceProgress();

    // Check completion
    if (currentLen >= this.chars.length) {
      this.completeTest();
    }
  }

  recalculateAccurateCounts(currentVal) {
    let correct = 0;
    let incorrect = 0;
    for (let i = 0; i < currentVal.length && i < this.chars.length; i++) {
      if (currentVal[i] === this.chars[i]) {
        correct++;
      } else {
        incorrect++;
      }
    }
    this.correctChars = correct;
    this.incorrectChars = incorrect;
  }

  updateHighlights(currentVal) {
    if (!this.displayEl) return;
    const spans = this.displayEl.children;
    if (!spans || spans.length === 0) return;

    for (let i = 0; i < spans.length; i++) {
      const span = spans[i];
      span.className = "char";

      if (i < currentVal.length) {
        if (currentVal[i] === this.chars[i]) {
          span.classList.add("char-correct");
          if (this.chars[i] === " ") span.textContent = " ";
        } else {
          if (this.chars[i] === " ") {
            span.classList.add("char-space-incorrect");
            span.textContent = "␣";
          } else {
            span.classList.add("char-incorrect");
          }
        }
      } else if (i === currentVal.length) {
        span.classList.add("char-current");
        if (this.chars[i] === " ") span.textContent = " ";
      } else {
        if (this.chars[i] === " ") span.textContent = " ";
      }
    }

    const active = spans[currentVal.length];
    if (active) {
      active.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }

    const pct = Math.min(100, Math.round((currentVal.length / this.chars.length) * 100));
    this.updateProgressBar(pct);
  }

  updateProgressBar(pct) {
    const bar = document.querySelector("#passage-progress-fill");
    const label = document.querySelector("#passage-progress-text");
    if (bar) bar.style.width = `${pct}%`;
    if (label) label.textContent = `${pct}% (${this.currentIndex}/${this.chars.length})`;
  }

  handleAuxiliaryKeyDown(e) {
    if (window.TypeEKeyboard) {
      window.TypeEKeyboard.highlightKey(e.key, true);
    }
  }

  handleAuxiliaryKeyUp(e) {
    if (window.TypeEKeyboard) {
      window.TypeEKeyboard.highlightKey(e.key, false);
    }
  }

  insertCharFromVirtualKey(char) {
    if (!this.inputEl || this.status === "FINISHED") return;
    this.inputEl.focus();

    if (char === "Backspace") {
      this.inputEl.value = this.inputEl.value.slice(0, -1);
    } else if (char === "Space") {
      this.inputEl.value += " ";
    } else if (char.length === 1) {
      this.inputEl.value += char;
    }

    this.inputEl.dispatchEvent(new Event("input", { bubbles: true }));
  }

  trackKey(key, isCorrect) {
    const state = window.TypeEStorage.get();
    if (!state.keyStatistics[key]) {
      state.keyStatistics[key] = { attempts: 0, errors: 0 };
    }
    state.keyStatistics[key].attempts++;
    if (!isCorrect) {
      state.keyStatistics[key].errors++;
    }
    window.TypeEStorage.save();
    if (window.TypeEKeyboard) {
      window.TypeEKeyboard.updateKeyHeatmap(key);
    }
  }

  startTest() {
    this.status = "RUNNING";
    this.startTime = Date.now();
    this.updateStatusUI("RUNNING");
    if (window.TypeESettings) window.TypeESettings.synth.playCountdown(true);

    this.stopTimer();
    this.sampleRaceProgress();

    this.timerId = setInterval(() => {
      this.timeRemaining--;
      this.calcStats();
      this.updateTelemetryUI();
      this.sampleRaceProgress();

      if (this.timeRemaining <= 0) {
        this.completeTest();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  calcStats() {
    const elapsedMs = this.startTime ? (Date.now() - this.startTime) : 0;
    const elapsedMins = Math.max(0.001, elapsedMs / 60000);
    this.liveWPM = Math.round((this.correctChars / 5) / elapsedMins);

    if (this.totalAttempted > 0) {
      this.liveAccuracy = Math.round((this.correctChars / this.totalAttempted) * 1000) / 10;
    } else {
      this.liveAccuracy = 100;
    }
  }

  sampleRaceProgress() {
    if (!this.startTime) return;
    const elapsedSec = parseFloat(((Date.now() - this.startTime) / 1000).toFixed(2));
    const progress = parseFloat((this.currentIndex / Math.max(1, this.chars.length)).toFixed(3));

    this.recordedTimeline.push({
      time: elapsedSec,
      progress: Math.min(1, progress),
      wpm: this.liveWPM
    });

    if (window.TypeERace) {
      window.TypeERace.updateLiveRace(progress, this.liveWPM, elapsedSec);
    }
  }

  completeTest() {
    this.stopTimer();
    this.status = "FINISHED";
    if (this.inputEl) this.inputEl.disabled = true;

    this.calcStats();
    this.updateStatusUI("FINISHED");
    this.updateTelemetryUI();
    this.sampleRaceProgress();

    if (window.TypeERace) {
      window.TypeERace.onRaceComplete(this.recordedTimeline, this.liveWPM, this.liveAccuracy, this.correctChars, this.incorrectChars, this.totalDuration - this.timeRemaining);
    }
  }

  updateTelemetryUI() {
    const setTxt = (id, val) => {
      const el = document.querySelector(id);
      if (el) el.textContent = val;
    };

    setTxt("#stat-wpm", this.liveWPM);
    setTxt("#stat-accuracy", `${this.liveAccuracy}%`);
    setTxt("#stat-timer", `${this.timeRemaining}s`);
    setTxt("#stat-total-chars", this.totalAttempted);
    setTxt("#stat-correct-chars", this.correctChars);
    setTxt("#stat-incorrect-chars", this.incorrectChars);
  }

  updateStatusUI(st) {
    const pill = document.querySelector("#test-status-pill");
    if (!pill) return;
    pill.className = "status-pill";
    if (st === "READY") {
      pill.classList.add("status-ready");
      pill.innerHTML = `🏁 READY TO RACE`;
    } else if (st === "RUNNING") {
      pill.classList.add("status-running");
      pill.innerHTML = `⚡ RACING LIVE`;
    } else if (st === "FINISHED") {
      pill.classList.add("status-finished");
      pill.innerHTML = `🏆 SPRINT FINISHED`;
    }
  }
}

window.TypeETyping = new TypingEngine();
