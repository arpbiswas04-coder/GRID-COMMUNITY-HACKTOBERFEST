// ==========================================================================
// TYPE.E — AUDIO SYNTHESIZER & SETTINGS (settings.js)
// Web Audio API sound effects engine & global toast notifications
// ==========================================================================

class AudioSynth {
  constructor() {
    this.ctx = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.initialized = true;
      }
    } catch (e) {
      console.warn("Web Audio API not supported:", e);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playKey(isCorrect = true) {
    const state = window.TypeEStorage ? window.TypeEStorage.get() : { soundEnabled: false };
    if (!state.soundEnabled) return;
    this.init();
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    if (isCorrect) {
      // Crisp mechanical key switch click
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(820 + Math.random() * 180, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.035);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.035);
    } else {
      // Typo warning buzz
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(145, now);
      osc.frequency.linearRampToValueAtTime(95, now + 0.08);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    }
  }

  playCountdown(isGo = false) {
    const state = window.TypeEStorage ? window.TypeEStorage.get() : { soundEnabled: false };
    if (!state.soundEnabled) return;
    this.init();
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    const freq = isGo ? 880 : 440;
    const duration = isGo ? 0.22 : 0.12;

    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
  }

  playFinish(isWinner = true) {
    const state = window.TypeEStorage ? window.TypeEStorage.get() : { soundEnabled: false };
    if (!state.soundEnabled) return;
    this.init();
    this.resume();
    if (!this.ctx) return;

    const notes = isWinner ? [523.25, 659.25, 783.99, 1046.50] : [440, 392, 349.23];
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = this.ctx.currentTime + (i * 0.09);

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.22);
    });
  }
}

const audioSynth = new AudioSynth();

function toggleSound() {
  const state = window.TypeEStorage.get();
  const next = !state.soundEnabled;
  window.TypeEStorage.update({ soundEnabled: next });
  updateSoundButton();
  if (next) {
    audioSynth.init();
    audioSynth.resume();
    audioSynth.playCountdown(true);
    showToast("Audio sound effects enabled!", "success");
  } else {
    showToast("Audio muted.");
  }
}

function updateSoundButton() {
  const btn = document.querySelector("#btn-sound-toggle");
  if (!btn) return;
  const state = window.TypeEStorage.get();
  btn.innerHTML = state.soundEnabled ? `🔊 SOUND: ON` : `🔇 SOUND: OFF`;
  btn.classList.toggle("btn-primary", state.soundEnabled);
}

function showToast(message, type = "info") {
  let container = document.querySelector("#toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type === "error" ? "toast-error" : type === "success" ? "toast-success" : ""}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

window.TypeESettings = {
  synth: audioSynth,
  toggleSound,
  updateSoundButton,
  showToast
};
