"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Page = "dashboard" | "requerimientos" | "requerimiento-detalle" | "nuevo-requerimiento" | "presupuesto" | "auditoria" | "legal" | "contabilidad" | "alertas" | "configuracion";

interface NavContextType {
  currentPage: Page;
  navigate: (page: Page, params?: Record<string, string>) => void;
  params: Record<string, string>;
}

const NavContext = createContext<NavContextType>({
  currentPage: "dashboard",
  navigate: () => {},
  params: {},
});

export function NavProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [params, setParams] = useState<Record<string, string>>({});

  const navigate = (page: Page, newParams?: Record<string, string>) => {
    setCurrentPage(page);
    setParams(newParams || {});
  };

  return (
    <NavContext.Provider value={{ currentPage, navigate, params }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  return useContext(NavContext);
}
