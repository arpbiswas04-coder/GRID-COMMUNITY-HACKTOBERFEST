# Typing Speed Trainer

> Measure speed and accuracy, and find the keys that slow you down.

Hack Day Haldia x GRID community - 6-hour build challenge

**Repo:** `team-zenith` | **Stack:** HTML + vanilla JavaScript | **Difficulty:** Medium-Hard | **Time:** 6 hours

## Brief
Typing tests give one number. Build a trainer that shows exactly where a typist loses time and drills those keys.

## Core tasks (must-do)
- [ ] Prompts at 3 difficulty levels plus custom text
- [ ] Live WPM, accuracy and countdown (30 / 60 / 120 s modes)
- [ ] Highlight correct and wrong characters while typing
- [ ] Per-key error heatmap drawn on an on-screen keyboard
- [ ] History of recent tests with a progress line chart
- [ ] Personal bests saved in localStorage
- [ ] Practice mode that drills your weakest keys

## Bonus tasks (only after the core works)
- [ ] Ghost cursor racing your previous best
- [ ] Themes and sound effects
- [ ] Alternative keyboard layouts
- [ ] Export history as CSV

## What is already here
- `index.html` - base page
- `script.js` - state, `save()` / `load()` (localStorage), `render()` and TODO function stubs
- `package.json` - `npm start` serves this folder

## Run locally
```bash
npm start   # or simply open index.html in your browser
```

## Deploy
Any static host works (for example GitHub Pages, Netlify or Vercel). There is no build step.

## Suggested pacing
- Hour 1: read this README, agree on a plan and split the work
- Hours 2-4: build the core tasks
- Hour 5: integrate, polish, then bonus tasks if time allows
- Hour 6: deploy, open the Pull Request, submit on the MLH platform (OrganizerHQ)

## Submission checklist
- [ ] All core tasks work end to end
- [ ] Project is deployed and the live link opens
- [ ] Pull Request created on the Voyage GitHub repository assigned to your team
- [ ] Project submitted on the MLH platform (OrganizerHQ) - instructions are shared at the start of the event

## Rules
- Build new features on top of this starter project and integrate them.
- Teams of 3-4; every member must be present.
- AI tools and open-source / open-weight models are fully allowed.
