"use client";

import { useAuth } from "../lib/auth-context";
import { useNav, type Page } from "../lib/nav-context";
import { getRolLabel } from "../lib/utils";
import {
  LayoutDashboard,
  FileText,
  DollarSign,
  ShieldCheck,
  Scale,
  BookOpen,
  Settings,
  LogOut,
  Building2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const navItems: { page: Page; label: string; icon: typeof LayoutDashboard; roles: "all" | string[] }[] = [
  { page: "dashboard", label: "Dashboard", icon: LayoutDashboard, roles: "all" },
  { page: "requerimientos", label: "Requerimientos", icon: FileText, roles: "all" },
  { page: "presupuesto", label: "Presupuesto", icon: DollarSign, roles: ["admin_ti", "supervisor", "presupuesto", "finanzas", "subdirector_uatp", "coordinador"] },
  { page: "auditoria", label: "Auditoría", icon: ShieldCheck, roles: ["admin_ti", "supervisor", "presupuesto", "finanzas", "juridica"] },
  { page: "legal", label: "Normativa Legal", icon: Scale, roles: "all" },
  { page: "contabilidad", label: "Contabilidad", icon: BookOpen, roles: ["admin_ti", "supervisor", "finanzas", "presupuesto"] },
  { page: "alertas", label: "Alertas", icon: AlertTriangle, roles: "all" },
  { page: "configuracion", label: "Configuración", icon: Settings, roles: ["admin_ti", "supervisor"] },
];

export default function Sidebar() {
  const { usuario, logout } = useAuth();
  const { currentPage, navigate } = useNav();
  const [collapsed, setCollapsed] = useState(false);

  if (!usuario) return null;

  const visibleItems = navItems.filter(
    (item) => item.roles === "all" || (Array.isArray(item.roles) && item.roles.includes(usuario.rol))
  );

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white border-r border-slate-200 flex flex-col z-40 transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-[260px]"
      }`}
    >
      <div className="px-4 py-5 border-b border-slate-100 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
          <Building2 className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <h1 className="text-sm font-bold text-slate-900 truncate">SLEP Control</h1>
            <p className="text-[10px] text-slate-500 truncate">Trazabilidad v3.2.0</p>
          </div>
        )}
      </div>

      <nav className="flex-1 py-3 px-2 overflow-y-auto">
        <div className="space-y-0.5">
          {visibleItems.map((item) => {
            const isActive = currentPage === item.page || (item.page === "requerimientos" && currentPage.startsWith("requerimiento"));
            const Icon = item.icon;
            return (
              <button
                key={item.page}
                onClick={() => navigate(item.page)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors w-full text-left ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-slate-100 p-3">
        {!collapsed && (
          <div className="px-2 mb-2">
            <p className="text-sm font-semibold text-slate-800 truncate">{usuario.nombre}</p>
            <p className="text-xs text-slate-500 truncate">{getRolLabel(usuario.rol)}</p>
            <p className="text-[10px] text-slate-400 truncate">{usuario.email}</p>
          </div>
        )}
        <button
          onClick={logout}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
          title="Cerrar sesión"
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span>Cerrar sesión</span>}
        </button>
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-5 -right-3 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </aside>
  );
}
