import { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { C, FONT_IMPORT, sans } from "./data/theme";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import DietScreen from "./screens/DietScreen";
import TrackerScreen from "./screens/TrackerScreen";
import CalendarScreen from "./screens/CalendarScreen";
import InfoDetailScreen from "./screens/InfoDetailScreen";
import BottomNav from "./components/BottomNav";

function AuthGate() {
  const { user, loading } = useAuth();
  const [authScreen, setAuthScreen] = useState("login");

  if (loading) {
    return <div style={{ padding: 24, fontFamily: sans, color: C.muted, fontSize: 13, textAlign: "center" }}>Loading…</div>;
  }

  if (!user) {
    return authScreen === "login"
      ? <LoginScreen onGoToSignup={() => setAuthScreen("signup")} />
      : <SignupScreen onGoToLogin={() => setAuthScreen("login")} />;
  }

  return <AppShell />;
}

function AppShell() {
  const [tab, setTab] = useState("/");
  const [topic, setTopic] = useState(null);
  const [showTopic, setShowTopic] = useState(false);

  const openTopic = (t) => { setTopic(t); setShowTopic(true); };
  const closeTopic = () => setShowTopic(false);
  const navigate = (path) => { setShowTopic(false); setTab(path); };

  let content;
  if (showTopic) {
    content = <InfoDetailScreen topic={topic} onBack={closeTopic} />;
  } else if (tab === "/") {
    content = <HomeScreen onOpenTopic={openTopic} onGoToDiet={() => navigate("/diet")} />;
  } else if (tab === "/diet") {
    content = <DietScreen />;
  } else if (tab === "/tracker") {
    content = <TrackerScreen />;
  } else if (tab === "/calendar") {
    content = <CalendarScreen />;
  }

  return (
    <>
      <div style={{ flex: 1, overflowY: "auto" }}>{content}</div>
      <BottomNav active={tab} onNavigate={navigate} />
    </>
  );
}

export default function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "24px 12px", background: "transparent", minHeight: "100vh" }}>
      <style>{FONT_IMPORT}</style>
      <div style={{
        width: 390, minHeight: 760, maxWidth: "100%", background: C.cream, borderRadius: 36,
        border: `8px solid ${C.ink}`, boxShadow: "0 24px 60px rgba(0,0,0,0.20)",
        overflow: "hidden", position: "relative", display: "flex", flexDirection: "column",
      }}>
        <div style={{ height: 24, background: C.ink, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <div style={{ width: 64, height: 5, borderRadius: 3, background: "#565650" }} />
        </div>
        <AuthProvider>
          <AuthGate />
        </AuthProvider>
      </div>
    </div>
  );
}
