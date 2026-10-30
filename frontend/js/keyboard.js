// ==========================================================================
// TYPE.E — VIRTUAL KEYBOARD & COLOURFUL HEATMAP (keyboard.js)
// QWERTY/Dvorak/Colemak layouts with error-rate telemetry & weak-key analysis
// ==========================================================================

const KEY_LAYOUTS = {
  qwerty: [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
    ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
    ["Caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"],
    ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Shift"],
    ["Space"]
  ],
  dvorak: [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "[", "]", "Backspace"],
    ["Tab", "'", ",", ".", "p", "y", "f", "g", "c", "r", "l", "/", "=", "\\"],
    ["Caps", "a", "o", "e", "u", "i", "d", "h", "t", "n", "s", "-", "Enter"],
    ["Shift", ";", "q", "j", "k", "x", "b", "m", "w", "v", "z", "Shift"],
    ["Space"]
  ],
  colemak: [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
    ["Tab", "q", "w", "f", "p", "g", "j", "l", "u", "y", ";", "[", "]", "\\"],
    ["Caps", "a", "r", "s", "t", "d", "h", "n", "e", "i", "o", "'", "Enter"],
    ["Shift", "z", "x", "c", "v", "b", "k", "m", ",", ".", "/", "Shift"],
    ["Space"]
  ]
};

class KeyboardEngine {
  constructor() {
    this.container = null;
  }

  init(containerSelector = "#virtual-keyboard") {
    this.container = document.querySelector(containerSelector);
    this.render();
    this.renderWeakKeySuggestions();
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = "";

    const state = window.TypeEStorage.get();
    const layout = KEY_LAYOUTS[state.keyboardLayout] || KEY_LAYOUTS.qwerty;

    layout.forEach(row => {
      const rowEl = document.createElement("div");
      rowEl.className = "kb-row";

      row.forEach(key => {
        const keyEl = document.createElement("div");
        keyEl.className = "kb-key";
        keyEl.dataset.key = key.toLowerCase();

        // Width Classes
        if (key === "Backspace" || key === "Caps" || key === "Enter") {
          keyEl.classList.add("key-wide-2");
        } else if (key === "Tab" || key === "Shift") {
          keyEl.classList.add("key-wide-3");
        } else if (key === "Space") {
          keyEl.classList.add("key-space");
        }

        // Apply Colourful Heatmap for single character keys
        if (key.length === 1) {
          const hmClass = this.getKeyHeatmapClass(key);
          keyEl.classList.add(hmClass);

          // Add interactive tooltip
          const stats = state.keyStatistics[key.toLowerCase()];
          const att = stats ? stats.attempts : 0;
          const err = stats ? stats.errors : 0;
          const pct = att > 0 ? Math.round((err / att) * 100) : 0;

          const tooltip = document.createElement("div");
          tooltip.className = "key-tooltip";
          tooltip.innerHTML = `<strong>KEY: [${key.toUpperCase()}]</strong><br>Attempts: ${att}<br>Mistakes: ${err} (${pct}%)`;
          keyEl.appendChild(tooltip);
        } else {
          keyEl.classList.add("hm-untested");
        }

        // Label
        const label = document.createElement("span");
        label.textContent = key === "Space" ? "SPACEBAR" : key.toUpperCase();
        keyEl.appendChild(label);

        // Virtual key click inserts into single-source input
        keyEl.onclick = (e) => {
          e.preventDefault();
          this.highlightKey(key, true);
          setTimeout(() => this.highlightKey(key, false), 120);

          if (window.TypeETyping) {
            window.TypeETyping.insertCharFromVirtualKey(key);
          }
        };

        rowEl.appendChild(keyEl);
      });

      this.container.appendChild(rowEl);
    });
  }

  getKeyHeatmapClass(key) {
    const state = window.TypeEStorage.get();
    const stats = state.keyStatistics[key.toLowerCase()];
    if (!stats || stats.attempts < 3) {
      return "hm-untested";
    }
    const errRate = (stats.errors / stats.attempts) * 100;
    if (errRate <= 3) return "hm-excellent";
    if (errRate <= 8) return "hm-low";
    if (errRate <= 15) return "hm-med";
    if (errRate <= 25) return "hm-high";
    return "hm-critical";
  }

  updateKeyHeatmap(key) {
    const el = document.querySelector(`[data-key="${key.toLowerCase()}"]`);
    if (!el) return;

    // Reset heatmap classes
    el.classList.remove("hm-untested", "hm-excellent", "hm-low", "hm-med", "hm-high", "hm-critical");
    el.classList.add(this.getKeyHeatmapClass(key));

    // Update tooltip
    const state = window.TypeEStorage.get();
    const stats = state.keyStatistics[key.toLowerCase()];
    const tooltip = el.querySelector(".key-tooltip");
    if (tooltip && stats) {
      const pct = Math.round((stats.errors / stats.attempts) * 100);
      tooltip.innerHTML = `<strong>KEY: [${key.toUpperCase()}]</strong><br>Attempts: ${stats.attempts}<br>Mistakes: ${stats.errors} (${pct}%)`;
    }

    this.renderWeakKeySuggestions();
  }

  highlightKey(keyName, isPressed) {
    if (!keyName) return;
    const k = keyName.toLowerCase();
    const el = document.querySelector(`[data-key="${k}"]`) || (keyName === " " ? document.querySelector(`[data-key="space"]`) : null);
    if (el) {
      if (isPressed) {
        el.classList.add("key-pressed");
      } else {
        el.classList.remove("key-pressed");
      }
    }
  }

  getWeakKeys() {
    const state = window.TypeEStorage.get();
    const keys = Object.keys(state.keyStatistics);
    const weak = [];

    keys.forEach(k => {
      const s = state.keyStatistics[k];
      if (s.attempts >= 3 && s.errors > 0) {
        weak.push({
          key: k,
          attempts: s.attempts,
          errors: s.errors,
          rate: Math.round((s.errors / s.attempts) * 100)
        });
      }
    });

    weak.sort((a, b) => b.rate - a.rate);
    return weak.slice(0, 5);
  }

  renderWeakKeySuggestions() {
    const container = document.querySelector("#weak-chips-list");
    if (!container) return;

    const weakKeys = this.getWeakKeys();
    container.innerHTML = "";

    if (weakKeys.length === 0) {
      container.innerHTML = `<span style="font-size:0.75rem; font-weight:700; color:var(--color-muted);">Complete a typing session to discover your weakest keys.</span>`;
      return;
    }

    weakKeys.forEach(wk => {
      const chip = document.createElement("span");
      chip.className = "weak-key-badge";
      chip.innerHTML = `${wk.key.toUpperCase()} <span class="err-rate">${wk.rate}%</span>`;
      container.appendChild(chip);
    });
  }
}

window.TypeEKeyboard = new KeyboardEngine();
