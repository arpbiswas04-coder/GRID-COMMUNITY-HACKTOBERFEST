// ==========================================================================
// TYPE.E — REBUILT VIRTUAL KEYBOARD & HEATMAP (keyboard.js)
// Accurate QWERTY, Dvorak & Colemak physical layouts & error telemetry
// ==========================================================================

const KEYBOARD_SPECS = {
  qwerty: [
    // Row 1 (15 units)
    [
      { label: "`", key: "`", w: 1 }, { label: "1", key: "1", w: 1 }, { label: "2", key: "2", w: 1 },
      { label: "3", key: "3", w: 1 }, { label: "4", key: "4", w: 1 }, { label: "5", key: "5", w: 1 },
      { label: "6", key: "6", w: 1 }, { label: "7", key: "7", w: 1 }, { label: "8", key: "8", w: 1 },
      { label: "9", key: "9", w: 1 }, { label: "0", key: "0", w: 1 }, { label: "-", key: "-", w: 1 },
      { label: "=", key: "=", w: 1 }, { label: "BACKSPACE", key: "Backspace", w: 2 }
    ],
    // Row 2 (15 units)
    [
      { label: "TAB", key: "Tab", w: 1.5 }, { label: "Q", key: "q", w: 1 }, { label: "W", key: "w", w: 1 },
      { label: "E", key: "e", w: 1 }, { label: "R", key: "r", w: 1 }, { label: "T", key: "t", w: 1 },
      { label: "Y", key: "y", w: 1 }, { label: "U", key: "u", w: 1 }, { label: "I", key: "i", w: 1 },
      { label: "O", key: "o", w: 1 }, { label: "P", key: "p", w: 1 }, { label: "[", key: "[", w: 1 },
      { label: "]", key: "]", w: 1 }, { label: "\\", key: "\\", w: 1.5 }
    ],
    // Row 3 (15 units)
    [
      { label: "CAPS", key: "Caps", w: 1.75 }, { label: "A", key: "a", w: 1 }, { label: "S", key: "s", w: 1 },
      { label: "D", key: "d", w: 1 }, { label: "F", key: "f", w: 1 }, { label: "G", key: "g", w: 1 },
      { label: "H", key: "h", w: 1 }, { label: "J", key: "j", w: 1 }, { label: "K", key: "k", w: 1 },
      { label: "L", key: "l", w: 1 }, { label: ";", key: ";", w: 1 }, { label: "'", key: "'", w: 1 },
      { label: "ENTER", key: "Enter", w: 2.25 }
    ],
    // Row 4 (15 units)
    [
      { label: "SHIFT", key: "Shift", w: 2.25 }, { label: "Z", key: "z", w: 1 }, { label: "X", key: "x", w: 1 },
      { label: "C", key: "c", w: 1 }, { label: "V", key: "v", w: 1 }, { label: "B", key: "b", w: 1 },
      { label: "N", key: "n", w: 1 }, { label: "M", key: "m", w: 1 }, { label: ",", key: ",", w: 1 },
      { label: ".", key: ".", w: 1 }, { label: "/", key: "/", w: 1 }, { label: "SHIFT", key: "Shift", w: 2.75 }
    ],
    // Row 5 (15 units)
    [
      { label: "CTRL", key: "Ctrl", w: 1.5 }, { label: "ALT", key: "Alt", w: 1.25 },
      { label: "SPACEBAR", key: "Space", w: 9.5 },
      { label: "ALT", key: "Alt", w: 1.25 }, { label: "CTRL", key: "Ctrl", w: 1.5 }
    ]
  ],
  dvorak: [
    // Row 1 (15 units)
    [
      { label: "`", key: "`", w: 1 }, { label: "1", key: "1", w: 1 }, { label: "2", key: "2", w: 1 },
      { label: "3", key: "3", w: 1 }, { label: "4", key: "4", w: 1 }, { label: "5", key: "5", w: 1 },
      { label: "6", key: "6", w: 1 }, { label: "7", key: "7", w: 1 }, { label: "8", key: "8", w: 1 },
      { label: "9", key: "9", w: 1 }, { label: "0", key: "0", w: 1 }, { label: "[", key: "[", w: 1 },
      { label: "]", key: "]", w: 1 }, { label: "BACKSPACE", key: "Backspace", w: 2 }
    ],
    // Row 2 (15 units)
    [
      { label: "TAB", key: "Tab", w: 1.5 }, { label: "'", key: "'", w: 1 }, { label: ",", key: ",", w: 1 },
      { label: ".", key: ".", w: 1 }, { label: "P", key: "p", w: 1 }, { label: "Y", key: "y", w: 1 },
      { label: "F", key: "f", w: 1 }, { label: "G", key: "g", w: 1 }, { label: "C", key: "c", w: 1 },
      { label: "R", key: "r", w: 1 }, { label: "L", key: "l", w: 1 }, { label: "/", key: "/", w: 1 },
      { label: "=", key: "=", w: 1 }, { label: "\\", key: "\\", w: 1.5 }
    ],
    // Row 3 (15 units)
    [
      { label: "CAPS", key: "Caps", w: 1.75 }, { label: "A", key: "a", w: 1 }, { label: "O", key: "o", w: 1 },
      { label: "E", key: "e", w: 1 }, { label: "U", key: "u", w: 1 }, { label: "I", key: "i", w: 1 },
      { label: "D", key: "d", w: 1 }, { label: "H", key: "h", w: 1 }, { label: "T", key: "t", w: 1 },
      { label: "N", key: "n", w: 1 }, { label: "S", key: "s", w: 1 }, { label: "-", key: "-", w: 1 },
      { label: "ENTER", key: "Enter", w: 2.25 }
    ],
    // Row 4 (15 units)
    [
      { label: "SHIFT", key: "Shift", w: 2.25 }, { label: ";", key: ";", w: 1 }, { label: "Q", key: "q", w: 1 },
      { label: "J", key: "j", w: 1 }, { label: "K", key: "k", w: 1 }, { label: "X", key: "x", w: 1 },
      { label: "B", key: "b", w: 1 }, { label: "M", key: "m", w: 1 }, { label: "W", key: "w", w: 1 },
      { label: "V", key: "v", w: 1 }, { label: "Z", key: "z", w: 1 }, { label: "SHIFT", key: "Shift", w: 2.75 }
    ],
    // Row 5 (15 units)
    [
      { label: "CTRL", key: "Ctrl", w: 1.5 }, { label: "ALT", key: "Alt", w: 1.25 },
      { label: "SPACEBAR", key: "Space", w: 9.5 },
      { label: "ALT", key: "Alt", w: 1.25 }, { label: "CTRL", key: "Ctrl", w: 1.5 }
    ]
  ],
  colemak: [
    // Row 1 (15 units)
    [
      { label: "`", key: "`", w: 1 }, { label: "1", key: "1", w: 1 }, { label: "2", key: "2", w: 1 },
      { label: "3", key: "3", w: 1 }, { label: "4", key: "4", w: 1 }, { label: "5", key: "5", w: 1 },
      { label: "6", key: "6", w: 1 }, { label: "7", key: "7", w: 1 }, { label: "8", key: "8", w: 1 },
      { label: "9", key: "9", w: 1 }, { label: "0", key: "0", w: 1 }, { label: "-", key: "-", w: 1 },
      { label: "=", key: "=", w: 1 }, { label: "BACKSPACE", key: "Backspace", w: 2 }
    ],
    // Row 2 (15 units)
    [
      { label: "TAB", key: "Tab", w: 1.5 }, { label: "Q", key: "q", w: 1 }, { label: "W", key: "w", w: 1 },
      { label: "F", key: "f", w: 1 }, { label: "P", key: "p", w: 1 }, { label: "G", key: "g", w: 1 },
      { label: "J", key: "j", w: 1 }, { label: "L", key: "l", w: 1 }, { label: "U", key: "u", w: 1 },
      { label: "Y", key: "y", w: 1 }, { label: ";", key: ";", w: 1 }, { label: "[", key: "[", w: 1 },
      { label: "]", key: "]", w: 1 }, { label: "\\", key: "\\", w: 1.5 }
    ],
    // Row 3 (15 units)
    [
      { label: "CAPS", key: "Caps", w: 1.75 }, { label: "A", key: "a", w: 1 }, { label: "R", key: "r", w: 1 },
      { label: "S", key: "s", w: 1 }, { label: "T", key: "t", w: 1 }, { label: "D", key: "d", w: 1 },
      { label: "H", key: "h", w: 1 }, { label: "N", key: "n", w: 1 }, { label: "E", key: "e", w: 1 },
      { label: "I", key: "i", w: 1 }, { label: "O", key: "o", w: 1 }, { label: "'", key: "'", w: 1 },
      { label: "ENTER", key: "Enter", w: 2.25 }
    ],
    // Row 4 (15 units)
    [
      { label: "SHIFT", key: "Shift", w: 2.25 }, { label: "Z", key: "z", w: 1 }, { label: "X", key: "x", w: 1 },
      { label: "C", key: "c", w: 1 }, { label: "V", key: "v", w: 1 }, { label: "B", key: "b", w: 1 },
      { label: "K", key: "k", w: 1 }, { label: "M", key: "m", w: 1 }, { label: ",", key: ",", w: 1 },
      { label: ".", key: ".", w: 1 }, { label: "/", key: "/", w: 1 }, { label: "SHIFT", key: "Shift", w: 2.75 }
    ],
    // Row 5 (15 units)
    [
      { label: "CTRL", key: "Ctrl", w: 1.5 }, { label: "ALT", key: "Alt", w: 1.25 },
      { label: "SPACEBAR", key: "Space", w: 9.5 },
      { label: "ALT", key: "Alt", w: 1.25 }, { label: "CTRL", key: "Ctrl", w: 1.5 }
    ]
  ]
};

// Physical QWERTY key to layout translations
const PHYSICAL_MAP_DVORAK = {
  'q': "'", 'w': ',', 'e': '.', 'r': 'p', 't': 'y', 'y': 'f', 'u': 'g', 'i': 'c', 'o': 'r', 'p': 'l', '[': '/', ']': '=',
  'a': 'a', 's': 'o', 'd': 'e', 'f': 'u', 'g': 'i', 'h': 'd', 'j': 'h', 'k': 't', 'l': 'n', ';': 's', "'": '-',
  'z': ';', 'x': 'q', 'c': 'j', 'v': 'k', 'b': 'x', 'n': 'b', 'm': 'm', ',': 'w', '.': 'v', '/': 'z',
  'Q': '"', 'W': '<', 'E': '>', 'R': 'P', 'T': 'Y', 'Y': 'F', 'U': 'G', 'I': 'C', 'O': 'R', 'P': 'L', '{': '?', '}': '+',
  'A': 'A', 'S': 'O', 'D': 'E', 'F': 'U', 'G': 'I', 'H': 'D', 'J': 'H', 'K': 'T', 'L': 'N', ':': 'S', '"': '_',
  'Z': ':', 'X': 'Q', 'C': 'J', 'V': 'K', 'B': 'X', 'N': 'B', 'M': 'M', '<': 'W', '>': 'V', '?': 'Z'
};

const PHYSICAL_MAP_COLEMAK = {
  'e': 'f', 'r': 'p', 't': 'g', 'y': 'j', 'u': 'l', 'i': 'u', 'o': 'y', 'p': ';',
  's': 'r', 'd': 's', 'f': 't', 'g': 'd', 'j': 'n', 'k': 'e', 'l': 'i', ';': 'o',
  'n': 'k',
  'E': 'F', 'R': 'P', 'T': 'G', 'Y': 'J', 'U': 'L', 'I': 'U', 'O': 'Y', 'P': ':',
  'S': 'R', 'D': 'S', 'F': 'T', 'G': 'D', 'J': 'N', 'K': 'E', 'L': 'I', ':': 'O',
  'N': 'K'
};

class KeyboardEngine {
  constructor() {
    this.container = null;
  }

  init(containerSelector = "#virtual-keyboard") {
    this.container = document.querySelector(containerSelector);
    this.render();
    this.renderWeakKeySuggestions();

    // Update layout badge if present
    const state = window.TypeEStorage.get();
    const layout = (state.keyboardLayout || "qwerty").toUpperCase();
    const badges = document.querySelectorAll("#kb-layout-badge, #practice-kb-layout-badge");
    badges.forEach(b => { b.textContent = layout; });
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = "";

    const state = window.TypeEStorage.get();
    const layoutName = (state.keyboardLayout || "qwerty").toLowerCase();
    const rows = KEYBOARD_SPECS[layoutName] || KEYBOARD_SPECS.qwerty;

    rows.forEach(row => {
      const rowEl = document.createElement("div");
      rowEl.className = "kb-row";

      row.forEach(item => {
        const keyEl = document.createElement("div");
        keyEl.className = "kb-key";
        keyEl.dataset.key = item.key.toLowerCase();
        // Exact proportional flex sizing for mathematical 15-unit row alignment
        keyEl.style.flex = `${item.w}`;

        // Error heatmap color for printable characters
        if (item.key.length === 1) {
          const hmClass = this.getKeyHeatmapClass(item.key);
          keyEl.classList.add(hmClass);

          const stats = state.keyStatistics[item.key.toLowerCase()];
          const att = stats ? stats.attempts : 0;
          const err = stats ? stats.errors : 0;
          const pct = att > 0 ? Math.round((err / att) * 100) : 0;

          const tooltip = document.createElement("div");
          tooltip.className = "key-tooltip";
          tooltip.innerHTML = `<strong>[${item.label}]</strong><br>Attempts: ${att}<br>Mistakes: ${err} (${pct}%)`;
          keyEl.appendChild(tooltip);
        } else {
          keyEl.classList.add("hm-untested");
        }

        const labelSpan = document.createElement("span");
        labelSpan.textContent = item.label;
        keyEl.appendChild(labelSpan);

        // Click on virtual key triggers input via single source of truth
        keyEl.onclick = (e) => {
          e.preventDefault();
          this.highlightKey(item.key, true);
          setTimeout(() => this.highlightKey(item.key, false), 120);

          if (window.TypeETyping && window.TypeETyping.inputEl && !window.TypeETyping.inputEl.disabled) {
            window.TypeETyping.insertCharFromVirtualKey(item.key);
          } else if (window.TypeEPractice && window.TypeEPractice.inputEl && !window.TypeEPractice.inputEl.disabled) {
            window.TypeEPractice.insertCharFromVirtualKey(item.key);
          }
        };

        rowEl.appendChild(keyEl);
      });

      this.container.appendChild(rowEl);
    });
  }

  translateInput(rawKey) {
    const state = window.TypeEStorage.get();
    const layout = (state.keyboardLayout || "qwerty").toLowerCase();
    if (layout === "dvorak" && PHYSICAL_MAP_DVORAK[rawKey]) {
      return PHYSICAL_MAP_DVORAK[rawKey];
    }
    if (layout === "colemak" && PHYSICAL_MAP_COLEMAK[rawKey]) {
      return PHYSICAL_MAP_COLEMAK[rawKey];
    }
    return rawKey;
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
    const root = this.container || document;
    const el = root.querySelector(`[data-key="${key.toLowerCase()}"]`);
    if (!el) return;

    el.classList.remove("hm-untested", "hm-excellent", "hm-low", "hm-med", "hm-high", "hm-critical");
    el.classList.add(this.getKeyHeatmapClass(key));

    const state = window.TypeEStorage.get();
    const stats = state.keyStatistics[key.toLowerCase()];
    const tooltip = el.querySelector(".key-tooltip");
    if (tooltip && stats) {
      const pct = Math.round((stats.errors / stats.attempts) * 100);
      tooltip.innerHTML = `<strong>[${key.toUpperCase()}]</strong><br>Attempts: ${stats.attempts}<br>Mistakes: ${stats.errors} (${pct}%)`;
    }

    this.renderWeakKeySuggestions();
  }

  highlightKey(keyName, isPressed) {
    if (!keyName) return;
    const translated = this.translateInput(keyName);
    const k = translated.toLowerCase();
    const root = this.container || document;
    const el = root.querySelector(`[data-key="${k}"]`) || (keyName === " " ? root.querySelector(`[data-key="space"]`) : null);
    if (el) {
      if (isPressed) {
        el.classList.add("key-pressed");
      } else {
        el.classList.remove("key-pressed");
      }
    }
  }

  flashKeyFeedback(keyName, isCorrect) {
    if (!keyName) return;
    const translated = this.translateInput(keyName);
    const k = translated.toLowerCase();
    const root = this.container || document;
    const el = root.querySelector(`[data-key="${k}"]`) || (keyName === " " ? root.querySelector(`[data-key="space"]`) : null);
    if (el) {
      const cls = isCorrect ? "key-feedback-correct" : "key-feedback-incorrect";
      el.classList.add(cls);
      setTimeout(() => el.classList.remove(cls), 160);
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
