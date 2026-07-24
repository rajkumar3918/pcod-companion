# PCOD Companion

Diet, habit-tracking, and reference app for PCOD/PMOS care. Shared-device design with up to 4 Netflix-style profiles — no login, no passwords. React + Vite frontend, Firebase (Firestore + Hosting + silent Anonymous Auth) backend.

## 1. Install

```
npm install
```

## 2. Connect Firebase

1. Create a project at console.firebase.google.com (or use an existing one).
2. **Authentication → Sign-in method → enable Anonymous.** (Not Email/Password — there's no login screen. This just gives each device a stable, private identity behind the scenes so Firestore rules can keep data separated.)
3. Firestore Database → Create database → **production mode**.
4. Project settings → General → Add app → Web → copy the config.
5. Copy `.env.example` to `.env` and fill in those values.

```
cp .env.example .env
```

## 3. Run locally

```
npm run dev
```

First launch: the app signs in anonymously in the background (no visible screen), then shows "Who's this for?" — add up to 4 profiles, pick one, and it remembers that choice on this device/browser going forward. Tap the avatar circle on the Home screen anytime to switch profiles.

## 4. Deploy Firestore security rules

```
npm install -g firebase-tools   # once
firebase login                  # once
firebase init                   # choose your existing project; Firestore + Hosting
firebase deploy --only firestore:rules
```

**Important:** if `firebase init` asks to overwrite `firestore.rules` with a version downloaded from the console, say yes only if you then double check the file still matches the one in this repo afterward — the console's default is usually a placeholder, not the real rule.

## 5. Deploy the app

Make sure `firebase.json` has `"public": "dist"` (not `"public"`) — that's the folder Vite actually builds into.

```
npm run build
firebase deploy --only hosting
```

Free `your-project.web.app` URL. Open on a phone, "Add to Home Screen" for an app-like icon (PWA, no App Store needed).

## Project structure

- `src/data/` — meal options, info-tab content, habits list, condition list, design tokens.
- `src/firebase/` — `config.js` (env-based setup), `auth.js` (silent anonymous sign-in), `profiles.js` (create/list profiles, capped at 4), `firestore.js` (`getLog`, `setLog`, `listLogsForMonth` — all scoped by profile).
- `src/contexts/` — `AuthContext` (the anonymous device identity), `ProfileContext` (which of the up-to-4 profiles is active, remembered via localStorage).
- `src/screens/` — `ProfileSelectScreen` (the "who's this for" picker), `Home`, `Diet`, `Tracker`, `Calendar`, `InfoDetail`.
- `firestore.rules` — each device's anonymous identity can only read/write its own `users/{deviceId}` tree; profiles and their logs live underneath it.

## Data model

```
users/{deviceId}                                     — one per device/browser (anonymous auth uid)
users/{deviceId}/profiles/{profileId}                 — up to 4: { name, color, createdAt }
users/{deviceId}/profiles/{profileId}/logs/{YYYY-MM-DD}
  condition: "normal" | "unwell" | "periods"
  meals: { empty, breakfast, mid, lunch, evening, dinner }
  habits: { empty, protein, midmorning, lunch, vitc, dinner, water, move, sleep }
```

## A note on this security model

Because there's no email/password, "who someone is" is really "which device/browser they're on." Firestore rules still block anyone else from reading or writing your data even if they had the URL — but if someone opens the app on the *same* device, they see the *same* set of up to 4 profiles (that's the intended Netflix-style behavior for a shared family device). If you ever want real per-person accounts (e.g., different people on different phones seeing the same shared profiles), that needs real auth again — ask if that becomes useful later.

## Icons

`public/icons/icon-192.png` and `icon-512.png` are placeholders (plain green circle). Swap for real artwork before shipping.

## Cost

Free at this scale under Firebase's Spark (free) tier: 50k reads/day, 20k writes/day, 1GB storage, 10GB hosting bandwidth/month. No server to maintain.
