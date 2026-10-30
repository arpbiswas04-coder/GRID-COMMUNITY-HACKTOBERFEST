// ==========================================================================
// TYPE.E — DEDICATED INDEPENDENT PRACTICE ENGINE (practice.js)
// Targeted weak-key eradication, n-gram combos & dexterity exercises
// ==========================================================================

const WEAK_KEY_DRILLS = {
  a: [
    "Amazing acrobats applaud fascinating theatrical adaptations across ancient arenas.",
    "Astronauts analyze atmospheric anomalies against advantageous celestial databases.",
    "Artisan bakers adapt traditional yeast variants for artisanal sourdough loaves."
  ],
  b: [
    "Brave brown bears build robust bamboo bridges beside bubbling brooks.",
    "Bizarre bumblebees buzz briskly above blossoming bright bluebell bushes.",
    "Brilliant bookkeepers balance turbulent balance sheets before bedtime."
  ],
  c: [
    "Clever chemists calculate complex carbon compounds inside clinical laboratories.",
    "Curious cats carefully stalk crunchy crickets through thick clover clumps.",
    "Classic cinema cameras capture crisp chromatic contrast across city streets."
  ],
  d: [
    "Determined deep-sea divers discover damaged dark destroyers down deep.",
    "Dedicated doctors diagnose difficult disorders during demanding daily rounds.",
    "Dynamic draftsmen draw detailed dimensional blueprints during daylight."
  ],
  e: [
    "Every experienced engineer expects excellent execution everywhere.",
    "Eager explorers evaluate endless evergreen ecosystems across eastern edges.",
    "Elegant emerald earrings sparkle exceedingly under evening spotlights."
  ],
  f: [
    "Fast foxes forage for fresh food forest floors frequently without fear.",
    "Fierce firefighters fight furious forest fires with formidable fortitude.",
    "Famous flute players formulate fascinating folk melodies for festivals."
  ],
  g: [
    "Giant green grasshoppers gracefully glide across gorgeous garden greens.",
    "Generous gardeners grow great golden gourds beside granite gateways.",
    "Grand gala guests gather together enjoying gentle acoustic guitars."
  ],
  h: [
    "Happy hiking horses haul heavy wooden harnesses through misty highland hills.",
    "Humorous hostesses help honest helpers handle high-pressure hospitality.",
    "Hardy highland herders herd healthy herds through heavy humid heat."
  ],
  i: [
    "Intrepid inspectors investigate intricate industrial instruments meticulously.",
    "Intelligent individuals identify innovative initiatives with immense insight.",
    "Infinite illuminated icebergs isolate pristine indigenous islands."
  ],
  j: [
    "Jovial jugglers juggle juicy jumbo plums with joyous agility.",
    "Judicious judges justly judge junior jockeys jumping jaunty jumps.",
    "Jubilant journalists join jazzy Japanese jazz jam sessions joyfully."
  ],
  k: [
    "Kind kings keep keen knights looking over rocky kingdoms knowingly.",
    "Keen kayakers knock kayaking paddles against dark limestone cliffs.",
    "Knitting knitters knit cozy knee-high socks beside crackling fires."
  ],
  l: [
    "Little lively lizards lounge lazily along lovely lime trees all afternoon.",
    "Luminous moonlight lands softly upon lonely lily pad lagoons late at night.",
    "Local librarians catalog classical literature locked inside lavish library halls."
  ],
  m: [
    "Mindful master mechanics maintain modern machinery with meticulous precision.",
    "Majestic mountain marmots make melodious murmurs amidst morning meadows.",
    "Merry musicians manufacture memorable musical movements throughout May."
  ],
  n: [
    "Ninety nimble ninjas navigate narrow northern tunnels without sound.",
    "Notable naturalists nominate novel nature reserves across northern nations.",
    "Nutritious nuts nourish nestling nightingales upon new nesting nooks."
  ],
  o: [
    "Old owl observers overlook open ocean outlooks on foggy mornings.",
    "Outdoor orchards produce sweet organic oranges and golden apricots.",
    "Original oil paintings portray opulent oceans overlooking rocky promontories."
  ],
  p: [
    "Prompt photographers practice capturing pure purple perspectives perfectly.",
    "Precise pilots prepare pre-flight propulsion checks per standard protocol.",
    "Playful playful puppies pounce playfully past pretty pink peony petals."
  ],
  q: [
    "Quaint queens quickly quiz quirky acrobats before square banquets begin.",
    "Quiet quails quickly question quirky squirrels near quaint square plazas.",
    "Quick quality control inspections require quantifiable qualification metrics."
  ],
  r: [
    "Rapid river rapids roar through rugged red rock ravines relentlessly.",
    "Rare brown rabbits race rapidly round rocky ridges reaching rivers.",
    "Reliable radio receivers record rhythmic radar reflections regularly."
  ],
  s: [
    "Swift silver swallows soar gracefully across serene summer skies.",
    "Skilled sculptors shape solid sandstone statues with steady strokes.",
    "Silent sailboats skim smoothly across sunny sparkling seas at sunrise."
  ],
  t: [
    "Twelve tall towering timber trees tremble throughout terrifying thunder storms.",
    "Tenacious track athletes train through tough tactical tempo training.",
    "Trustworthy technicians test titanium turbine temperature thresholds."
  ],
  u: [
    "Unique universe umbrellas unfold under unpredictable autumn thunderstorms.",
    "Upbeat urban utilities upgrade underground urban infrastructure uniformly.",
    "Unusual turquoise unicorns utilize unique ultraviolet unicycles upstairs."
  ],
  v: [
    "Vivid velvet vines weave over vast ancient volcanic valleys vigorously.",
    "Valiant village volunteers vaccinate vulnerable visitors against virulent viruses.",
    "Victorious varsity volleyball teams celebrate vibrant victories vividly."
  ],
  w: [
    "Warm winter winds whistle westward through wide wooden willow windows.",
    "Wise watchful woodsmen witness wild wolves wandering within woods.",
    "Watchful watchmakers wind wonderful wristwatches with polished tweezers."
  ],
  x: [
    "Expert excavators examine exceptional exotic onyx boxes with extreme care.",
    "Six complex paradoxes perplex experienced typists during reflex drills.",
    "Maximized matrix multipliers execute accelerated flux transformations exactly."
  ],
  y: [
    "Young yellow yaks yield lovely yellow butter yearly in high valleys.",
    "Youthful gymnasts playfully yield high rhythmic scores every single year.",
    "Yesterday, loyal royal bodyguards enjoyed salty roasted barley by the yard."
  ],
  z: [
    "Zesty zebras zigzag through crazy blizzards without squeamish dizziness.",
    "Zealous citizens gaze at dazzling bronze statues inside quiet plazas.",
    "Zigzagging buzz saws resize horizontal puzzle pieces with razor speed."
  ]
};

const COMMON_COMBOS = [
  "The international delegation announced a comprehensive resolution regarding global conservation regulations.",
  "Nothing is more exciting than discovering shocking secrets hidden within ancient crumbling civilizations.",
  "Thoughtful consideration of environmental pollution requires actionable legislation and innovative education.",
  "Quick thinking and quiet contemplation frequently distinguish extraordinary champions from ordinary contenders.",
  "Bright sunlight shone through the high canopy while the laughing children walked along the pathway.",
  "Substantial portions of modern technical documentation emphasize automated integration and continuous deployment.",
  "The magnificent architecture of northern cathedrals features intricate craftsmanship and breathtaking stained glass.",
  "Thorough inspection of pharmaceutical manufacturing ensures strict compliance with international sanitation protocols.",
  "Sensational performances by charismatic violinists received overwhelming standing ovations throughout the auditorium.",
  "Whichever path you choose through the enchanted woods, remember that whispering willows question everything.",
  "Technological transformation continues to reshape transportation, telecommunications, and financial transactions.",
  "Bright autumn sunlight glistens upon whispering brooks where migrating salmon leap across cascading waterfalls."
];

const DIFFICULT_WORDS = [
  "Rhythm and rhyme require conscious coordination across miscellaneous psychological and neurological barriers.",
  "Accommodating awkward bureaucrat maneuvers demands extraordinary conscientious patience and resilient temperament.",
  "The silhouette of a vacuum-insulated auxiliary centrifuge was obscured by subterranean electromagnetic interference.",
  "Conscientious archaeologists excavated pharaohs' subterranean mausoleums containing bizarre kaleidoscopic artifacts.",
  "Bourgeois connoisseurs frequently praise quintessential subtleties within Renaissance chiaroscuro masterpieces.",
  "Asynchronous multiprocessing architectures mitigate catastrophic bottlenecks via thread-safe lock-free queues.",
  "Surreptitious surveillance reconnaissance revealed unacknowledged cryptographic vulnerabilities in legacy microcode.",
  "Otolaryngologists evaluate idiosyncratic labyrinthine vestibulocochlear dysfunctions under rigorous diagnostic criteria."
];

const GENERAL_DEXTERITY = [
  "True typing mastery emerges from steady rhythm, relaxed hands, and deliberate focus on every keystroke.",
  "A smooth river stone polished by thousands of tides glides effortlessly through cool mountain rapids.",
  "Curiosity drives human exploration from the microscopic dance of atoms to the distant spirals of galaxies.",
  "Every journey begins with a single step, just as every novel unfolds one carefully chosen sentence at a time.",
  "Clean typography balances whitespace, proportion, and weight to elevate plain words into timeless design.",
  "Listen closely to the quiet cadence of the rain as it nourishes the thirsty earth under gray morning skies."
];

class PracticeEngine {
  constructor() {
    this.focusMode = "weak"; // 'weak' | 'combos' | 'difficult' | 'general'
    this.targetKeys = [];
    this.activeKey = null;

    this.passageText = "";
    this.chars = [];
    this.currentIndex = 0;
    this.status = "READY"; // 'READY' | 'TYPING' | 'COMPLETE'

    this.startTime = null;
    this.elapsedSec = 0;
    this.timerId = null;

    this.correctChars = 0;
    this.incorrectChars = 0;
    this.totalAttempted = 0;
    this.liveWPM = 0;
    this.liveAccuracy = 100;
    this.lastInputLength = 0;

    this.displayEl = null;
    this.inputEl = null;
  }

  init() {
    this.displayEl = document.querySelector("#practice-passage-display");
    this.inputEl = document.querySelector("#practice-typing-input");

    this.analyzeKeys();
    this.renderTargets();
    this.bindEvents();

    // Default to 'weak' if we have weak keys; otherwise 'general'
    if (this.targetKeys.length === 0) {
      this.focusMode = "general";
      this.updateActiveFocusUI("general");
    }

    this.generateNewDrill();
  }

  bindEvents() {
    // 1. Focus Mode Buttons
    document.querySelectorAll(".focus-btn").forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        const mode = btn.dataset.focus;
        this.setFocusMode(mode);
      };
    });

    // 2. Generate Exercise Button
    const genBtn = document.querySelector("#btn-gen-exercise");
    if (genBtn) {
      genBtn.onclick = () => this.generateNewDrill();
    }

    // 3. Stage Action Buttons
    const restartBtn = document.querySelector("#btn-practice-restart");
    if (restartBtn) {
      restartBtn.onclick = () => this.restartDrill();
    }

    const nextBtn = document.querySelector("#btn-practice-next");
    if (nextBtn) {
      nextBtn.onclick = () => this.generateNewDrill();
    }

    // 4. Modal Buttons
    const againBtn = document.querySelector("#btn-practice-again");
    if (againBtn) {
      againBtn.onclick = () => {
        const modal = document.querySelector("#modal-practice-results");
        if (modal) modal.classList.remove("active");
        this.generateNewDrill();
      };
    }

    const raceBtn = document.querySelector("#btn-practice-race");
    if (raceBtn) {
      raceBtn.onclick = () => {
        window.location.href = "race.html";
      };
    }

    // 5. Typing Input Handler
    if (this.inputEl) {
      this.inputEl.value = "";
      this.inputEl.oninput = (e) => this.handleTypingInput(e);
      this.inputEl.onkeydown = (e) => this.handleTypingKeyDown(e);
      this.inputEl.onkeyup = (e) => this.handleTypingKeyUp(e);
    }

    if (this.displayEl) {
      this.displayEl.onclick = () => {
        if (this.inputEl) this.inputEl.focus();
      };
    }

    // 6. Dedicated On-Screen Heatmap Keyboard
    if (window.TypeEKeyboard) {
      window.TypeEKeyboard.init("#practice-virtual-keyboard");
    }
  }

  setFocusMode(mode) {
    this.focusMode = mode;
    this.activeKey = null;
    this.updateActiveFocusUI(mode);
    this.generateNewDrill();
  }

  updateActiveFocusUI(mode) {
    document.querySelectorAll(".focus-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.focus === mode);
    });

    const labelEl = document.querySelector("#active-focus-label");
    if (labelEl) {
      const titles = {
        weak: this.activeKey ? `FOCUS: WEAK KEY [${this.activeKey.toUpperCase()}]` : "FOCUS: WEAKEST KEYS",
        combos: "FOCUS: COMMON LETTER COMBOS",
        difficult: "FOCUS: DIFFICULT WORDS",
        general: "FOCUS: GENERAL DEXTERITY"
      };
      labelEl.textContent = titles[mode] || "PRACTICE FOCUS";
    }
  }

  analyzeKeys() {
    const state = window.TypeEStorage.get();
    const stats = state.keyStatistics || {};
    const weak = [];

    Object.keys(stats).forEach(k => {
      const s = stats[k];
      if (s.attempts >= 3 && s.errors > 0) {
        weak.push({
          key: k.toLowerCase(),
          attempts: s.attempts,
          errors: s.errors,
          rate: Math.round((s.errors / s.attempts) * 100)
        });
      }
    });

    weak.sort((a, b) => b.rate - a.rate);
    this.targetKeys = weak.slice(0, 6);
    return this.targetKeys;
  }

  renderTargets() {
    const container = document.querySelector("#practice-drill-keys");
    const tipPill = document.querySelector("#analysis-tip-pill");
    if (!container) return;
    container.innerHTML = "";

    if (this.targetKeys.length === 0) {
      container.innerHTML = `<span style="font-size:0.85rem; font-weight:700; color:var(--color-black);">✨ No high-error keys detected yet! Complete sprints in the Arena to log keystroke telemetry.</span>`;
      if (tipPill) tipPill.textContent = "💡 GENERAL EXERCISES READY";
      return;
    }

    if (tipPill) {
      tipPill.textContent = `🎯 ${this.targetKeys.length} BOTTLENECKS DETECTED`;
    }

    this.targetKeys.forEach(wk => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "practice-chip";
      chip.innerHTML = `${wk.key.toUpperCase()} <span>${wk.rate}% err (${wk.errors}/${wk.attempts})</span>`;
      chip.title = `Click to drill key [${wk.key.toUpperCase()}] specifically`;

      chip.onclick = () => {
        this.activeKey = wk.key;
        this.focusMode = "weak";
        this.updateActiveFocusUI("weak");
        this.generateNewDrill();
      };

      container.appendChild(chip);
    });
  }

  selectDrillText() {
    if (this.focusMode === "weak") {
      let key = this.activeKey;
      if (!key && this.targetKeys.length > 0) {
        // Pick one of top weak keys randomly
        const pick = this.targetKeys[Math.floor(Math.random() * this.targetKeys.length)];
        key = pick.key;
      }

      if (key && WEAK_KEY_DRILLS[key] && WEAK_KEY_DRILLS[key].length > 0) {
        const pool = WEAK_KEY_DRILLS[key];
        return pool[Math.floor(Math.random() * pool.length)];
      }

      // If no weak key or key not in dictionary, pick from all weak drills
      const allKeys = Object.keys(WEAK_KEY_DRILLS);
      const randKey = allKeys[Math.floor(Math.random() * allKeys.length)];
      const pool = WEAK_KEY_DRILLS[randKey];
      return pool[Math.floor(Math.random() * pool.length)];
    }

    if (this.focusMode === "combos") {
      return COMMON_COMBOS[Math.floor(Math.random() * COMMON_COMBOS.length)];
    }

    if (this.focusMode === "difficult") {
      return DIFFICULT_WORDS[Math.floor(Math.random() * DIFFICULT_WORDS.length)];
    }

    // General Dexterity
    return GENERAL_DEXTERITY[Math.floor(Math.random() * GENERAL_DEXTERITY.length)];
  }

  generateNewDrill() {
    this.stopTimer();
    this.passageText = this.selectDrillText().trim();
    this.chars = this.passageText.split("");
    this.currentIndex = 0;
    this.status = "READY";

    this.startTime = null;
    this.elapsedSec = 0;
    this.correctChars = 0;
    this.incorrectChars = 0;
    this.totalAttempted = 0;
    this.liveWPM = 0;
    this.liveAccuracy = 100;
    this.lastInputLength = 0;

    if (this.inputEl) {
      this.inputEl.value = "";
      this.inputEl.disabled = false;
      this.inputEl.focus();
    }

    this.renderPassageSpans();
    this.updateHUD();
    this.updateStatusBadge("READY TO TYPE");
  }

  restartDrill() {
    this.stopTimer();
    this.currentIndex = 0;
    this.status = "READY";
    this.startTime = null;
    this.elapsedSec = 0;
    this.correctChars = 0;
    this.incorrectChars = 0;
    this.totalAttempted = 0;
    this.liveWPM = 0;
    this.liveAccuracy = 100;
    this.lastInputLength = 0;

    if (this.inputEl) {
      this.inputEl.value = "";
      this.inputEl.disabled = false;
      this.inputEl.focus();
    }

    this.renderPassageSpans();
    this.updateHUD();
    this.updateStatusBadge("READY TO TYPE");
  }

  renderPassageSpans() {
    if (!this.displayEl) return;
    this.displayEl.innerHTML = "";
    const frag = document.createDocumentFragment();

    for (let i = 0; i < this.chars.length; i++) {
      const span = document.createElement("span");
      span.className = "char";
      span.id = `practice-char-${i}`;
      span.textContent = this.chars[i];
      if (i === 0) span.classList.add("char-current");
      frag.appendChild(span);
    }

    this.displayEl.appendChild(frag);
    this.updateProgressBar(0);
  }

  startDrill() {
    this.status = "TYPING";
    this.startTime = Date.now();
    this.updateStatusBadge("DRILL IN PROGRESS");

    if (this.timerId) clearInterval(this.timerId);
    this.timerId = setInterval(() => {
      if (this.startTime) {
        this.elapsedSec = Math.max(1, Math.round((Date.now() - this.startTime) / 1000));
        this.calcStats();
        this.updateHUD();
      }
    }, 500);
  }

  stopTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  handleTypingInput(e) {
    if (this.status === "COMPLETE") {
      if (this.inputEl) this.inputEl.value = this.passageText;
      return;
    }

    const currentVal = this.inputEl ? this.inputEl.value : "";
    const currentLen = currentVal.length;

    if (this.status === "READY" && currentLen > 0) {
      this.startDrill();
    }

    // Process keystrokes
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

        // Real-time on-screen keyboard feedback (Green for match, Red for error)
        if (window.TypeEKeyboard) {
          window.TypeEKeyboard.flashKeyFeedback(typedChar, isMatch);
        }
      }
    } else if (diff < 0) {
      // Backspace
      let correct = 0;
      let incorrect = 0;
      for (let i = 0; i < currentVal.length && i < this.chars.length; i++) {
        if (currentVal[i] === this.chars[i]) correct++;
        else incorrect++;
      }
      this.correctChars = correct;
      this.incorrectChars = incorrect;
    }

    this.lastInputLength = currentLen;
    this.currentIndex = Math.min(currentLen, this.chars.length);

    this.updateHighlights(currentVal);
    this.calcStats();
    this.updateHUD();

    if (currentLen >= this.chars.length) {
      this.completeDrill();
    }
  }

  handleTypingKeyDown(e) {
    if (window.TypeEKeyboard) {
      window.TypeEKeyboard.highlightKey(e.key, true);
    }

    if (e.key === "Tab") {
      e.preventDefault();
      this.generateNewDrill();
    } else if (e.key === "Escape") {
      e.preventDefault();
      this.restartDrill();
    }
  }

  handleTypingKeyUp(e) {
    if (window.TypeEKeyboard) {
      window.TypeEKeyboard.highlightKey(e.key, false);
    }
  }

  insertCharFromVirtualKey(char) {
    if (this.status === "COMPLETE" || !this.inputEl) return;
    if (char === "Backspace") {
      this.inputEl.value = this.inputEl.value.slice(0, -1);
    } else if (char === "Space") {
      this.inputEl.value += " ";
    } else if (char.length === 1) {
      this.inputEl.value += char;
    }
    this.handleTypingInput();
    this.inputEl.focus();
  }

  trackKey(key, isCorrect) {
    if (!key || key === " ") return;
    const state = window.TypeEStorage.get();
    if (!state.keyStatistics) state.keyStatistics = {};
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
    const bar = document.querySelector("#practice-progress-fill");
    const text = document.querySelector("#practice-progress-text");
    if (bar) bar.style.width = `${pct}%`;
    if (text) text.textContent = `${pct}% (${this.currentIndex}/${this.chars.length})`;
  }

  calcStats() {
    const now = Date.now();
    const elapsedMinutes = this.startTime ? Math.max(0.015, (now - this.startTime) / 60000) : 0.015;

    const netWords = Math.max(0, this.correctChars / 5);
    this.liveWPM = Math.round(netWords / elapsedMinutes);

    if (this.totalAttempted > 0) {
      this.liveAccuracy = Math.max(0, Math.round((this.correctChars / this.totalAttempted) * 100));
    } else {
      this.liveAccuracy = 100;
    }
  }

  updateHUD() {
    const wpmEl = document.querySelector("#practice-live-wpm");
    const accEl = document.querySelector("#practice-live-acc");
    const charEl = document.querySelector("#practice-live-chars");
    const errEl = document.querySelector("#practice-live-errors");

    if (wpmEl) wpmEl.textContent = this.liveWPM;
    if (accEl) accEl.textContent = `${this.liveAccuracy}%`;
    if (charEl) charEl.textContent = this.correctChars;
    if (errEl) errEl.textContent = this.incorrectChars;
  }

  updateStatusBadge(text) {
    const badge = document.querySelector("#practice-status-badge");
    if (badge) badge.textContent = text;
  }

  completeDrill() {
    this.status = "COMPLETE";
    this.stopTimer();

    if (this.inputEl) this.inputEl.disabled = true;
    this.updateStatusBadge("DRILL FINISHED");

    if (window.TypeESettings) {
      window.TypeESettings.synth.playFinish(true);
    }

    // Save practice record separately (does NOT overwrite testHistory or ghostRecords)
    const record = {
      id: "PRAC-" + Date.now().toString(36),
      timestamp: Date.now(),
      focus: this.focusMode,
      wpm: this.liveWPM,
      accuracy: this.liveAccuracy,
      correctChars: this.correctChars,
      errors: this.incorrectChars,
      durationSec: this.elapsedSec
    };
    window.TypeEStorage.savePracticeRecord(record);

    // Re-analyze keys to update target chips with new data
    this.analyzeKeys();
    this.renderTargets();

    this.showResultsModal();
  }

  showResultsModal() {
    const setTxt = (id, val) => {
      const el = document.querySelector(id);
      if (el) el.textContent = val;
    };

    setTxt("#practice-res-wpm", `${this.liveWPM} WPM`);
    setTxt("#practice-res-acc", `${this.liveAccuracy}%`);
    setTxt("#practice-res-time", `${this.elapsedSec}s`);

    // Dynamic coach feedback advice
    const adviceEl = document.querySelector("#practice-feedback-text");
    if (adviceEl) {
      if (this.liveAccuracy >= 96 && this.liveWPM >= 60) {
        adviceEl.textContent = "🏆 Phenomenal finger dexterity! Your mechanical accuracy is razor sharp. Try testing this momentum against the Ghost Racer on the Circuit!";
      } else if (this.liveAccuracy >= 92) {
        adviceEl.textContent = "✨ Great control! You maintain clean accuracy on tricky finger combinations. Focus on keeping a steady, relaxed rhythm without pausing.";
      } else if (this.liveAccuracy >= 85) {
        adviceEl.textContent = "⚡ Solid effort! You had a few hesitations on finger transitions. Try practicing this exercise again, prioritizing clean key strikes over speed.";
      } else {
        adviceEl.textContent = "🎯 Slow down your fingers and focus strictly on hitting the correct keys cleanly. Speed naturally follows mechanical accuracy!";
      }
    }

    const modal = document.querySelector("#modal-practice-results");
    if (modal) modal.classList.add("active");
  }
}

window.TypeEPractice = new PracticeEngine();
