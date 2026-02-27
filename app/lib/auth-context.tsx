"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Usuario, PermisosRol } from "./types";
import { usuarios, permisosPorRol } from "./data";

interface AuthContextType {
  usuario: Usuario | null;
  permisos: PermisosRol | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  usuario: null,
  permisos: null,
  login: () => false,
  logout: () => {},
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const login = useCallback((email: string, password: string): boolean => {
    const found = usuarios.find(
      (u) => u.email === email && u.contrasena === password && u.activo
    );
    if (found) {
      setUsuario(found);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUsuario(null);
  }, []);

  const permisos = usuario ? permisosPorRol[usuario.rol] : null;

  return (
    <AuthContext.Provider
      value={{
        usuario,
        permisos,
        login,
        logout,
        isAuthenticated: !!usuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
