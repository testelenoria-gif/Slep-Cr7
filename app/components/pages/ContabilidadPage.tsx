"use client";

import Header from "../Header";
import { conciliaciones, partidasPresupuestarias, ejecucionMensual } from "../../lib/data";
import { formatCLP, formatCompact, formatPercent } from "../../lib/utils";
import { BookOpen, CheckCircle2, AlertTriangle, XCircle, FileText, BarChart3, TrendingUp } from "lucide-react";
import StatCard from "../StatCard";

export default function ContabilidadPage() {
  const totalAprobado = partidasPresupuestarias.reduce((s, p) => s + p.montoAprobado, 0);
  const totalDevengado = partidasPresupuestarias.reduce((s, p) => s + p.montoDevengado, 0);
  const totalPagado = partidasPresupuestarias.reduce((s, p) => s + p.montoPagado, 0);

  return (
    <div>
      <Header title="Soporte Contable" />
      <div className="p-6 space-y-6 animate-fade-in">
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Devengado Total" value={formatCompact(totalDevengado)} subtitle={formatPercent((totalDevengado / totalAprobado) * 100)} icon={TrendingUp} color="blue" />
          <StatCard title="Pagado Total" value={formatCompact(totalPagado)} subtitle={formatPercent((totalPagado / totalAprobado) * 100)} icon={BookOpen} color="green" />
          <StatCard
            title="Conciliaciones"
            value={`${conciliaciones.filter(c => c.estado === "conciliada").length}/${conciliaciones.length}`}
            subtitle="Conciliadas"
            icon={CheckCircle2}
            color="purple"
          />
          <StatCard
            title="Diferencias"
            value={formatCLP(conciliaciones.reduce((s, c) => s + Math.abs(c.diferencia), 0))}
            subtitle="Pendientes de regularizar"
            icon={AlertTriangle}
            color="amber"
          />
        </div>

        {/* Conciliaciones */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="px-5 py-4 border-b border-slate-200">
            <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-500" />
              Conciliaciones
            </h2>
            <p className="text-xs text-slate-500">Estado de conciliaciones bancarias y presupuestarias</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">Período</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">Tipo</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase text-right">Saldo Libro</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase text-right">Saldo Real</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase text-right">Diferencia</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">Estado</th>
                </tr>
              </thead>
              <tbody>
                {conciliaciones.map((c) => (
                  <tr key={c.id} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 text-xs text-slate-700 font-medium">{c.periodo}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        c.tipo === "bancaria" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"
                      }`}>
                        {c.tipo.charAt(0).toUpperCase() + c.tipo.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-700 text-right font-mono">{formatCLP(c.saldoLibro)}</td>
                    <td className="px-4 py-3 text-xs text-slate-700 text-right font-mono">{formatCLP(c.saldoReal)}</td>
                    <td className={`px-4 py-3 text-xs text-right font-mono font-semibold ${c.diferencia > 0 ? "text-red-600" : "text-emerald-600"}`}>
                      {formatCLP(c.diferencia)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit ${
                        c.estado === "conciliada" ? "bg-emerald-50 text-emerald-700" :
                        c.estado === "con_diferencias" ? "bg-red-50 text-red-700" :
                        "bg-amber-50 text-amber-700"
                      }`}>
                        {c.estado === "conciliada" && <CheckCircle2 className="w-3 h-3" />}
                        {c.estado === "con_diferencias" && <XCircle className="w-3 h-3" />}
                        {c.estado === "conciliada" ? "Conciliada" : c.estado === "con_diferencias" ? "Con Diferencias" : "Pendiente"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ejecución mensual detallada */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="px-5 py-4 border-b border-slate-200">
            <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-500" />
              Ejecución Mensual Detallada - 2026
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">Mes</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase text-right">Aprobado</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase text-right">Comprometido</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase text-right">Devengado</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase text-right">Pagado</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">% Ejecución</th>
                </tr>
              </thead>
              <tbody>
                {ejecucionMensual.map((m) => (
                  <tr key={m.mes} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 text-xs text-slate-700 font-semibold">{m.mes}</td>
                    <td className="px-4 py-3 text-xs text-slate-600 text-right font-mono">{formatCompact(m.presupuestoAprobado)}</td>
                    <td className="px-4 py-3 text-xs text-slate-600 text-right font-mono">{formatCompact(m.comprometido)}</td>
                    <td className="px-4 py-3 text-xs text-slate-600 text-right font-mono">{formatCompact(m.devengado)}</td>
                    <td className="px-4 py-3 text-xs text-slate-600 text-right font-mono">{formatCompact(m.pagado)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-100 rounded-full h-1.5">
                          <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${m.porcentajeEjecucion}%` }} />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-600">{m.porcentajeEjecucion}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
