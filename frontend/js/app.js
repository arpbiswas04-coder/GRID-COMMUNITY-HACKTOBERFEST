// ==========================================================================
// TYPE.E — APPLICATION BOOTSTRAPPER (app.js)
// Independent configuration management & lifecycle controllers
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Load centralized state
  const state = window.TypeEStorage.load();

  // 2. Sound button state
  if (window.TypeESettings) {
    window.TypeESettings.updateSoundButton();
  }

  const soundBtn = document.querySelector("#btn-sound-toggle");
  if (soundBtn) {
    soundBtn.onclick = () => window.TypeESettings.toggleSound();
  }

  // 3. Global Modal Closers
  document.querySelectorAll("[data-close-modal]").forEach(btn => {
    btn.onclick = (e) => {
      const modal = e.target.closest(".modal-overlay");
      if (modal) modal.classList.remove("active");
    };
  });

  // 4. Page Routing & Initialization
  const pathname = window.location.pathname.toLowerCase();

  if (pathname.includes("home") || pathname.endsWith("/") || pathname.endsWith("index.html") || document.querySelector("#btn-enter-arena")) {
    initHomePage();
  } else if (pathname.includes("race")) {
    initRacePage();
  } else if (pathname.includes("analytics") || pathname.includes("stats")) {
    initAnalyticsPage();
  } else if (pathname.includes("practice")) {
    initPracticePage();
  }
});

// --------------------------------------------------------------------------
// HOMEPAGE CONTROLLER — INDEPENDENT 5 CONFIGURATION CATEGORIES
// --------------------------------------------------------------------------
function initHomePage() {
  const state = window.TypeEStorage.get();

  const setActive = (selector, val, attr = "data-val") => {
    document.querySelectorAll(selector).forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute(attr) === String(val));
    });
  };

  // Set initial UI state independently
  setActive(".opt-diff", state.difficulty);
  setActive(".opt-time", state.duration);
  setActive(".opt-choice", state.promptChoice);
  setActive(".opt-layout", state.keyboardLayout);

  const customWrapper = document.querySelector("#custom-text-wrapper");
  const customInput = document.querySelector("#custom-text-input");
  if (customInput && state.customPassage) {
    customInput.value = state.customPassage;
  }

  // CRITICAL FIX: Custom text box display is strictly governed by promptChoice
  const updateCustomVisibility = () => {
    if (customWrapper) {
      customWrapper.style.display = (state.promptChoice === "custom") ? "flex" : "none";
    }
  };
  updateCustomVisibility();

  // CARD 1: DIFFICULTY LEVEL (Independent: does NOT touch promptChoice)
  document.querySelectorAll(".opt-diff").forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      const val = btn.dataset.val;
      setActive(".opt-diff", val);
      state.difficulty = val;
      window.TypeEStorage.save();
    };
  });

  // CARD 2: SET TIME (Independent)
  document.querySelectorAll(".opt-time").forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      const val = parseInt(btn.dataset.val, 10);
      setActive(".opt-time", val);
      state.duration = val;
      window.TypeEStorage.save();
    };
  });

  // CARD 3: CHOICE (Independent: strictly toggles default vs custom text)
  document.querySelectorAll(".opt-choice").forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      const val = btn.dataset.val;
      setActive(".opt-choice", val);
      state.promptChoice = val;
      window.TypeEStorage.save();
      updateCustomVisibility();
    };
  });

  // CARD 4: KEYBOARD LAYOUT (Independent: QWERTY, Dvorak, Colemak)
  document.querySelectorAll(".opt-layout").forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      const val = btn.dataset.val;
      setActive(".opt-layout", val);
      state.keyboardLayout = val;
      window.TypeEStorage.save();
    };
  });

  // ENTER THE ARENA CTA
  const enterBtn = document.querySelector("#btn-enter-arena");
  if (enterBtn) {
    enterBtn.onclick = (e) => {
      e.preventDefault();

      if (state.promptChoice === "custom") {
        const text = customInput ? customInput.value.trim() : "";
        if (text.length < 15) {
          if (window.TypeESettings) window.TypeESettings.showToast("Custom text must be at least 15 characters!", "error");
          if (customInput) customInput.focus();
          return;
        }
        state.customPassage = text;
        window.TypeEStorage.save();
      }

      window.location.href = "race.html";
    };
  }
}

// --------------------------------------------------------------------------
// RACE / TYPING PAGE CONTROLLER
// --------------------------------------------------------------------------
function initRacePage() {
  window.TypeERace.init("#racing-circuit-svg");
  window.TypeETyping.init("#typing-input", "#passage-display");
  window.TypeEKeyboard.init("#virtual-keyboard");
  window.TypeETyping.setupTest();

  // Quick restart race
  const restartBtn = document.querySelector("#btn-restart");
  if (restartBtn) {
    restartBtn.onclick = () => window.TypeETyping.setupTest();
  }

  // Quick Drill Weak Keys button above keyboard
  const drillBtn = document.querySelector("#btn-quick-drill");
  if (drillBtn) {
    drillBtn.onclick = () => {
      window.location.href = "practice.html";
    };
  }

  // Results Modal Buttons
  const retryBtn = document.querySelector("#btn-results-retry");
  if (retryBtn) {
    retryBtn.onclick = () => {
      const modal = document.querySelector("#modal-results");
      if (modal) modal.classList.remove("active");
      window.TypeETyping.setupTest();
    };
  }

  const practiceBtn = document.querySelector("#btn-results-practice");
  if (practiceBtn) {
    practiceBtn.onclick = () => {
      window.location.href = "practice.html";
    };
  }

  const analyticsBtn = document.querySelector("#btn-results-analytics");
  if (analyticsBtn) {
    analyticsBtn.onclick = () => {
      window.location.href = "analytics.html";
    };
  }
}

// --------------------------------------------------------------------------
// ANALYTICS PAGE CONTROLLER
// --------------------------------------------------------------------------
function initAnalyticsPage() {
  window.TypeEAnalytics.init();
}

// --------------------------------------------------------------------------
// PRACTICE PAGE CONTROLLER
// --------------------------------------------------------------------------
function initPracticePage() {
  window.TypeEPractice.init();
}
