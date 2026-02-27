"use client";

import Header from "../Header";
import { alertasRiesgo } from "../../lib/data";
import { formatDate, getRiskColor, getNivelRiesgoLabel } from "../../lib/utils";
import { AlertTriangle, Shield, Clock, CheckCircle2, Filter } from "lucide-react";
import { useState } from "react";

export default function AlertasPage() {
  const [filtroNivel, setFiltroNivel] = useState("todos");
  const [filtroTipo, setFiltroTipo] = useState("todos");

  const filtradas = alertasRiesgo.filter((a) => {
    if (filtroNivel !== "todos" && a.nivelRiesgo !== filtroNivel) return false;
    if (filtroTipo !== "todos" && a.tipo !== filtroTipo) return false;
    return true;
  });

  const activas = alertasRiesgo.filter(a => a.estado === "activa").length;
  const criticas = alertasRiesgo.filter(a => a.nivelRiesgo === "critico" && a.estado === "activa").length;

  return (
    <div>
      <Header title="Alertas de Riesgo" />
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <p className="text-2xl font-bold text-slate-900">{alertasRiesgo.length}</p>
            <p className="text-xs text-slate-500">Total Alertas</p>
          </div>
          <div className="bg-white rounded-xl border border-red-200 p-4 text-center">
            <p className="text-2xl font-bold text-red-700">{criticas}</p>
            <p className="text-xs text-red-600">Críticas Activas</p>
          </div>
          <div className="bg-white rounded-xl border border-amber-200 p-4 text-center">
            <p className="text-2xl font-bold text-amber-700">{activas}</p>
            <p className="text-xs text-amber-600">Activas</p>
          </div>
          <div className="bg-white rounded-xl border border-emerald-200 p-4 text-center">
            <p className="text-2xl font-bold text-emerald-700">{alertasRiesgo.filter(a => a.estado === "resuelta").length}</p>
            <p className="text-xs text-emerald-600">Resueltas</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3 flex-wrap">
          <Filter className="w-4 h-4 text-slate-400" />
          <select value={filtroNivel} onChange={(e) => setFiltroNivel(e.target.value)} className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg">
            <option value="todos">Todos los niveles</option>
            <option value="critico">Crítico</option>
            <option value="alto">Alto</option>
            <option value="medio">Medio</option>
            <option value="bajo">Bajo</option>
          </select>
          <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg">
            <option value="todos">Todos los tipos</option>
            <option value="presupuestario">Presupuestario</option>
            <option value="legal">Legal</option>
            <option value="contable">Contable</option>
            <option value="contrato">Contrato</option>
            <option value="proveedor">Proveedor</option>
          </select>
        </div>

        {/* Alertas */}
        <div className="space-y-3">
          {filtradas.map((alerta) => (
            <div key={alerta.id} className={`bg-white rounded-xl border-l-4 border p-5 ${
              alerta.nivelRiesgo === "critico" ? "border-l-red-500 border-red-200" :
              alerta.nivelRiesgo === "alto" ? "border-l-orange-500 border-orange-200" :
              alerta.nivelRiesgo === "medio" ? "border-l-amber-500 border-amber-200" :
              "border-l-emerald-500 border-emerald-200"
            }`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <AlertTriangle className={`w-4 h-4 ${
                      alerta.nivelRiesgo === "critico" ? "text-red-500" :
                      alerta.nivelRiesgo === "alto" ? "text-orange-500" :
                      alerta.nivelRiesgo === "medio" ? "text-amber-500" : "text-emerald-500"
                    }`} />
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${getRiskColor(alerta.nivelRiesgo)}`}>
                      {getNivelRiesgoLabel(alerta.nivelRiesgo)}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      alerta.tipo === "presupuestario" ? "bg-blue-50 text-blue-600" :
                      alerta.tipo === "legal" ? "bg-purple-50 text-purple-600" :
                      alerta.tipo === "contable" ? "bg-green-50 text-green-600" :
                      alerta.tipo === "contrato" ? "bg-cyan-50 text-cyan-600" :
                      "bg-slate-100 text-slate-600"
                    }`}>
                      {alerta.tipo.charAt(0).toUpperCase() + alerta.tipo.slice(1)}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      alerta.estado === "activa" ? "bg-red-50 text-red-600" :
                      alerta.estado === "en_revision" ? "bg-amber-50 text-amber-600" :
                      "bg-emerald-50 text-emerald-600"
                    }`}>
                      {alerta.estado === "activa" ? "Activa" : alerta.estado === "en_revision" ? "En Revisión" : "Resuelta"}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900">{alerta.titulo}</h3>
                  <p className="text-xs text-slate-600 mt-1">{alerta.descripcion}</p>
                  <div className="mt-3 p-2 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-700">
                      <strong>Acción recomendada:</strong> {alerta.accionRecomendada}
                    </p>
                  </div>
                  {alerta.normaRelacionada && (
                    <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Norma: {alerta.normaRelacionada}
                    </p>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDate(alerta.fecha)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
