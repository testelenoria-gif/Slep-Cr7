"use client";

import Header from "./Header";
import StatCard from "./StatCard";
import { useAuth } from "../lib/auth-context";
import {
  dashboardData,
  requerimientos,
  alertasRiesgo,
  contratos,
  ejecucionMensual,
} from "../lib/data";
import { formatCompact, formatPercent, getRiskColor, getNivelRiesgoLabel, getSeccionLabel, getEstadoReqLabel, getEstadoReqStyle, getPrioridadStyle } from "../lib/utils";
import {
  DollarSign,
  FileText,
  AlertTriangle,
  ShieldCheck,
  Clock,
  FileWarning,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  XCircle,
  BarChart3,
} from "lucide-react";

export default function DashboardContent() {
  const { usuario } = useAuth();
  if (!usuario) return null;

  const reqActivos = requerimientos.filter(
    (r) => !["finalizado", "rechazado"].includes(r.estado)
  );
  const reqPendientes = requerimientos.filter(
    (r) => r.estado === "en_revision_subdirector" || r.estado === "pendiente_informacion"
  );
  const alertasActivas = alertasRiesgo.filter((a) => a.estado === "activa");
  const contratosPorVencer = contratos.filter((c) => {
    const venc = new Date(c.fechaTermino);
    const now = new Date();
    const diffDays = (venc.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays <= 45 && diffDays > 0 && c.estado === "vigente";
  });

  return (
    <div>
      <Header title="Dashboard" />
      <div className="p-6 space-y-6 animate-fade-in">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Presupuesto Ejecutado"
            value={formatCompact(dashboardData.presupuestoEjecutado)}
            subtitle={`${formatPercent(dashboardData.porcentajeEjecucion)} de ${formatCompact(dashboardData.presupuestoTotal)}`}
            icon={DollarSign}
            color="blue"
          />
          <StatCard
            title="Requerimientos Activos"
            value={String(reqActivos.length)}
            subtitle={`${reqPendientes.length} pendientes de revisión`}
            icon={FileText}
            color="indigo"
          />
          <StatCard
            title="Alertas Activas"
            value={String(alertasActivas.length)}
            subtitle={`${alertasActivas.filter((a) => a.nivelRiesgo === "critico").length} críticas`}
            icon={AlertTriangle}
            color="red"
          />
          <StatCard
            title="Cumplimiento Legal"
            value={`${dashboardData.cumplimientoLegal}%`}
            subtitle="Auditoría Q1 2026"
            icon={ShieldCheck}
            color="green"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Requerimientos Recientes */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-slate-900">Requerimientos Recientes</h2>
              <span className="text-xs text-slate-500">{requerimientos.length} total</span>
            </div>
            <div className="space-y-2">
              {requerimientos.slice(0, 6).map((req) => (
                <div key={req.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100">
                  <div className="flex-shrink-0">
                    {req.estado === "finalizado" ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : req.estado === "rechazado" ? (
                      <XCircle className="w-5 h-5 text-red-500" />
                    ) : (
                      <Clock className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400">{req.numero}</span>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${getPrioridadStyle(req.prioridad)}`}>
                        {req.prioridad.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-800 truncate">{req.titulo}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${getEstadoReqStyle(req.estado)}`}>
                      {getEstadoReqLabel(req.estado)}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">{getSeccionLabel(req.seccionActual)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar: Alertas + Contratos */}
          <div className="space-y-6">
            {/* Alertas */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <h2 className="text-sm font-semibold text-slate-900">Alertas de Riesgo</h2>
              </div>
              <div className="space-y-2">
                {alertasActivas.slice(0, 4).map((alerta) => (
                  <div key={alerta.id} className={`p-3 rounded-lg border ${getRiskColor(alerta.nivelRiesgo)}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2 h-2 rounded-full ${alerta.nivelRiesgo === "critico" ? "bg-red-500 animate-pulse-dot" : alerta.nivelRiesgo === "alto" ? "bg-orange-500" : "bg-amber-500"}`} />
                      <span className="text-[10px] font-bold uppercase">{getNivelRiesgoLabel(alerta.nivelRiesgo)}</span>
                    </div>
                    <p className="text-xs font-medium">{alerta.titulo}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contratos por vencer */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center gap-2 mb-4">
                <FileWarning className="w-4 h-4 text-amber-500" />
                <h2 className="text-sm font-semibold text-slate-900">Contratos por Vencer</h2>
              </div>
              <div className="space-y-2">
                {contratosPorVencer.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-2">Sin contratos próximos a vencer</p>
                ) : (
                  contratosPorVencer.map((ctr) => (
                    <div key={ctr.id} className="p-3 rounded-lg border border-amber-100 bg-amber-50/50">
                      <p className="text-xs font-medium text-slate-800">{ctr.proveedor}</p>
                      <p className="text-[10px] text-slate-500">{ctr.descripcion}</p>
                      <p className="text-[10px] font-semibold text-amber-700 mt-1">
                        Vence: {new Date(ctr.fechaTermino).toLocaleDateString("es-CL")}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Budget Execution Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-semibold text-slate-900">Ejecución Presupuestaria por Subtítulo</h2>
          </div>
          <div className="space-y-3">
            {dashboardData.distribucionSubtitulos.map((sub) => (
              <div key={sub.subtitulo}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-slate-700">{sub.subtitulo}</span>
                  <span className="text-xs text-slate-500">{formatCompact(sub.monto)} ({sub.porcentaje}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${sub.porcentaje}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Execution chart placeholder */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-semibold text-slate-900">Ejecución Mensual 2026</h2>
          </div>
          <div className="grid grid-cols-12 gap-2 items-end h-40">
            {ejecucionMensual.map((m) => (
              <div key={m.mes} className="flex flex-col items-center">
                <div
                  className="w-full bg-blue-500 rounded-t-sm min-h-[4px] transition-all hover:bg-blue-600"
                  style={{ height: `${(m.porcentajeEjecucion / 100) * 120}px` }}
                  title={`${m.mes}: ${m.porcentajeEjecucion}%`}
                />
                <span className="text-[9px] text-slate-500 mt-1">{m.mes}</span>
                <span className="text-[9px] font-semibold text-slate-700">{m.porcentajeEjecucion}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
