// ==========================================================================
// TYPE.E — RACING ENGINE & GHOST REPLAY (race-engine.js)
// 60 FPS HTML5 Canvas Racing Circuit with Previous-Session Ghost Replay
// ==========================================================================

class RaceEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.animId = null;
    this.playerProgress = 0;
    this.playerWPM = 0;
    this.ghostProgress = 0;
    this.ghostWPM = 0;
    this.hasGhost = false;
    this.ghostTimeline = null;
    this.elapsedSeconds = 0;
  }

  init(canvasSelector = "#racing-canvas") {
    this.canvas = document.querySelector(canvasSelector);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());

    this.loadGhostSession();
    this.startRenderLoop();
  }

  resizeCanvas() {
    if (!this.canvas || !this.ctx) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = Math.floor(rect.width * dpr);
    this.canvas.height = Math.floor(145 * dpr);
    this.ctx.resetTransform?.();
    this.ctx.scale(dpr, dpr);
  }

  loadGhostSession() {
    const state = window.TypeEStorage.get();
    const prev = state.previousSessionRace;

    // Check if a real previous session exists
    if (prev && prev.timeline && prev.timeline.length > 0) {
      this.hasGhost = true;
      this.ghostTimeline = prev.timeline;
      this.ghostWPM = prev.wpm || 0;
    } else {
      this.hasGhost = false;
      this.ghostTimeline = null;
      this.ghostWPM = 0;
    }

    this.updateDeltaIndicator();
  }

  resetRace() {
    this.playerProgress = 0;
    this.playerWPM = 0;
    this.ghostProgress = 0;
    this.elapsedSeconds = 0;
    this.loadGhostSession();
    this.updateTelemetryBars();
  }

  updateLiveRace(progress, wpm, elapsedSec) {
    this.playerProgress = Math.min(1, progress);
    this.playerWPM = wpm;
    this.elapsedSeconds = elapsedSec;

    // Interpolate ghost from previous session timeline
    if (this.hasGhost && this.ghostTimeline) {
      const g = this.interpolateGhost(elapsedSec);
      this.ghostProgress = g.progress;
      this.ghostWPM = g.wpm;
    } else {
      this.ghostProgress = 0;
      this.ghostWPM = 0;
    }

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
        return { progress: Math.min(1, p), wpm: w };
      }
    }

    return { progress: tl[0].progress, wpm: tl[0].wpm };
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
      badge.innerHTML = `✨ FIRST SESSION (RECORDING GHOST PACE)`;
      return;
    }

    const diffProgress = this.playerProgress - this.ghostProgress;
    const diffWpm = this.playerWPM - this.ghostWPM;
    const meters = Math.round(Math.abs(diffProgress) * 400);

    if (diffProgress > 0.015) {
      badge.className = "delta-badge ahead";
      badge.innerHTML = `⚡ LEADING BY +${meters}m (${diffWpm >= 0 ? '+' : ''}${diffWpm} WPM)`;
    } else if (diffProgress < -0.015) {
      badge.className = "delta-badge behind";
      badge.innerHTML = `⚠️ PREV SESSION +${meters}m (${diffWpm >= 0 ? '+' : ''}${diffWpm} WPM)`;
    } else {
      badge.className = "delta-badge neutral";
      badge.innerHTML = `🏁 HEAD TO HEAD`;
    }
  }

  startRenderLoop() {
    if (this.animId) cancelAnimationFrame(this.animId);
    const loop = () => {
      this.drawTrack();
      this.animId = requestAnimationFrame(loop);
    };
    loop();
  }

  drawTrack() {
    if (!this.canvas || !this.ctx) return;
    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width;
    const height = 145;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, width, height);

    const trackX = 16;
    const trackW = width - 32;
    const trackY = 16;
    const trackH = 112;
    const laneH = trackH / (this.hasGhost ? 2 : 1);

    // 1. Asphalt Base
    ctx.fillStyle = "#1E2028";
    ctx.fillRect(trackX, trackY, trackW, trackH);

    // 2. Outer Border
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = "#171717";
    ctx.strokeRect(trackX, trackY, trackW, trackH);

    // 3. Chequered Curbs (Top & Bottom)
    this.drawCurbs(ctx, trackX, trackY - 5, trackW, 5);
    this.drawCurbs(ctx, trackX, trackY + trackH, trackW, 5);

    // 4. Center Line (Only when 2 lanes exist)
    if (this.hasGhost) {
      ctx.beginPath();
      ctx.setLineDash([14, 10]);
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = "#FFE66D";
      ctx.moveTo(trackX, trackY + laneH);
      ctx.lineTo(trackX + trackW, trackY + laneH);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // 5. Distance Checkpoints
    [0.25, 0.5, 0.75].forEach(ratio => {
      const cpX = trackX + trackW * ratio;
      ctx.beginPath();
      ctx.setLineDash([4, 6]);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.moveTo(cpX, trackY);
      ctx.lineTo(cpX, trackY + trackH);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.font = "bold 9px 'JetBrains Mono', monospace";
      ctx.fillText(`${ratio * 100}%`, cpX - 9, trackY + 11);
    });

    // 6. Finish Line Checkered Banner
    this.drawFinishLine(ctx, trackX + trackW - 14, trackY, 14, trackH);

    // 7. Calculate Car Positions
    const usableWidth = trackW - 70;
    const playerX = trackX + (this.playerProgress * usableWidth);

    if (this.hasGhost) {
      const ghostX = trackX + (this.ghostProgress * usableWidth);
      const ghostY = trackY + laneH + 8;
      const playerY = trackY + 8;

      // Draw Ghost Car in Lane 2
      this.drawGhostCar(ctx, ghostX, ghostY);
      this.drawBadge(ctx, ghostX + 28, ghostY - 3, `GHOST: ${this.ghostWPM}`, "#00D2FF", "#000");

      // Draw Player Car in Lane 1
      this.drawPlayerCar(ctx, playerX, playerY);
      this.drawBadge(ctx, playerX + 28, playerY - 3, `YOU: ${this.playerWPM}`, "#FFE66D", "#000");
    } else {
      // Single Car Centered
      const playerY = trackY + (trackH / 2) - 14;
      this.drawPlayerCar(ctx, playerX, playerY);
      this.drawBadge(ctx, playerX + 28, playerY - 3, `YOU: ${this.playerWPM} WPM`, "#FFE66D", "#000");
    }
  }

  drawCurbs(ctx, x, y, w, h) {
    const blockW = 12;
    const count = Math.ceil(w / blockW);
    for (let i = 0; i < count; i++) {
      ctx.fillStyle = i % 2 === 0 ? "#FF3366" : "#FFFFFF";
      ctx.fillRect(x + i * blockW, y, blockW, h);
    }
  }

  drawFinishLine(ctx, x, y, w, h) {
    const sq = 7;
    const cols = Math.ceil(w / sq);
    const rows = Math.ceil(h / sq);
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        ctx.fillStyle = (c + r) % 2 === 0 ? "#FFFFFF" : "#171717";
        ctx.fillRect(x + c * sq, y + r * sq, sq, sq);
      }
    }
  }

  drawPlayerCar(ctx, x, y) {
    ctx.save();
    ctx.translate(x, y);

    // Speed Sparks
    if (this.playerWPM > 35) {
      ctx.fillStyle = "#FF9234";
      ctx.fillRect(-8 + Math.sin(Date.now() / 40) * 3, 14, 6, 3);
      ctx.fillStyle = "#FFE66D";
      ctx.fillRect(-12 + Math.cos(Date.now() / 50) * 4, 15, 5, 2);
    }

    // Chassis
    ctx.fillStyle = "#FFE66D";
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "#171717";
    ctx.fillRect(0, 8, 54, 18);
    ctx.strokeRect(0, 8, 54, 18);

    // Cabin
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(16, 2, 22, 10);
    ctx.strokeRect(16, 2, 22, 10);

    // Windshield
    ctx.fillStyle = "#4D96FF";
    ctx.fillRect(30, 4, 7, 6);

    // Racing Stripe
    ctx.fillStyle = "#171717";
    ctx.fillRect(0, 15, 54, 3);

    // Spoiler
    ctx.fillStyle = "#FF6B6B";
    ctx.fillRect(-3, 3, 5, 10);
    ctx.strokeRect(-3, 3, 5, 10);

    // Wheels
    ctx.fillStyle = "#171717";
    ctx.fillRect(6, 22, 11, 5);
    ctx.fillRect(37, 22, 11, 5);

    // Number
    ctx.fillStyle = "#171717";
    ctx.font = "bold 8px 'JetBrains Mono', monospace";
    ctx.fillText("#01", 20, 18);

    ctx.restore();
  }

  drawGhostCar(ctx, x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = 0.75;

    ctx.fillStyle = "rgba(0, 210, 255, 0.2)";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#00D2FF";
    ctx.setLineDash([3, 2]);

    ctx.fillRect(0, 8, 54, 18);
    ctx.strokeRect(0, 8, 54, 18);

    ctx.fillStyle = "rgba(0, 255, 136, 0.25)";
    ctx.fillRect(16, 2, 22, 10);
    ctx.strokeRect(16, 2, 22, 10);

    ctx.setLineDash([]);
    ctx.strokeStyle = "#00FF88";
    ctx.strokeRect(-3, 3, 5, 10);

    ctx.fillStyle = "#00D2FF";
    ctx.fillRect(6, 22, 11, 4);
    ctx.fillRect(37, 22, 11, 4);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 7px 'JetBrains Mono', monospace";
    ctx.fillText("PB👻", 18, 17);

    ctx.restore();
  }

  drawBadge(ctx, x, y, text, bg, color) {
    ctx.save();
    ctx.font = "bold 9px 'Space Grotesk', sans-serif";
    const w = ctx.measureText(text).width + 8;
    const h = 15;

    ctx.fillStyle = bg;
    ctx.strokeStyle = "#171717";
    ctx.lineWidth = 1.5;
    ctx.fillRect(x - w / 2, y - h / 2, w, h);
    ctx.strokeRect(x - w / 2, y - h / 2, w, h);

    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x, y + 0.5);
    ctx.restore();
  }

  onRaceComplete(timeline, finalWPM, accuracy, correctChars, incorrectChars, elapsedSec) {
    const state = window.TypeEStorage.get();

    // 1. Evaluate outcome
    let playerWon = true;
    let message = "Session Complete!";
    let outcomeClass = "winner-player";

    if (!this.hasGhost) {
      message = "Initial Session Complete! Ghost Pace Saved.";
      outcomeClass = "winner-solo";
    } else {
      if (this.playerProgress >= this.ghostProgress) {
        playerWon = true;
        message = "YOU DEFEATED THE PREVIOUS SESSION!";
        outcomeClass = "winner-player";
      } else {
        playerWon = false;
        message = "PREVIOUS SESSION WON THIS SPRINT!";
        outcomeClass = "winner-ghost";
      }
    }

    // 2. CRITICAL: Save this session as the new PREVIOUS SESSION for future races
    const completedSession = {
      timeline: timeline,
      wpm: finalWPM,
      duration: state.duration || 60,
      date: new Date().toISOString()
    };
    state.previousSessionRace = completedSession;

    // 3. Update Personal Bests
    const pb = state.personalBests;
    let isPB = false;
    if (finalWPM > pb.highestWPM) { pb.highestWPM = finalWPM; isPB = true; }
    if (accuracy > pb.bestAccuracy && finalWPM > 20) pb.bestAccuracy = accuracy;
    if (state.duration === 30 && finalWPM > pb.best30s) { pb.best30s = finalWPM; isPB = true; }
    if (state.duration === 60 && finalWPM > pb.best60s) { pb.best60s = finalWPM; isPB = true; }
    if (state.duration === 120 && finalWPM > pb.best120s) { pb.best120s = finalWPM; isPB = true; }
    pb.totalTests++;
    pb.totalCharsTyped += (correctChars + incorrectChars);

    // 4. Record to test history
    const historyItem = {
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
    };
    state.testHistory.unshift(historyItem);
    if (state.testHistory.length > 60) state.testHistory.pop();

    window.TypeEStorage.save();

    // 5. Play Audio
    if (window.TypeESettings) {
      window.TypeESettings.synth.playFinish(playerWon);
    }

    // 6. Show Results Modal
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
