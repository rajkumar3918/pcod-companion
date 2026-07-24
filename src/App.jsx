import { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ProfileProvider, useProfile } from "./contexts/ProfileContext";
import { useViewport } from "./utils/useViewport";
import { useBackStep } from "./utils/useBackStep";
import { C, FONT_IMPORT, GLOBAL_STYLES, sans } from "./data/theme";
import ProfileSelectScreen from "./screens/ProfileSelectScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import DietScreen from "./screens/DietScreen";
import TrackerScreen from "./screens/TrackerScreen";
import CalendarScreen from "./screens/CalendarScreen";
import InfoDetailScreen from "./screens/InfoDetailScreen";
import BottomNav from "./components/BottomNav";
import SideNav from "./components/SideNav";

function Gate() {
  const { user, loading: authLoading } = useAuth();
  const { profile, ready: profileReady } = useProfile();

  if (authLoading || !profileReady) {
    return <div style={{ padding: 24, fontFamily: sans, color: C.muted, fontSize: 13, textAlign: "center" }}>Loading…</div>;
  }

  if (!user) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <LoginScreen />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <ProfileSelectScreen />
        </div>
      </div>
    );
  }

  return <AppShell />;
}

function AppShell() {
  const [tab, setTab] = useState("/");
  const [topic, setTopic] = useState(null);
  const [showTopic, setShowTopic] = useState(false);
  const { isDesktop } = useViewport();

  const openTopic = (t) => { setTopic(t); setShowTopic(true); };
  const closeTopic = () => setShowTopic(false);
  const navigate = (path) => { setShowTopic(false); setTab(path); };

  // Physical/browser back steps back through in-app navigation instead of
  // exiting: closes an open topic first, then returns to Home from any
  // other tab, then (with nothing left on our stack) behaves natively.
  useBackStep(showTopic, closeTopic);
  useBackStep(!showTopic && tab !== "/", () => setTab("/"));

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

  // Re-keying on the active screen retriggers the fade/slide-in animation
  // on every navigation, giving each screen change a light, premium feel.
  const screenKey = showTopic ? `topic-${topic && topic.id}` : tab;

  if (isDesktop) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", background: C.cream }}>
        <SideNav active={tab} onNavigate={navigate} />
        <div style={{ flex: 1, display: "flex", justifyContent: "center", padding: "36px 32px" }}>
          <div key={screenKey} className="anim-slide-up" style={{ width: "100%", maxWidth: 760 }}>{content}</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", background: C.cream }}>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div key={screenKey} className="anim-fade-in">{content}</div>
      </div>
      <BottomNav active={tab} onNavigate={navigate} />
    </div>
  );
}

export default function App() {
  return (
    <div style={{ background: C.cream, minHeight: "100vh" }}>
      <style>{FONT_IMPORT}</style>
      <style>{GLOBAL_STYLES}</style>
      <AuthProvider>
        <ProfileProvider>
          <Gate />
        </ProfileProvider>
      </AuthProvider>
    </div>
  );
}
