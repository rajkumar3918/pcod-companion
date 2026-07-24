// Makes the device/browser "back" button step back through in-app screens
// (tabs, detail views, modals) instead of exiting — by pushing a real
// history entry for each "step" and popping our own app state when the
// browser reports a popstate, rather than letting the browser navigate away
// with nothing left in history.
//
// One global stack (not per-component) so nested steps close in the right
// order: whichever step opened most recently is on top, and a single back
// press only closes that one.

let stack = [];
let nextId = 0;
let popstateBound = false;
let suppressCount = 0;

function handlePopState() {
  if (suppressCount > 0) {
    suppressCount--;
    return;
  }
  const top = stack.pop();
  if (top) top.onBack();
}

function ensureBound() {
  if (popstateBound) return;
  window.addEventListener("popstate", handlePopState);
  popstateBound = true;
}

// Registers one back-step and pushes a history entry for it. Returns an id
// to pass to popBackStep when the step closes for reasons other than the
// user pressing back (e.g. tapping an in-app close button).
export function pushBackStep(onBack) {
  ensureBound();
  const id = ++nextId;
  stack.push({ id, onBack });
  window.history.pushState({ __navStep: id }, "");
  return id;
}

// Call when a step closes via in-app action (not a physical back press) —
// removes it from the stack and consumes its history entry so a later
// back-press doesn't land on a stale, already-irrelevant entry.
export function popBackStep(id) {
  const idx = stack.findIndex((s) => s.id === id);
  if (idx === -1) return; // already consumed by a real back-press
  stack.splice(idx, 1);
  suppressCount++;
  window.history.back();
}
