# 💊 MedTrack — Medication Reminder & Adherence Tracker

A privacy-first medication reminder app that helps people stay on top of their doses, see how consistent they've been, and catch low prescriptions before they run out. Built with React, React Router, Tailwind CSS v4, and browser-native notifications — no backend, no account, no data leaving the device.

> **Why this project exists:** missed doses are a real, common problem — not a toy CRUD demo. This app treats "add a reminder" as the *start* of the flow, not the end of it: it also has to know when a dose is due, prompt the person in the moment, record what actually happened, and show them the pattern over time. That loop (schedule → notify → log → analyze) is what the codebase is built around.

**[Live demo](#) · [Screenshots](#screenshots) · [Getting started](#-getting-started)**

---

## Screenshots

| Dashboard (light) | Dashboard (dark) | Add reminder |
|---|---|---|
| ![alt text](image.png) | ![alt text](image-2.png) | ![alt text](image-1.png) |

| History & adherence chart | Settings |
|---|---|
| _add screenshot_ | _add screenshot_ |

---

## ✨ Features

### Core
- **Today's schedule, not just a list.** The dashboard computes *every dose due today* from each medication's frequency rule (daily / specific weekdays / one-time), splits it into "Up next" and "Completed today," and shows live stats (doses today, taken, missed, adherence %).
- **Real browser notifications.** A polling engine checks the clock every 20 seconds and fires a native `Notification` plus an actionable in-app toast the moment a dose is due — with a one-tap "Mark taken" button, not just a beep.
- **Multiple times per medication.** A twice-daily prescription is one reminder with two times, not two duplicate entries.
- **Flexible scheduling.** Every day, specific weekdays (e.g. Mon/Wed/Fri), or a single one-off date.
- **Pill count & low-stock warnings.** Track pills remaining per medication; taking a dose decrements the count automatically, and the dashboard flags anything at or below its reorder threshold.
- **Dose history that's actually real.** Every "taken" / "missed" action is logged with a timestamp — the History page isn't hardcoded sample data, it's built entirely from what the user actually did.
- **7-day adherence chart.** A hand-rolled SVG bar chart (no charting library needed) visualizes the last week's adherence at a glance.

### Product polish
- **Full dark mode**, class-based via Tailwind v4's `@custom-variant`, persisted and synced to system preference on first load.
- **Search/filter** medications on the dashboard.
- **Custom confirm modals** instead of `window.confirm` for destructive actions (delete reminder, clear all data).
- **Data portability.** Export all reminders + history to a `.json` backup file, and re-import it — useful for switching devices or just having a safety net, since everything otherwise lives only in `localStorage`.
- **Empty, loading, and error states** designed on purpose, not left as blank screens.
- **Responsive, mobile-first layout** with a bottom tab bar on small screens and a top nav on larger ones.
- **Accessible by default:** semantic labels on icon-only buttons, visible focus states, sufficient color contrast in both themes.

---

## 🧠 Architecture & technical decisions

This section is here because *how* it's built is the point of a portfolio project, not just what it looks like.

- **State: React Context, not Redux.** The original scaffold pulled in Redux Toolkit before a single reducer existed. Two small contexts (`ReminderContext`, `ThemeContext`) plus one `useLocalStorage` hook cover the app's actual state needs — no boilerplate for state that doesn't exist yet. If the app grows a sync backend, `ReminderContext`'s public API (`addReminder`, `logDose`, `todaysSchedule`, `stats`, …) is the seam where that would slot in without touching any component.
- **Derived state, computed once.** `todaysSchedule` and `stats` are `useMemo`-derived from `reminders` + `history` rather than duplicated and kept in sync by hand — there's exactly one source of truth for "what's due today."
- **Domain logic lives in `utils/`, not components.** Time formatting/parsing, "is this reminder active today," and greeting logic are pure functions, independently testable, and reused across Dashboard, AddReminder, and the notification engine instead of being copy-pasted into each.
- **Notifications degrade gracefully.** `Notification` API access is feature-detected and wrapped in `try/catch`; if permission is denied or the API is unavailable, the in-app toast still fires, so the reminder never silently disappears.
- **No dead dependencies.** The original `package.json` shipped `@reduxjs/toolkit`, `react-redux`, and `react-icons` — none used anywhere in the code. They're gone; every dependency here is imported somewhere.

### Data model

```ts
// A medication and its schedule
Reminder {
  id: string
  name: string                  // "Metformin"
  dosage: string                // "500mg"
  times: string[]               // ["08:00", "20:00"]  (24h, sorted)
  frequency: "daily" | "weekly" | "once"
  days: number[]                // [1,3,5] for "weekly" (0=Sun..6=Sat)
  date: string | null           // "2026-08-04" for "once"
  notes: string
  pillsRemaining: number | null
  lowStockThreshold: number | null
  createdAt: string             // ISO timestamp
}

// One logged dose outcome
HistoryEntry {
  id: string
  reminderId: string
  reminderName: string
  dosage: string
  time: string          // "08:00"
  date: string           // "2026-08-01"
  status: "taken" | "missed"
  loggedAt: string        // ISO timestamp
}
```

### Project structure

```
src/
├── components/       # Presentational + reusable UI (cards, modals, nav, charts)
├── context/          # ReminderContext (data + actions), ThemeContext (dark mode)
├── hooks/            # useLocalStorage, useDueDoseNotifications
├── pages/            # Dashboard, AddReminder, History, Settings, NotFound
├── utils/            # time.js (pure date/time helpers), id.js
├── mock/             # Seed data shown on first launch
├── Providers.jsx     # Composes context providers
└── main.jsx          # Router setup + entry point
```

---

## 🛠️ Tech stack

| Layer | Choice | Why |
|---|---|---|
| UI | React 19 + Vite 7 | Fast dev loop, modern React (no class components, no unnecessary abstraction) |
| Routing | React Router 7 | Nested routes via a single `<Layout>` shell |
| Styling | Tailwind CSS v4 | CSS-first config (`@import "tailwindcss"`), class-based dark mode via `@custom-variant` |
| Icons | lucide-react | Consistent, tree-shakeable icon set |
| Notifications | Web Notification API + `react-hot-toast` | Native OS notification with an in-app fallback that always works |
| Persistence | `localStorage` (via a custom hook) | No backend required; every write is synchronous and instant |
| State | React Context + hooks | No state library needed for this scope — see [Architecture](#-architecture--technical-decisions) |

No backend is required to run this app — everything persists in the browser via `localStorage`. That's a deliberate scope decision (see [Roadmap](#️-roadmap)), not a limitation the code is unaware of: `exportData`/`importData` exist specifically so a real API layer could be dropped in later without a data-migration headache.

---

## 🚀 Getting started

**Requirements:** Node.js 20.19+ (or 22.12+) and npm.

```bash
git clone https://github.com/AyeshaShahid10/MedicationReminder.git
cd MedicationReminder
npm install
npm run dev       # starts the dev server at http://localhost:5173
```

Other scripts:

```bash
npm run build      # production build to /dist
npm run preview    # preview the production build locally
npm run lint        # run ESLint
```

On first launch the app seeds three sample medications so the UI is never empty — clear them anytime from **Settings → Clear all data**.

### Trying notifications

Browser notifications require explicit permission. Go to **Settings → Notifications** and toggle it on (or hit **Send test notification**) — the browser will prompt for permission on first use. Add a reminder for a minute or two in the future to see the full due-dose flow end to end.

---

## 🗺️ Roadmap

Ideas for where this goes next, in rough priority order:

- [ ] Optional account + cloud sync (Supabase/Firebase) so data isn't device-locked
- [ ] Service-worker-based notifications so reminders fire even when the tab is closed
- [ ] Caregiver/family sharing — a second person can see adherence for someone they support
- [ ] Medication interaction warnings via an external drug database API
- [ ] CSV export of history for sharing with a doctor
- [ ] Unit tests for the scheduling/adherence logic in `utils/time.js`

---

## 📄 License

MIT — free to use, modify, and learn from.

---

Built by [Ayesha Shahid](https://github.com/AyeshaShahid10).
