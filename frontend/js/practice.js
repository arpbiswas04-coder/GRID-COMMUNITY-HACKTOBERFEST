// ==========================================================================
// TYPE.E — PRACTICE ENGINE (practice.js)
// Algorithmic weak-key sentence generation & dexterity drills
// ==========================================================================

const PRACTICE_SENTENCES = [
  "Pack my box with five dozen liquor jugs and fix quaint puzzle blocks quickly.",
  "Zesty zebras quickly fix quaint exotic puzzles without squeamish anxiety.",
  "Bizarre juxtapositions frequently bewilder experienced typists during qualifying sprints.",
  "Precision mechanics calibrate variable turbochargers with exceptional dexterity.",
  "Waxing quartz crystals require exact temperature regulation before cutting.",
  "Sphinx of black quartz, judge my vow with swift and zealous fairness.",
  "The quick brown fox jumps over the lazy dog while five boxing wizards jump quickly."
];

class PracticeEngine {
  constructor() {
    this.targetKeys = [];
  }

  init() {
    this.analyzeKeys();
    this.renderTargets();

    const launchBtn = document.querySelector("#btn-start-practice-drill");
    if (launchBtn) {
      launchBtn.onclick = () => this.launchDrill();
    }
  }

  analyzeKeys() {
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
    this.targetKeys = weak.slice(0, 5);
    return this.targetKeys;
  }

  generateTargetedText() {
    if (this.targetKeys.length === 0) {
      return PRACTICE_SENTENCES[0];
    }

    const keyList = this.targetKeys.map(t => t.key.toLowerCase());
    for (const sent of PRACTICE_SENTENCES) {
      const match = keyList.filter(k => sent.toLowerCase().includes(k)).length;
      if (match >= Math.min(2, keyList.length)) {
        return sent;
      }
    }

    return PRACTICE_SENTENCES[1];
  }

  renderTargets() {
    const container = document.querySelector("#practice-drill-keys");
    if (!container) return;
    container.innerHTML = "";

    if (this.targetKeys.length === 0) {
      container.innerHTML = `<span style="font-size:0.85rem; font-weight:700; color:var(--color-black);">No critical weak keys identified yet! Complete more sprints in the Arena.</span>`;
      return;
    }

    this.targetKeys.forEach(wk => {
      const chip = document.createElement("span");
      chip.className = "practice-chip";
      chip.innerHTML = `${wk.key.toUpperCase()} <span>${wk.rate}% err</span>`;
      container.appendChild(chip);
    });
  }

  launchDrill() {
    const text = this.generateTargetedText();
    const state = window.TypeEStorage.get();
    state.promptChoice = "custom";
    state.customPassage = text;
    window.TypeEStorage.save();

    // Navigate to race.html
    window.location.href = "race.html";
  }
}

window.TypeEPractice = new PracticeEngine();
