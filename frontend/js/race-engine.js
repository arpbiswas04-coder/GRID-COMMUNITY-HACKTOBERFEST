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
    const duration = state.duration || 60;
    const isProgramming = (state.difficulty === "programming");

    const ghostRecord = isProgramming
      ? window.TypeEStorage.getProgrammingGhostForDuration(duration)
      : window.TypeEStorage.getGhostForDuration(duration);

    if (ghostRecord && ghostRecord.timeline && ghostRecord.timeline.length > 0) {
      this.hasGhost = true;
      this.ghostTimeline = ghostRecord.timeline;
      this.ghostWPM = ghostRecord.wpm || 0;
      this.ghostDuration = ghostRecord.duration || duration;
      if (this.ghostCarEl) this.ghostCarEl.style.display = "block";
    } else {
      this.hasGhost = false;
      this.ghostTimeline = null;
      this.ghostWPM = 0;
      this.ghostDuration = duration;
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
    const duration = state.duration || 60;
    const isProgramming = (state.difficulty === "programming");

    const ghostRecord = isProgramming
      ? window.TypeEStorage.getProgrammingGhostForDuration(duration)
      : window.TypeEStorage.getGhostForDuration(duration);

    let playerWon = false;
    let message = "";
    let outcomeClass = "";

    // A. FIRST-EVER RACE (No previous ghost for this duration)
    if (!this.hasGhost || !ghostRecord) {
      playerWon = true; // Recorded as a successful benchmark run
      message = isProgramming
        ? "💻 FIRST PROGRAMMING SPRINT — GHOST RECORD ESTABLISHED!"
        : "🏁 FIRST SPRINT COMPLETE — GHOST RECORD ESTABLISHED!";
      outcomeClass = "winner-solo";

      // Save initial personal best ghost for this duration
      const ghostData = {
        timeline: timeline,
        wpm: finalWPM,
        duration: duration,
        accuracy: accuracy,
        progress: this.playerProgress,
        date: new Date().toISOString()
      };

      if (isProgramming) {
        window.TypeEStorage.saveProgrammingGhostForDuration(duration, ghostData);
      } else {
        window.TypeEStorage.saveGhostForDuration(duration, ghostData);
      }
    } else {
      // Comparison logic: Compare track progress and time outcomes consistently
      const progressDiff = this.playerProgress - this.ghostProgress;
      const bothCompleted = (this.playerProgress >= 0.999 && this.ghostProgress >= 0.999);

      // D. TIE CONDITION: Essentially identical progress (<= 0.5%) and WPM within 1
      const isTie = Math.abs(progressDiff) <= 0.005 && Math.abs(finalWPM - this.ghostWPM) <= 1;

      if (isTie) {
        playerWon = false;
        message = "🏁 DEAD HEAT! A GENUINE TIE ON THE CIRCUIT!";
        outcomeClass = "winner-tie";
      } else if (progressDiff > 0.008 || (bothCompleted && finalWPM > this.ghostWPM)) {
        // B. PLAYER BEATS THE GHOST: Player genuinely finished ahead on the circuit
        playerWon = true;
        outcomeClass = "winner-player";

        // Check if player established a genuine new Personal Best for this duration
        const isNewPB = (finalWPM > (ghostRecord.wpm || 0)) && (accuracy >= 80);

        if (isNewPB) {
          message = isProgramming
            ? "🏆 NEW PROGRAMMING PERSONAL BEST! OUTPACED YOUR GHOST!"
            : "🏆 NEW PERSONAL BEST! YOU OUTPACED YOUR GHOST!";
          outcomeClass = "winner-pb";

          // Save new PB timeline only when actual personal-best criteria are met
          const pbData = {
            timeline: timeline,
            wpm: finalWPM,
            duration: duration,
            accuracy: accuracy,
            progress: this.playerProgress,
            date: new Date().toISOString()
          };

          if (isProgramming) {
            window.TypeEStorage.saveProgrammingGhostForDuration(duration, pbData);
          } else {
            window.TypeEStorage.saveGhostForDuration(duration, pbData);
          }
        } else {
          message = "⚡ VICTORY! YOU FINISHED AHEAD ON THE CIRCUIT!";
        }
      } else {
        // C. PLAYER LOSES TO THE GHOST: Ghost finished ahead on track
        playerWon = false;
        message = isProgramming
          ? "⚠️ PROGRAMMING GHOST HELD THE LEAD! KEEP DRILLING CODE!"
          : "⚠️ GHOST HELD THE LEAD! KEEP TRAINING TO BEAT YOUR PB!";
        outcomeClass = "winner-ghost";
      }
    }

    if (isProgramming) {
      // Update Programming Personal Bests
      const ppb = state.programmingPersonalBests || { highestWPM: 0, bestAccuracy: 0, best30s: 0, best60s: 0, best120s: 0, totalTests: 0, totalCharsTyped: 0 };
      if (finalWPM > ppb.highestWPM) ppb.highestWPM = finalWPM;
      if (accuracy > ppb.bestAccuracy && finalWPM > 20) ppb.bestAccuracy = accuracy;
      if (state.duration === 30 && finalWPM > ppb.best30s) ppb.best30s = finalWPM;
      if (state.duration === 60 && finalWPM > ppb.best60s) ppb.best60s = finalWPM;
      if (state.duration === 120 && finalWPM > ppb.best120s) ppb.best120s = finalWPM;
      ppb.totalTests++;
      ppb.totalCharsTyped += (correctChars + incorrectChars);
      state.programmingPersonalBests = ppb;

      // Save Programming History Archive Record
      const lang = (state.programmingLanguage || "javascript").toUpperCase();
      const diff = (state.programmingDifficulty || "intermediate").toUpperCase();

      if (!Array.isArray(state.programmingHistory)) state.programmingHistory = [];
      state.programmingHistory.unshift({
        id: "PROG-" + Date.now().toString(36),
        timestamp: Date.now(),
        dateStr: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
        language: lang,
        difficulty: diff,
        wpm: finalWPM,
        accuracy: accuracy,
        duration: state.duration,
        correctChars: correctChars,
        incorrectChars: incorrectChars,
        wonRace: playerWon,
        outcome: message
      });
      if (state.programmingHistory.length > 60) state.programmingHistory.pop();
    } else {
      // Update Normal Personal Bests
      const pb = state.personalBests;
      if (finalWPM > pb.highestWPM) pb.highestWPM = finalWPM;
      if (accuracy > pb.bestAccuracy && finalWPM > 20) pb.bestAccuracy = accuracy;
      if (state.duration === 30 && finalWPM > pb.best30s) pb.best30s = finalWPM;
      if (state.duration === 60 && finalWPM > pb.best60s) pb.best60s = finalWPM;
      if (state.duration === 120 && finalWPM > pb.best120s) pb.best120s = finalWPM;
      pb.totalTests++;
      pb.totalCharsTyped += (correctChars + incorrectChars);

      // Save Normal Sprint Archive Record
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
    }

    window.TypeEStorage.save();

    if (window.TypeESettings) {
      window.TypeESettings.synth.playFinish(playerWon);
    }

    this.showResultsModal(message, outcomeClass, finalWPM, accuracy, elapsedSec, correctChars, incorrectChars, isProgramming);
  }

  showResultsModal(message, outcomeClass, wpm, acc, time, correct, errors, isProgramming = false) {
    const banner = document.querySelector("#race-winner-banner");
    if (banner) {
      banner.className = `race-outcome-banner ${outcomeClass}`;
      banner.textContent = message;
    }

    const state = window.TypeEStorage.get();
    const titleEl = document.querySelector("#modal-title-text");
    const metaBox = document.querySelector("#prog-modal-meta");
    const langBadge = document.querySelector("#prog-modal-lang");
    const diffBadge = document.querySelector("#prog-modal-diff");
    const analyticsBtn = document.querySelector("#btn-results-analytics");

    if (isProgramming) {
      if (titleEl) titleEl.textContent = "💻 PROGRAMMING SPRINT RESULTS";
      if (metaBox) metaBox.style.display = "flex";
      if (langBadge) langBadge.textContent = (state.programmingLanguage || "javascript").toUpperCase();
      if (diffBadge) diffBadge.textContent = (state.programmingDifficulty || "intermediate").toUpperCase();
      if (analyticsBtn) {
        analyticsBtn.textContent = "📊 View Programming Analytics";
        analyticsBtn.onclick = () => { window.location.href = "analytics.html#programming-section"; };
      }
    } else {
      if (titleEl) titleEl.textContent = "🏁 SPRINT RESULTS";
      if (metaBox) metaBox.style.display = "none";
      if (analyticsBtn) {
        analyticsBtn.textContent = "📊 View Analytics";
        analyticsBtn.onclick = () => { window.location.href = "analytics.html"; };
      }
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
