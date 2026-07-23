import { Sparkles, Thermometer, Droplets } from "lucide-react";
import { C } from "./theme";

export const CONDITIONS = [
  { id: "normal", label: "Normal", color: C.forest, bg: C.forestLight, icon: Sparkles },
  { id: "unwell", label: "Unwell", color: C.rose, bg: C.roseLight, icon: Thermometer },
  { id: "periods", label: "Periods", color: C.plum, bg: C.plumLight, icon: Droplets },
];
export default CONDITIONS;
