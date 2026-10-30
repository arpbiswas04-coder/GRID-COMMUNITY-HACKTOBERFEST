# TYPE.E — Type Smarter. Improve Faster.

> **TYPE FAST. DRIVE FASTER.** An arcade-inspired, neo-brutalist typing speed trainer featuring real-time ghost racing on an SVG Grand Prix circuit, colourful error heatmaps, and weak-key dexterity drills.
> Built for **Hack Day Haldia × GRID Community**.

---

## 1. Project Overview

**Type.e** bridges the gap between typing analytics and arcade racing mechanics. Instead of delivering a single arbitrary speed metric at the end of a test, Type.e provides real-time telemetry, an immersive curved SVG racing circuit against your previous personal-best session, character-by-character visual feedback, colourful per-key error heatmaps across 3 distinct keyboard layouts (QWERTY, Dvorak, Colemak), and algorithmic weak-key drills to help typists systematically eradicate mechanical bottlenecks.

---

## 2. Project Architecture & Structure

```
Team-Zenith/
│
├── frontend/
│   ├── index.html                 # Redirect entrypoint to pages/home.html
│   ├── pages/
│   │   ├── home.html              # Dedicated landing & 5 configuration cards
│   │   ├── race.html              # Compact telemetry & SVG Grand Prix circuit
│   │   ├── analytics.html         # Personal records, WPM curve & CSV exports
│   │   └── practice.html          # Targeted weak-key training drills
│   │
│   ├── css/
│   │   ├── main.css               # Unified Neo-Brutalist design system & wordmark
│   │   ├── home.css               # Hero layout, keyboard illustration & 5 cards
│   │   ├── race.css               # Circuit centerpiece, telemetry & rebuilt keyboard
│   │   ├── analytics.css          # Personal bests showcase & progression curve
│   │   └── practice.css           # Weak-key target chips & drill launcher
│   │
│   ├── js/
│   │   ├── storage.js             # Centralized LocalStorage data layer & ghost PB
│   │   ├── settings.js            # Web Audio API synthesizer & toast alerts
│   │   ├── typing-engine.js       # Single-source-of-truth stroke & passage engine
│   │   ├── race-engine.js         # SVG path telemetry & 60 FPS car navigation
│   │   ├── keyboard.js            # 15-unit QWERTY, Dvorak, Colemak & heatmap
│   │   ├── analytics.js           # Chart.js progression curve & CSV exporter
│   │   ├── practice.js            # Algorithmic weak-key sentence generator
│   │   └── app.js                 # Independent 5-category state & lifecycle
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
1. **Difficulty Level**: Easy (simple sentences), Medium (automotive & technical prose), Hard (complex engineering telemetry), and Custom (allows custom passages).
2. **Set Time**: 30 seconds sprint, 60 seconds standard, and 120 seconds endurance.
3. **Choice**: Default Curated Prompts or Custom Text (reveals an integrated textarea).
4. **Layout**: QWERTY, Dvorak, and Colemak.
5. **Visual Style**: Locked to exactly ONE consistent Neo-Brutalist Arcade theme (Cream `#F7F4EA`, Arcade Yellow `#FFE600`, bold 3px black borders, offset drop shadows). No dark/light switching.
- **ENTER THE ARENA ▶**: Big yellow CTA that validates configuration, persists selections, and navigates directly to the race.

### 🏎️ Winding SVG Grand Prix Circuit (`pages/race.html`)
- **Curved Racing Circuit**: Scalable SVG track with dark asphalt (`#1E2024`), red-and-white kerbs, checkered start/finish lines, distance markers, and decorative trackside greenery.
- **Mathematical Path Positioning**: Cars smoothly calculate exact `(x, y)` coordinates along the SVG curve via `getPointAtLength` with tangent rotation angle (`atan2`), giving natural steering and cornering.
- **Player & Ghost Car Telemetry**:
  - **Player Car (#01)**: Dynamic red/yellow arcade racer whose position advances with typing character completion and live WPM.
  - **Ghost Car (#00)**: Translucent cyan/blue racer replaying the user's previous personal-best session.
  - **First-Time User Behaviour**: If no previous completed session exists, only the Player Car is rendered on track. The session is recorded upon completion, and becomes the Ghost Car for all future sprints.
- **Compact Layout**: Carefully proportioned for standard desktop screens (1366×768, 1440×900, 1536×864) with telemetry, circuit, passage, and keyboard visible without excessive scrolling.

### ⌨️ Rebuilt 15-Unit Keyboard & Error Heatmap
- **Accurate Character-to-Physical Mappings**: True layouts for **QWERTY**, **DVORAK**, and **COLEMAK** (not merely relabeled keys).
- **Mathematical 15-Unit Alignment**: Key widths proportionally budgeted across rows (Backspace 2.0u, Tab 1.5u, Caps 1.75u, Enter 2.25u, Left Shift 2.25u, Right Shift 2.75u, Spacebar 6.25u).
- **Colourful Heatmap**:
  - Untested: `#E7E2DA`
  - Excellent (`<3%` errors): `#42C978` (Green)
  - Low errors (`3% - 8%`): `#9BD96C` (Light Green)
  - Moderate errors (`8% - 15%`): `#FFE66D` (Yellow)
  - High errors (`15% - 25%`): `#FF9C42` (Orange)
  - Critical errors (`>25%`): `#F04444` (Red)
  - Active pressed key: `#42C9F5` (Cyan)
- **Tooltip Statistics**: Hovering over any physical key displays attempts, mistakes, and computed error percentage.
- **Weak-Key Practice Drills**: One-click drill launcher above the keyboard targeting detected weak keys.

### 📊 Analytics & Records (`pages/analytics.html`)
- **Personal Records Showcase**: Highest WPM, Best Accuracy, Best 30s, Best 60s, Best 120s, and total characters typed.
- **WPM Progression Curve**: Chart.js interactive graph showing chronological speed progression (with native Canvas fallback if offline).
- **Sprint Archives**: Detailed log of past sprints.
- **CSV Export**: Instant download of test history via standard CSV formatting.

### 🎯 Practice Drills (`pages/practice.html`)
- Analyzes per-key statistics, extracts top bottleneck keys, and deterministically generates targeted sentences packed with those specific characters.

---

## 4. Technical Stack

- **Frontend**: HTML5, Vanilla CSS3 (Neo-Brutalist variables & tokens), Vanilla JavaScript (ES2022+ modules).
- **Track Graphics**: Scalable Vector Graphics (SVG) with mathematical tangent curve navigation.
- **Audio**: Web Audio API (`AudioContext`, `OscillatorNode`, `GainNode` for mechanical key switch clicks, typo warning buzzes, and victory fanfares).
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
