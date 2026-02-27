"use client";

import { useAuth } from "../lib/auth-context";
import Sidebar from "./Sidebar";
import LoginPage from "./LoginPage";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <main className="ml-[260px] min-h-screen transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
