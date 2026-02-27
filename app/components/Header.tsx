"use client";

import { useAuth } from "../lib/auth-context";
import { Bell, Search } from "lucide-react";
import { alertasRiesgo } from "../lib/data";

export default function Header({ title }: { title: string }) {
  const { usuario } = useAuth();
  const alertasActivas = alertasRiesgo.filter((a) => a.estado === "activa").length;

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-slate-900">{title}</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          SLEP Barrancas &mdash; {new Date().toLocaleDateString("es-CL", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar requerimiento..."
            className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 w-64"
          />
        </div>
        <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
          <Bell className="w-5 h-5 text-slate-600" />
          {alertasActivas > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {alertasActivas}
            </span>
          )}
        </button>
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
          <span className="text-xs font-bold text-white">
            {usuario?.nombre?.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </span>
        </div>
      </div>
    </header>
  );
}
