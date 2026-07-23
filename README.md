# PCOD Companion

Multi-user diet, habit-tracking, and reference app for PCOD/PMOS care. React + Vite frontend, Firebase (Auth + Firestore + Hosting) backend.

## 1. Install

```
npm install
```

## 2. Connect Firebase

1. Create a project at console.firebase.google.com.
2. Authentication → Sign-in method → enable **Email/Password**.
3. Firestore Database → Create database → **production mode**.
4. Project settings → General → Add app → Web → copy the config.
5. Copy `.env.example` to `.env` and fill in the values from that config.

```
cp .env.example .env
```

## 3. Run locally

```
npm run dev
```

## 4. Deploy Firestore security rules

These are what actually keep each user's data private — do this before real users sign up:

```
npm install -g firebase-tools   # once
firebase login                  # once
firebase init                   # choose your existing project; Firestore + Hosting
firebase deploy --only firestore:rules
```

## 5. Deploy the app

```
npm run build
firebase deploy --only hosting
```

You'll get a free `your-project.web.app` URL. Open it on a phone and use the browser's "Add to Home Screen" — it installs like an app (this is a PWA, no App Store needed).

## Project structure

- `src/data/` — meal options, info-tab content, habits list, condition list, design tokens. Edit these to change what the app suggests, no logic changes needed.
- `src/firebase/` — auth + Firestore helpers. `firestore.js` has the only three functions that talk to the database: `getLog`, `setLog`, `listLogsForMonth`.
- `src/screens/` — one file per screen (Login, Signup, Home, Diet, Tracker, Calendar, InfoDetail).
- `src/components/` — shared UI pieces (MealCard, ChangeMealSheet, ShoppingListCard, BottomNav, etc.)
- `firestore.rules` — security rules; each user can only read/write their own `users/{uid}` document tree.

## Data model

```
users/{uid}                          — profile (displayName, createdAt)
users/{uid}/logs/{YYYY-MM-DD}        — one document per day
  condition: "normal" | "unwell" | "periods"
  meals: { empty, breakfast, mid, lunch, evening, dinner }
  habits: { empty, protein, midmorning, lunch, vitc, dinner, water, move, sleep }
```

## Icons

`public/icons/icon-192.png` and `icon-512.png` are placeholders (a plain green circle mark). Swap them for real artwork before shipping — any 192×192 and 512×512 PNG works.

## Cost

Free at this scale (1–10 users) under Firebase's Spark (free) tier: 50k reads/day, 20k writes/day, 1GB storage, 10GB hosting bandwidth/month. No server to maintain — Firebase manages Auth, database, and hosting.
