# PCOD Companion

Diet, habit-tracking, and reference app for PCOD/PMOS care. Sign in with Google — session stays signed in on that device until you log out, and signing in with the same Google account on any device opens the same data. Up to 4 Netflix-style profiles live inside each account. React + Vite frontend, Firebase (Firestore + Hosting + Google Auth) backend.

## 1. Install

```
npm install
```

## 2. Connect Firebase

1. Create a project at console.firebase.google.com (or use an existing one).
2. **Authentication → Sign-in method → enable Google.** Pick a support email when prompted — that's all Google Sign-In needs (no billing plan required, unlike phone auth).
3. **Authentication → Settings → Authorized domains** — add the domain(s) you'll deploy to (localhost is included by default; add your `*.web.app`/`*.firebaseapp.com` domain, or custom domain, once you deploy).
4. Firestore Database → Create database → **production mode**.
5. Project settings → General → Add app → Web → copy the config.
6. Copy `.env.example` to `.env` and fill in those values.

```
cp .env.example .env
```

## 3. Run locally

```
npm run dev
```

First launch shows a "Continue with Google" screen. Sign in with a Google account, and you're in — the session persists (via Firebase's local persistence), so it won't ask again on that browser/device until you tap "Log out". From there it's the same "Who's this for?" picker as before — add up to 4 profiles, pick one, tap the avatar on Home to switch.

**To check on someone else's progress:** sign in with *their* Google account on your device (they'd need to share their credentials or use their own device to sign you in — Google actively discourages credential sharing, so this is more friction than the old phone-OTP approach). See "Suggested further improvements" below for a better long-term pattern.

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

- `src/data/` — meal options, info-tab content, habits list, condition list, ingredient catalog (`ingredients.js` — categorizes every ingredient key for the shopping list), design tokens.
- `src/firebase/` — `config.js` (env-based setup), `auth.js` (Google sign-in, session persistence, log out), `profiles.js` (create/list profiles, capped at 4), `pantry.js` (shared household pantry — add/remove/reset), `firestore.js` (`getLog`, `setLog`, `listLogsForMonth` — all scoped by profile).
- `src/contexts/` — `AuthContext` (the signed-in Google account, exposes `logOut`), `ProfileContext` (which of the up-to-4 profiles is active, remembered per-account via localStorage).
- `src/screens/` — `LoginScreen` (Google sign-in), `ProfileSelectScreen` (the "who's this for" picker, has "Log out"), `Home`, `Diet` (also owns the shared pantry state), `Tracker`, `Calendar`, `InfoDetail`.
- `src/utils/backNav.js` / `useBackStep.js` — makes the device/browser back button step back through in-app screens (tabs, topic detail, the change-meal modal, the add-profile form) instead of exiting.
- `firestore.rules` — each Google account can only read/write its own `users/{accountId}` tree; profiles/logs and the shared pantry live underneath it.

## Data model

```
users/{accountId}                                     — one per Google account (Firebase Auth uid)
users/{accountId}/profiles/{profileId}                 — up to 4: { name, color, createdAt }
users/{accountId}/profiles/{profileId}/logs/{YYYY-MM-DD}
  condition: "normal" | "unwell" | "periods"
  meals: { empty, breakfast, mid, lunch, evening, dinner }
  habits: { empty, protein, midmorning, lunch, vitc, dinner, water, move, sleep }
users/{accountId}/household/pantry                     — shared across all profiles: { have: [ingredientKey, ...] }
```

## How the pantry & shopping list work

There's no daily or weekly shopping list — grocery cadence is up to you. Instead:

- **"Pantry & shopping list"** on the Diet screen shows every ingredient used across the meal library, grouped by category (Protein, Carbs & Grains, Fiber & Veg, Dairy, Nuts/Seeds/Fruits, Spices, Other). Tap what you already have.
- That pantry state is **shared across the whole account** (one kitchen, however many profiles) and drives meal suggestions: when a slot has no meal explicitly picked for the day, it suggests whichever option best matches what's checked off, falling back to the day-rotation default if nothing matches.
- **"Change meal"** on any slot shows the same tick-boxes, ranked by pantry match, so you can swap based on what's actually in stock.
- **Periods/unwell days get a separate, live nudge** instead of being planned for in advance (those days aren't predictable) — when you mark a day as periods or unwell, a small banner lists what that day's options need that you don't currently have.
- **"Regenerate"** clears every checkbox — a full reset for when you've run out of everything and are doing a fresh restock. There's no automatic weekly reset; you decide when to shop.

## A note on this security model

Access to an account is gated by that Google account's credentials, and Firestore rules block anyone else from reading or writing an account's data server-side even if they had the URL. Because profiles inside an account are still just a device-remembered pick (not individually secured), anyone who has signed into an account can see all profiles inside it.

## Suggested further improvements

- **Read-only sharing instead of shared login.** Right now "checking a friend's progress" means literally signing in as them — which, with Google Sign-In, means sharing their Google credentials or handing over their signed-in device (Google actively discourages this). A more private pattern: the account owner generates a share code from inside the app; whoever redeems it gets **view-only** access to that one profile under *their own* account, without ever touching the owner's credentials. Worth doing if this becomes a regular pattern rather than a one-off — this is now the more important of the two, since Google accounts are more awkward to share than the old phone-OTP was.
- **Multiple people, one account, editing at once.** If you and a friend are both signed into the same account (different devices) and both editing the same day's log, last write wins with no warning. Fine for occasional check-ins; would need more work for real-time collaboration.
- **Ingredient catalog maintenance.** `src/data/ingredients.js` needs a manual entry for any new ingredient `key` you add to `slots.js`, or it won't show up on the shopping list or count toward pantry matching.

## Back button behavior

Since this is a single-page app with no router, the device/browser back button had nothing to step through and just exited. `src/utils/backNav.js` fixes that: opening a tab other than Home, a topic detail view, the add-profile form, or the change-meal modal each pushes a real browser-history entry; back pops the most recent one instead of leaving the app. Only at the true root (Home tab, nothing open) does back behave natively. If you add a new full-screen view or modal, wrap its open/close state with `useBackStep` (see `src/utils/useBackStep.js`) so it participates in this too.

## Icons

`public/icons/icon-192.png` and `icon-512.png` are placeholders (plain green circle). Swap for real artwork before shipping.

## Cost

Firestore/Hosting/Google Auth all stay free at this scale under Firebase's Spark (free) plan — no billing account needed, unlike the earlier phone-auth version.
