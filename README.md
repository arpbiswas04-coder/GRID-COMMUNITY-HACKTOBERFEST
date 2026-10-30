# TYPE.E — Type Smarter. Improve Faster.

> **TYPE FAST. DRIVE FASTER.** An arcade-inspired, neo-brutalist typing speed trainer featuring real-time ghost racing, colourful error heatmaps, and weak-key drills.
> Built for **Hack Day Haldia × GRID Community**.

---

## 1. Project Overview

**Type.e** bridges the gap between typing analytics and arcade racing mechanics. Instead of delivering a single arbitrary speed metric at the end of a test, Type.e provides real-time telemetry, visual track visualization against your previous completed typing session, character-by-character visual feedback, colourful per-key error heatmaps, and algorithmic weak-key drills to help typists systematically eradicate mechanical bottlenecks.

---

## 2. Project Architecture & Structure

```
Team-Zenith/
│
├── frontend/
│   ├── index.html                 # Redirect entrypoint to pages/home.html
│   ├── pages/
│   │   ├── home.html              # Dedicated landing & configuration page
│   │   ├── race.html              # Compact telemetry & racing circuit dashboard
│   │   ├── analytics.html         # Personal records, WPM curve & CSV exports
│   │   └── practice.html          # Targeted weak-key training drills
│   │
│   ├── css/
│   │   ├── main.css               # Core Neo-Brutalist design system & wordmark
│   │   ├── home.css               # Hero layout, keyboard illustration & 5 cards
│   │   ├── race.css               # Compact race dashboard, telemetry & keyboard
│   │   ├── analytics.css          # Personal bests showcase & progression curve
│   │   ├── practice.css           # Weak-key target chips & drill launcher
│   │   └── themes.css             # Neo Yellow, Dark Arcade & Light Minimal
│   │
│   ├── js/
│   │   ├── storage.js             # Centralized LocalStorage data layer
│   │   ├── settings.js            # Theme switcher & Web Audio synthesizer
│   │   ├── typing-engine.js       # Single-source-of-truth input engine
│   │   ├── race-engine.js         # 60 FPS Canvas track & ghost replay
│   │   ├── keyboard.js            # Colourful error heatmap & layouts
│   │   ├── analytics.js           # Chart.js progression curve & CSV exporter
│   │   ├── practice.js            # Algorithmic weak-key sentence generator
│   │   └── app.js                 # Global lifecycle, routing & configuration
│   │
│   └── assets/
│       ├── images/
│       ├── icons/
│       └── sounds/
│
├── backend/
│   └── server.js                  # Lightweight native Node.js static server
│
├── package.json
├── README.md
└── .gitignore
```

---

## 3. Key Features

### 🏁 Homepage Configuration (5 Cards in 1 Row)
1. **Difficulty Level**: Easy (simple sentences), Medium (automotive & technical prose), Hard (complex engineering telemetry), and Custom (paste your own text).
2. **Set Time**: 30 seconds sprint, 60 seconds standard, and 120 seconds endurance.
3. **Choice**: Default Curated Prompts or Custom Text (reveals an integrated textarea).
4. **Layout**: QWERTY, Dvorak, and Colemak.
5. **Theme**: Neo (Default Yellow/Cream), Dark Arcade (Neon/Dark), Light Minimal (Clean high-contrast).
- **ENTER THE ARENA**: Big yellow CTA saving selections and immediately launching the race.

### 🏎️ Compact Racing Dashboard (`pages/race.html`)
- **Balanced Two-Column Layout**: Carefully proportioned for 1366×768, 1440×900, and 1536×864 displays without forcing excessive vertical scrolling.
- **Left Telemetry Sidebar**: Live WPM, accuracy percentage, countdown timer, total strokes attempted, correct characters, and mistakes. (Personal bests panel removed to keep the dashboard focused).
- **Previous-Session Ghost Racing**:
  - **First-Ever Session**: Only Player Car (#01) is displayed on track. No ghost car or fake records appear. Upon completion, the session timeline is recorded.
  - **Second Session Onwards**: The previous completed session is loaded as the Ghost Car (#00). The ghost smoothly replays the prior performance via linear interpolation, while the player car responds to live WPM.
- **Single-Source Input Engine**: An integrated input source eliminates character skipping and double-input bugs. Rapid typing, Backspace, spaces, and virtual keyboard clicks are processed reliably without state desynchronization.
- **Weak-Key Suggestions**: Positioned directly above the virtual keyboard showing detected bottleneck keys (e.g. `[H 28%] [C 22%] [P 18%]`) with a quick-drill launch button.
- **Colourful Keyboard Heatmap**:
  - Untested: `#E7E2DA`
  - Excellent (`<3%` errors): `#42C978`
  - Low errors (`3% - 8%`): `#9BD96C`
  - Moderate errors (`8% - 15%`): `#FFE66D`
  - High errors (`15% - 25%`): `#FF9C42`
  - Very high errors (`>25%`): `#F04444`
  - Active pressed key: `#42C9F5`

### 📊 Analytics & Records (`pages/analytics.html`)
- **Personal Records Showcase**: Highest WPM, Best Accuracy, Best 30s, Best 60s, Best 120s, and total characters typed.
- **WPM Progression Curve**: Chart.js interactive graph showing chronological speed progression (with native Canvas fallback if offline).
- **Sprint Archives**: Detailed log of past sprints.
- **CSV Export**: Instant download of test history via standard CSV formatting.

### 🎯 Practice Drills (`pages/practice.html`)
- Analyzes per-key statistics, extracts top bottleneck keys, and deterministically generates targeted sentences packed with those specific characters.

---

## 4. Technical Stack

- **Frontend**: HTML5, CSS3 (Neo-Brutalist variables & tokens), Vanilla JavaScript (ES2022+ modules).
- **Graphics**: HTML5 Canvas 2D API (`requestAnimationFrame` continuous 60 FPS animation loop).
- **Audio**: Web Audio API (`AudioContext`, `OscillatorNode`, `GainNode` for native clicks, buzzes, beeps, and fanfares).
- **Backend / Dev Server**: Native Node.js built-in modules (`http`, `fs`, `path`, `url`). Zero external dependencies!
- **Data Persistence**: HTML5 `localStorage` with migration-safe state handling under key `"hackday-haldia-team-zenith"`.

---

## 5. Running Locally

1. Navigate to the repository directory:
   ```bash
   cd Team-Zenith
   ```
2. Start the local server:
   ```bash
   npm start
   ```
3. Open your web browser:
   ```
   http://localhost:3000
   ```

---

*Type.e — Team Zenith — Hack Day Haldia × GRID Community*
