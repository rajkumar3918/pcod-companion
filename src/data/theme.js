export const FONT_IMPORT = "@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700;9..144,800&family=Manrope:wght@400;500;600;700;800&display=swap');";
export const serif = "'Fraunces', Georgia, serif";
export const sans = "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

// Deeper, more saturated "jewel tone" version of the original warm/botanical
// palette — same semantic roles (forest = primary/protein-adjacent,
// mustard = energy, teal = hydration, plum = calm, slate = night,
// rose = periods/warmth), just richer and higher-contrast.
export const C = {
  cream: "#F8F3EA",
  ink: "#1E1C17",
  muted: "#6B6759",
  faint: "#9E9A8C",
  line: "#E9E1CE",
  surface: "#FFFFFF",

  forest: "#0E6B4F", forestDark: "#0A4E39", forestLight: "#DEF0E6",
  mustard: "#C77A17", mustardLight: "#FAEBD3",
  teal: "#0D7A87", tealLight: "#DEF1F2",
  olive: "#587A26", oliveLight: "#E7EFD8",
  plum: "#7A3FA6", plumLight: "#F0E5F6",
  slate: "#264B7D", slateLight: "#E2EBF5",
  rose: "#C43A57", roseLight: "#FBE4E8",
  sage: "#4C7566", sageLight: "#E4EFEA",
  white: "#FFFFFF",

  // Signature gradients — used sparingly, on the one or two elements per
  // screen that should read as "premium" (primary CTA, header mark, hero).
  gradForest: "linear-gradient(135deg, #0E6B4F 0%, #14A876 100%)",
  gradMustard: "linear-gradient(135deg, #C77A17 0%, #E8A73D 100%)",
  gradRose: "linear-gradient(135deg, #C43A57 0%, #E8637C 100%)",
  gradPlum: "linear-gradient(135deg, #7A3FA6 0%, #A567D1 100%)",

  shadowSm: "0 1px 3px rgba(24,22,15,0.07)",
  shadowMd: "0 8px 24px rgba(24,22,15,0.09)",
  shadowLg: "0 18px 48px rgba(24,22,15,0.16)",
};

// Global keyframes + small utility classes, injected once in App.jsx
// alongside the font import. Kept as plain CSS (not CSS-in-JS) so it's one
// stylesheet shared by every screen instead of per-component overhead.
export const GLOBAL_STYLES = `
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
@keyframes sheetUp { from { opacity: 0; transform: translateY(28px) scale(0.99); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: scale(1); } }
@keyframes backdropIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes popCheck { 0% { transform: scale(0.6); } 60% { transform: scale(1.15); } 100% { transform: scale(1); } }

.anim-fade-in { animation: fadeIn .35s ease both; }
.anim-slide-up { animation: slideUp .38s cubic-bezier(.2,.7,.3,1) both; }
.anim-scale-in { animation: scaleIn .28s cubic-bezier(.2,.7,.3,1) both; }
.anim-sheet-up { animation: sheetUp .38s cubic-bezier(.2,.7,.3,1) both; }
.anim-pop { animation: popCheck .28s cubic-bezier(.34,1.56,.64,1) both; }

.btn-tap { transition: transform .16s cubic-bezier(.2,.8,.2,1), box-shadow .16s ease, opacity .16s ease, background-color .16s ease, border-color .16s ease; }
.btn-tap:active { transform: scale(0.96); }
@media (hover: hover) {
  .btn-tap:hover { filter: brightness(1.03); }
  .card-hover:hover { transform: translateY(-2px); box-shadow: ${C.shadowMd}; }
}
.card-hover { transition: transform .18s ease, box-shadow .18s ease; }

.backdrop-blur { backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }

button:focus-visible, a:focus-visible, input:focus-visible {
  outline: 2.5px solid ${C.forest};
  outline-offset: 2px;
  border-radius: 8px;
}

@media (prefers-reduced-motion: reduce) {
  .anim-fade-in, .anim-slide-up, .anim-scale-in, .anim-pop { animation: none !important; }
  .btn-tap, .btn-tap:active, .card-hover, .card-hover:hover { transition: none !important; transform: none !important; }
}
`;
