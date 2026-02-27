"use client";

import { useState } from "react";
import { useAuth } from "../lib/auth-context";
import { usuarios } from "../lib/data";
import { getRolLabel } from "../lib/utils";
import { Building2, Lock, Mail, Eye, EyeOff, Shield, Users } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showQuickAccess, setShowQuickAccess] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = login(email, password);
    if (!success) {
      setError("Credenciales incorrectas. Verifique email y contraseña.");
    }
  };

  const handleQuickLogin = (usr: typeof usuarios[0]) => {
    setEmail(usr.email);
    setPassword(usr.contrasena);
    login(usr.email, usr.contrasena);
  };

  const roleGroups = [
    { label: "Administración", users: usuarios.filter((u) => ["admin_ti", "supervisor"].includes(u.rol)) },
    { label: "Directores EE", users: usuarios.filter((u) => u.rol === "director_ee") },
    { label: "UATP", users: usuarios.filter((u) => ["subdirector_uatp", "coordinador"].includes(u.rol)) },
    { label: "Secciones Operativas", users: usuarios.filter((u) => ["presupuesto", "compras", "juridica", "finanzas"].includes(u.rol)) },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 mb-4 shadow-lg shadow-blue-200">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">SLEP Control Financiero</h1>
          <p className="text-slate-500 mt-1">Sistema de Trazabilidad Chile v3.2.0</p>
          <div className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full">
            <Lock className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-xs font-medium text-amber-700">Modo de Prueba - Acceso Abierto</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Login Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-slate-900">Iniciar Sesión</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="usuario@sistema.com"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
              >
                Ingresar al Sistema
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-100">
              <p className="text-xs text-slate-400 text-center">
                Todas las contraseñas del entorno de pruebas: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-mono">admin123</code>
              </p>
            </div>
          </div>

          {/* Quick Access */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-slate-900">Login Simplificado</h2>
              </div>
              <button
                onClick={() => setShowQuickAccess(!showQuickAccess)}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                {showQuickAccess ? "Ocultar" : "Mostrar"}
              </button>
            </div>

            {showQuickAccess && (
              <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
                {roleGroups.map((group) => (
                  <div key={group.label}>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">{group.label}</p>
                    <div className="space-y-1">
                      {group.users.map((usr) => (
                        <button
                          key={usr.id}
                          onClick={() => handleQuickLogin(usr)}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all text-left group"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-700 group-hover:text-blue-700 truncate">{usr.nombre}</p>
                            <p className="text-[11px] text-slate-400 font-mono truncate">{usr.email}</p>
                          </div>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 flex-shrink-0 ml-2">
                            {getRolLabel(usr.rol)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Ley 21.040 - Nueva Educación Pública &bull; Contraloría General de la República &bull; DIPRES
        </p>
      </div>
    </div>
  );
}
