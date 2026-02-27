"use client";

import Header from "../Header";
import { partidasPresupuestarias, solicitudesGasto } from "../../lib/data";
import { formatCLP, formatCompact, formatPercent, getSubtituloLabel, getFuenteLabel, getEstadoStyle, getEstadoLabel, getRiskColor, getNivelRiesgoLabel } from "../../lib/utils";
import { DollarSign, AlertTriangle, Lock, TrendingUp, BarChart3 } from "lucide-react";
import StatCard from "../StatCard";

export default function PresupuestoPage() {
  const totalAprobado = partidasPresupuestarias.reduce((s, p) => s + p.montoAprobado, 0);
  const totalComprometido = partidasPresupuestarias.reduce((s, p) => s + p.montoComprometido, 0);
  const totalDevengado = partidasPresupuestarias.reduce((s, p) => s + p.montoDevengado, 0);
  const totalPagado = partidasPresupuestarias.reduce((s, p) => s + p.montoPagado, 0);
  const totalDisponible = partidasPresupuestarias.reduce((s, p) => s + p.saldoDisponible, 0);

  return (
    <div>
      <Header title="Control Presupuestario" />
      <div className="p-6 space-y-6 animate-fade-in">
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard title="Aprobado" value={formatCompact(totalAprobado)} icon={DollarSign} color="blue" />
          <StatCard title="Comprometido" value={formatCompact(totalComprometido)} subtitle={formatPercent((totalComprometido / totalAprobado) * 100)} icon={Lock} color="purple" />
          <StatCard title="Devengado" value={formatCompact(totalDevengado)} subtitle={formatPercent((totalDevengado / totalAprobado) * 100)} icon={TrendingUp} color="indigo" />
          <StatCard title="Pagado" value={formatCompact(totalPagado)} subtitle={formatPercent((totalPagado / totalAprobado) * 100)} icon={DollarSign} color="green" />
          <StatCard title="Disponible" value={formatCompact(totalDisponible)} subtitle={formatPercent((totalDisponible / totalAprobado) * 100)} icon={BarChart3} color="amber" />
        </div>

        {/* Budget execution table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h2 className="text-sm font-semibold text-slate-900">Ejecución Presupuestaria por Partida</h2>
            <p className="text-xs text-slate-500">Real vs Aprobada - Año 2026</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">Sub</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">Descripción</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase text-right">Aprobado</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase text-right">Comprometido</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase text-right">Devengado</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase text-right">Pagado</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase text-right">Disponible</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">% Ejec.</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">Fuente</th>
                </tr>
              </thead>
              <tbody>
                {partidasPresupuestarias.map((p) => {
                  const pct = (p.montoComprometido / p.montoAprobado) * 100;
                  const isOverBudget = pct > 85;
                  return (
                    <tr key={p.id} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono text-xs text-slate-600">{p.subtitulo}-{p.item}</td>
                      <td className="px-4 py-3 text-xs text-slate-800 font-medium">{p.descripcion}</td>
                      <td className="px-4 py-3 text-xs text-slate-700 text-right font-mono">{formatCompact(p.montoAprobado)}</td>
                      <td className="px-4 py-3 text-xs text-slate-700 text-right font-mono">{formatCompact(p.montoComprometido)}</td>
                      <td className="px-4 py-3 text-xs text-slate-700 text-right font-mono">{formatCompact(p.montoDevengado)}</td>
                      <td className="px-4 py-3 text-xs text-slate-700 text-right font-mono">{formatCompact(p.montoPagado)}</td>
                      <td className={`px-4 py-3 text-xs text-right font-mono font-semibold ${p.saldoDisponible < 500_000_000 ? "text-red-600" : "text-emerald-600"}`}>
                        {formatCompact(p.saldoDisponible)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-100 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full ${isOverBudget ? "bg-red-500" : "bg-blue-500"}`}
                              style={{ width: `${Math.min(pct, 100)}%` }}
                            />
                          </div>
                          <span className={`text-[10px] font-semibold ${isOverBudget ? "text-red-600" : "text-slate-600"}`}>
                            {pct.toFixed(0)}%
                          </span>
                          {isOverBudget && <AlertTriangle className="w-3 h-3 text-red-500" />}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[10px] text-slate-500">{getFuenteLabel(p.fuenteFinanciamiento)}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-300 bg-slate-50 font-semibold">
                  <td colSpan={2} className="px-4 py-3 text-xs text-slate-800">TOTAL</td>
                  <td className="px-4 py-3 text-xs text-slate-800 text-right font-mono">{formatCompact(totalAprobado)}</td>
                  <td className="px-4 py-3 text-xs text-slate-800 text-right font-mono">{formatCompact(totalComprometido)}</td>
                  <td className="px-4 py-3 text-xs text-slate-800 text-right font-mono">{formatCompact(totalDevengado)}</td>
                  <td className="px-4 py-3 text-xs text-slate-800 text-right font-mono">{formatCompact(totalPagado)}</td>
                  <td className="px-4 py-3 text-xs text-emerald-700 text-right font-mono">{formatCompact(totalDisponible)}</td>
                  <td className="px-4 py-3 text-xs text-slate-800">{((totalComprometido / totalAprobado) * 100).toFixed(0)}%</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Solicitudes de Gasto con Checklist */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="text-sm font-semibold text-slate-900 mb-4">Motor de Cumplimiento - Solicitudes de Gasto</h2>
          <div className="space-y-4">
            {solicitudesGasto.map((sg) => (
              <div key={sg.id} className={`p-4 rounded-lg border ${getRiskColor(sg.nivelRiesgo)}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-500">{sg.id}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getEstadoStyle(sg.estado)}`}>
                        {getEstadoLabel(sg.estado)}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getRiskColor(sg.nivelRiesgo)}`}>
                        {getNivelRiesgoLabel(sg.nivelRiesgo)}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-800 mt-1">{sg.descripcion}</p>
                  </div>
                  <p className="text-lg font-bold text-slate-900">{formatCLP(sg.monto)}</p>
                </div>
                {/* Checklist */}
                <div className="space-y-1.5">
                  {sg.checklistCumplimiento.map((cl) => (
                    <div key={cl.id} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                        cl.cumplido
                          ? "bg-emerald-500 border-emerald-500"
                          : "border-red-400 bg-red-50"
                      }`}>
                        {cl.cumplido && <span className="text-white text-[10px]">&#10003;</span>}
                        {!cl.cumplido && <span className="text-red-500 text-[10px]">&#10007;</span>}
                      </div>
                      <span className={`text-xs ${cl.cumplido ? "text-slate-600" : "text-red-700 font-medium"}`}>
                        {cl.descripcion}
                      </span>
                      <span className="text-[10px] text-slate-400 ml-auto">{cl.normaReferencia}</span>
                    </div>
                  ))}
                </div>
                {sg.observaciones.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-current/10">
                    {sg.observaciones.map((obs, i) => (
                      <p key={i} className="text-xs flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                        {obs}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
