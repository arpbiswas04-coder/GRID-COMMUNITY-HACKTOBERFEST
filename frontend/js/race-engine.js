// ==========================================================================
// TYPE.E — RACING ENGINE & SVG CURVED CIRCUIT (race-engine.js)
// Immersive winding Grand-Prix circuit with mathematically accurate path tracking
// ==========================================================================

class RaceEngine {
  constructor() {
    this.svg = null;
    this.trackPath = null;
    this.totalLength = 0;
    this.playerCarEl = null;
    this.ghostCarEl = null;
    this.playerBadgeEl = null;
    this.ghostBadgeEl = null;
    this.animId = null;

    this.playerProgress = 0;
    this.playerWPM = 0;
    this.ghostProgress = 0;
    this.ghostWPM = 0;
    this.hasGhost = false;
    this.ghostTimeline = null;
    this.elapsedSeconds = 0;
  }

  init(svgSelector = "#racing-circuit-svg") {
    this.svg = document.querySelector(svgSelector);
    if (!this.svg) return;

    this.trackPath = this.svg.querySelector("#race-track-path");
    if (this.trackPath) {
      this.totalLength = this.trackPath.getTotalLength();
    }

    this.playerCarEl = this.svg.querySelector("#player-car-group");
    this.ghostCarEl = this.svg.querySelector("#ghost-car-group");
    this.playerBadgeEl = this.svg.querySelector("#player-car-badge");
    this.ghostBadgeEl = this.svg.querySelector("#ghost-car-badge");

    this.loadGhostSession();
    this.startRenderLoop();
  }

  loadGhostSession() {
    const state = window.TypeEStorage.get();
    const ghostRecord = state.bestGhostRace;

    if (ghostRecord && ghostRecord.timeline && ghostRecord.timeline.length > 0) {
      this.hasGhost = true;
      this.ghostTimeline = ghostRecord.timeline;
      this.ghostWPM = ghostRecord.wpm || 0;
      if (this.ghostCarEl) this.ghostCarEl.style.display = "block";
    } else {
      this.hasGhost = false;
      this.ghostTimeline = null;
      this.ghostWPM = 0;
      if (this.ghostCarEl) this.ghostCarEl.style.display = "none";
    }

    this.updateTelemetryBars();
    this.updateDeltaIndicator();
  }

  resetRace() {
    this.playerProgress = 0;
    this.playerWPM = 0;
    this.ghostProgress = 0;
    this.elapsedSeconds = 0;
    this.loadGhostSession();
    this.positionCars();
    this.updateTelemetryBars();
  }

  updateLiveRace(progress, wpm, elapsedSec) {
    this.playerProgress = Math.min(1, Math.max(0, progress));
    this.playerWPM = wpm;
    this.elapsedSeconds = elapsedSec;

    // Interpolate ghost performance from personal best timeline
    if (this.hasGhost && this.ghostTimeline) {
      const g = this.interpolateGhost(elapsedSec);
      this.ghostProgress = g.progress;
      this.ghostWPM = g.wpm;
    } else {
      this.ghostProgress = 0;
      this.ghostWPM = 0;
    }

    this.positionCars();
    this.updateTelemetryBars();
    this.updateDeltaIndicator();
  }

  interpolateGhost(t) {
    const tl = this.ghostTimeline;
    if (!tl || tl.length === 0) return { progress: 0, wpm: 0 };

    if (t >= tl[tl.length - 1].time) {
      const last = tl[tl.length - 1];
      return { progress: last.progress, wpm: last.wpm };
    }

    for (let i = 0; i < tl.length - 1; i++) {
      const s1 = tl[i];
      const s2 = tl[i + 1];
      if (t >= s1.time && t <= s2.time) {
        const span = s2.time - s1.time;
        const ratio = span > 0 ? (t - s1.time) / span : 0;
        const p = s1.progress + (s2.progress - s1.progress) * ratio;
        const w = Math.round(s1.wpm + (s2.wpm - s1.wpm) * ratio);
        return { progress: Math.min(1, Math.max(0, p)), wpm: w };
      }
    }

    return { progress: tl[0].progress, wpm: tl[0].wpm };
  }

  positionCars() {
    if (!this.trackPath || this.totalLength === 0) return;

    // 1. Calculate Player Car position and heading along curve
    const pDist = this.playerProgress * this.totalLength;
    const pPt = this.trackPath.getPointAtLength(pDist);
    const pPtAhead = this.trackPath.getPointAtLength(Math.min(this.totalLength, pDist + 4));
    const pAngle = Math.atan2(pPtAhead.y - pPt.y, pPtAhead.x - pPt.x) * (180 / Math.PI);

    // Lateral lane offset (perpendicular to heading)
    const pNormX = -Math.sin(pAngle * Math.PI / 180);
    const pNormY = Math.cos(pAngle * Math.PI / 180);
    const pOffset = this.hasGhost ? -10 : 0; // Inner lane if ghost is active

    const pX = pPt.x + (pNormX * pOffset);
    const pY = pPt.y + (pNormY * pOffset);

    if (this.playerCarEl) {
      this.playerCarEl.setAttribute("transform", `translate(${pX}, ${pY}) rotate(${pAngle})`);
    }

    // Update Player Car Badge text
    if (this.playerBadgeEl) {
      this.playerBadgeEl.textContent = `YOU: ${this.playerWPM} WPM`;
    }

    // 2. Position Ghost Car (Outer Lane) if available
    if (this.hasGhost && this.ghostCarEl) {
      const gDist = this.ghostProgress * this.totalLength;
      const gPt = this.trackPath.getPointAtLength(gDist);
      const gPtAhead = this.trackPath.getPointAtLength(Math.min(this.totalLength, gDist + 4));
      const gAngle = Math.atan2(gPtAhead.y - gPt.y, gPtAhead.x - gPt.x) * (180 / Math.PI);

      const gNormX = -Math.sin(gAngle * Math.PI / 180);
      const gNormY = Math.cos(gAngle * Math.PI / 180);
      const gOffset = 10; // Outer lane

      const gX = gPt.x + (gNormX * gOffset);
      const gY = gPt.y + (gNormY * gOffset);

      this.ghostCarEl.setAttribute("transform", `translate(${gX}, ${gY}) rotate(${gAngle})`);

      if (this.ghostBadgeEl) {
        this.ghostBadgeEl.textContent = `PB: ${this.ghostWPM} WPM`;
      }
    }
  }

  updateTelemetryBars() {
    const pProg = document.querySelector("#telemetry-player-progress");
    const pWpm = document.querySelector("#telemetry-player-wpm");
    const gProg = document.querySelector("#telemetry-ghost-progress");
    const gWpm = document.querySelector("#telemetry-ghost-wpm");
    const gBox = document.querySelector("#ghost-telemetry-box");

    if (pProg) pProg.textContent = `${Math.round(this.playerProgress * 100)}% Done`;
    if (pWpm) pWpm.textContent = `${this.playerWPM} WPM`;

    if (this.hasGhost) {
      if (gBox) gBox.style.display = "flex";
      if (gProg) gProg.textContent = `${Math.round(this.ghostProgress * 100)}% Done`;
      if (gWpm) gWpm.textContent = `${this.ghostWPM} WPM`;
    } else {
      if (gBox) gBox.style.display = "none";
    }
  }

  updateDeltaIndicator() {
    const badge = document.querySelector("#ahead-behind-indicator");
    if (!badge) return;

    if (!this.hasGhost) {
      badge.className = "delta-badge neutral";
      badge.innerHTML = `✨ FIRST CIRCUIT SPRINT (SETTING GHOST RECORD)`;
      return;
    }

    const diffProgress = this.playerProgress - this.ghostProgress;
    const diffWpm = this.playerWPM - this.ghostWPM;
    const meters = Math.round(Math.abs(diffProgress) * 500); // 500m Grand Prix track

    if (diffProgress > 0.015) {
      badge.className = "delta-badge ahead";
      badge.innerHTML = `⚡ LEADING BY +${meters}m (${diffWpm >= 0 ? '+' : ''}${diffWpm} WPM)`;
    } else if (diffProgress < -0.015) {
      badge.className = "delta-badge behind";
      badge.innerHTML = `⚠️ GHOST LEADING BY +${meters}m (${diffWpm >= 0 ? '+' : ''}${diffWpm} WPM)`;
    } else {
      badge.className = "delta-badge neutral";
      badge.innerHTML = `🏁 HEAD TO HEAD ON CIRCUIT`;
    }
  }

  startRenderLoop() {
    if (this.animId) cancelAnimationFrame(this.animId);
    const loop = () => {
      this.positionCars();
      this.animId = requestAnimationFrame(loop);
    };
    loop();
  }

  onRaceComplete(timeline, finalWPM, accuracy, correctChars, incorrectChars, elapsedSec) {
    const state = window.TypeEStorage.get();

    let playerWon = true;
    let message = "Circuit Sprint Complete!";
    let outcomeClass = "winner-player";

    if (!this.hasGhost) {
      message = "Initial Circuit Record Established!";
      outcomeClass = "winner-solo";
      // Save initial personal best ghost
      state.bestGhostRace = {
        timeline: timeline,
        wpm: finalWPM,
        duration: state.duration || 60,
        accuracy: accuracy,
        date: new Date().toISOString()
      };
    } else {
      if (this.playerProgress >= this.ghostProgress || finalWPM >= this.ghostWPM) {
        playerWon = true;
        outcomeClass = "winner-player";
        if (finalWPM > this.ghostWPM && accuracy >= 80) {
          message = "NEW PERSONAL RECORD! YOU DEFEATED THE GHOST!";
          // Update personal best ghost
          state.bestGhostRace = {
            timeline: timeline,
            wpm: finalWPM,
            duration: state.duration || 60,
            accuracy: accuracy,
            date: new Date().toISOString()
          };
        } else {
          message = "VICTORY! YOU CAME OUT AHEAD ON THE CIRCUIT!";
        }
      } else {
        playerWon = false;
        message = "GHOST HELD THE LEAD! KEEP TRAINING TO BEAT YOUR PB!";
        outcomeClass = "winner-ghost";
      }
    }

    // Update Personal Bests
    const pb = state.personalBests;
    if (finalWPM > pb.highestWPM) pb.highestWPM = finalWPM;
    if (accuracy > pb.bestAccuracy && finalWPM > 20) pb.bestAccuracy = accuracy;
    if (state.duration === 30 && finalWPM > pb.best30s) pb.best30s = finalWPM;
    if (state.duration === 60 && finalWPM > pb.best60s) pb.best60s = finalWPM;
    if (state.duration === 120 && finalWPM > pb.best120s) pb.best120s = finalWPM;
    pb.totalTests++;
    pb.totalCharsTyped += (correctChars + incorrectChars);

    // Save Sprint Archive Record
    state.testHistory.unshift({
      id: "TE-" + Date.now().toString(36),
      timestamp: Date.now(),
      dateStr: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      wpm: finalWPM,
      accuracy: accuracy,
      duration: state.duration,
      difficulty: state.difficulty,
      correctChars: correctChars,
      incorrectChars: incorrectChars,
      wonRace: playerWon
    });
    if (state.testHistory.length > 60) state.testHistory.pop();

    window.TypeEStorage.save();

    if (window.TypeESettings) {
      window.TypeESettings.synth.playFinish(playerWon);
    }

    this.showResultsModal(message, outcomeClass, finalWPM, accuracy, elapsedSec, correctChars, incorrectChars);
  }

  showResultsModal(message, outcomeClass, wpm, acc, time, correct, errors) {
    const banner = document.querySelector("#race-winner-banner");
    if (banner) {
      banner.className = `race-outcome-banner ${outcomeClass}`;
      banner.textContent = message;
    }

    const setTxt = (id, val) => {
      const el = document.querySelector(id);
      if (el) el.textContent = val;
    };

    setTxt("#modal-result-wpm", wpm);
    setTxt("#modal-result-acc", `${acc}%`);
    setTxt("#modal-result-time", `${time}s`);
    setTxt("#modal-result-correct", correct);
    setTxt("#modal-result-errors", errors);

    const modal = document.querySelector("#modal-results");
    if (modal) modal.classList.add("active");
  }
}

window.TypeERace = new RaceEngine();
