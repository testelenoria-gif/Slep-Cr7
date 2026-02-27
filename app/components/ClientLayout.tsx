"use client";

import { AuthProvider } from "../lib/auth-context";
import AppShell from "./AppShell";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AppShell>{children}</AppShell>
    </AuthProvider>
  );
}
