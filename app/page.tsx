"use client";

import { AuthProvider, useAuth } from "./lib/auth-context";
import { NavProvider } from "./lib/nav-context";
import LoginPage from "./components/LoginPage";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

function AppContent() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <NavProvider>
      <div className="min-h-screen bg-slate-50 flex">
        <Sidebar />
        <main className="flex-1 ml-[260px] min-h-screen transition-all duration-300">
          <MainContent />
        </main>
      </div>
    </NavProvider>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
