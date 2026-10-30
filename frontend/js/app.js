// ==========================================================================
// TYPE.E — APPLICATION BOOTSTRAPPER (app.js)
// Unified lifecycle management, navigation & page initialization
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Load centralized state
  const state = window.TypeEStorage.load();

  // 2. Apply theme
  window.TypeESettings.applyTheme(state.theme || "neo-yellow");
  window.TypeESettings.updateSoundButton();

  // 3. Bind global controls (sound, layout, theme)
  const soundBtn = document.querySelector("#btn-sound-toggle");
  if (soundBtn) {
    soundBtn.onclick = () => window.TypeESettings.toggleSound();
  }

  const layoutSelect = document.querySelector("#keyboard-layout-select");
  if (layoutSelect) {
    layoutSelect.value = state.keyboardLayout || "qwerty";
    layoutSelect.onchange = (e) => {
      window.TypeEStorage.update({ keyboardLayout: e.target.value });
      if (window.TypeEKeyboard) window.TypeEKeyboard.render();
      window.TypeESettings.showToast(`Layout changed to ${e.target.value.toUpperCase()}`);
    };
  }

  const themeSelect = document.querySelector("#theme-select");
  if (themeSelect) {
    themeSelect.value = state.theme || "neo-yellow";
    themeSelect.onchange = (e) => {
      window.TypeESettings.applyTheme(e.target.value);
      window.TypeESettings.showToast(`Theme updated`);
    };
  }

  // 4. Modal Close Triggers
  document.querySelectorAll("[data-close-modal]").forEach(btn => {
    btn.onclick = (e) => {
      const modal = e.target.closest(".modal-overlay");
      if (modal) modal.classList.remove("active");
    };
  });

  // 5. Page-Specific Initializations
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
// HOMEPAGE CONTROLLER
// --------------------------------------------------------------------------
function initHomePage() {
  const state = window.TypeEStorage.get();

  // Highlight active buttons based on saved state
  const setActiveOption = (selector, value, attr = "data-val") => {
    document.querySelectorAll(selector).forEach(btn => {
      const match = btn.getAttribute(attr) === String(value);
      btn.classList.toggle("active", match);
    });
  };

  setActiveOption(".opt-diff", state.difficulty);
  setActiveOption(".opt-time", state.duration);
  setActiveOption(".opt-choice", state.promptChoice);
  setActiveOption(".opt-layout", state.keyboardLayout);
  setActiveOption(".opt-theme", state.theme);

  // Toggle Custom Textarea visibility
  const customWrapper = document.querySelector("#custom-text-wrapper");
  const customInput = document.querySelector("#custom-text-input");
  if (customInput && state.customPassage) {
    customInput.value = state.customPassage;
  }

  const updateCustomVisibility = () => {
    const isCustom = state.difficulty === "custom" || state.promptChoice === "custom";
    if (customWrapper) {
      customWrapper.style.display = isCustom ? "flex" : "none";
    }
  };
  updateCustomVisibility();

  // Card 1: Difficulty
  document.querySelectorAll(".opt-diff").forEach(btn => {
    btn.onclick = () => {
      setActiveOption(".opt-diff", btn.dataset.val);
      state.difficulty = btn.dataset.val;
      if (state.difficulty === "custom") state.promptChoice = "custom";
      window.TypeEStorage.save();
      updateCustomVisibility();
    };
  });

  // Card 2: Set Time
  document.querySelectorAll(".opt-time").forEach(btn => {
    btn.onclick = () => {
      setActiveOption(".opt-time", btn.dataset.val);
      state.duration = parseInt(btn.dataset.val, 10);
      window.TypeEStorage.save();
    };
  });

  // Card 3: Choice
  document.querySelectorAll(".opt-choice").forEach(btn => {
    btn.onclick = () => {
      setActiveOption(".opt-choice", btn.dataset.val);
      state.promptChoice = btn.dataset.val;
      if (state.promptChoice === "custom") state.difficulty = "custom";
      window.TypeEStorage.save();
      updateCustomVisibility();
    };
  });

  // Card 4: Layout
  document.querySelectorAll(".opt-layout").forEach(btn => {
    btn.onclick = () => {
      setActiveOption(".opt-layout", btn.dataset.val);
      state.keyboardLayout = btn.dataset.val;
      window.TypeEStorage.save();
    };
  });

  // Card 5: Theme
  document.querySelectorAll(".opt-theme").forEach(btn => {
    btn.onclick = () => {
      setActiveOption(".opt-theme", btn.dataset.val);
      state.theme = btn.dataset.val;
      window.TypeEStorage.save();
      window.TypeESettings.applyTheme(state.theme);
    };
  });

  // Enter the Arena CTA
  const enterBtn = document.querySelector("#btn-enter-arena");
  if (enterBtn) {
    enterBtn.onclick = () => {
      if (state.promptChoice === "custom" || state.difficulty === "custom") {
        const text = customInput ? customInput.value.trim() : "";
        if (text.length < 15) {
          window.TypeESettings.showToast("Custom text must be at least 15 characters!", "error");
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
  window.TypeERace.init("#racing-canvas");
  window.TypeETyping.init("#typing-input", "#passage-display");
  window.TypeEKeyboard.init("#virtual-keyboard");
  window.TypeETyping.setupTest();

  // Restart Button
  const restartBtn = document.querySelector("#btn-restart");
  if (restartBtn) {
    restartBtn.onclick = () => {
      window.TypeETyping.setupTest();
    };
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
