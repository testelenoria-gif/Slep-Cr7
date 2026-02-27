"use client";

import Header from "../Header";
import { informesAuditoria, alertasRiesgo } from "../../lib/data";
import { formatDate, getRiskColor, getNivelRiesgoLabel } from "../../lib/utils";
import { ShieldCheck, AlertTriangle, FileText, Clock, CheckCircle2, BarChart3 } from "lucide-react";

export default function AuditoriaPage() {
  const hallazgosTotales = informesAuditoria.flatMap((inf) => inf.hallazgos);
  const abiertos = hallazgosTotales.filter((h) => h.estado === "abierto").length;
  const enCorreccion = hallazgosTotales.filter((h) => h.estado === "en_correccion").length;
  const cerrados = hallazgosTotales.filter((h) => h.estado === "cerrado").length;

  return (
    <div>
      <Header title="Auditoría Preventiva" />
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <p className="text-2xl font-bold text-slate-900">{informesAuditoria.length}</p>
            <p className="text-xs text-slate-500">Informes</p>
          </div>
          <div className="bg-white rounded-xl border border-red-200 p-4 text-center">
            <p className="text-2xl font-bold text-red-700">{abiertos}</p>
            <p className="text-xs text-red-600">Hallazgos Abiertos</p>
          </div>
          <div className="bg-white rounded-xl border border-amber-200 p-4 text-center">
            <p className="text-2xl font-bold text-amber-700">{enCorreccion}</p>
            <p className="text-xs text-amber-600">En Corrección</p>
          </div>
          <div className="bg-white rounded-xl border border-emerald-200 p-4 text-center">
            <p className="text-2xl font-bold text-emerald-700">{cerrados}</p>
            <p className="text-xs text-emerald-600">Cerrados</p>
          </div>
        </div>

        {/* Simulación Contraloría */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck className="w-6 h-6" />
            <h2 className="text-lg font-bold">Simulación de Revisión Contraloría</h2>
          </div>
          <p className="text-sm text-blue-100 mb-4">
            Evaluación preventiva del estado de cumplimiento normativo del SLEP, simulando los criterios de fiscalización de la Contraloría General de la República.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold">{informesAuditoria[informesAuditoria.length - 1]?.puntuacionCumplimiento || 0}%</p>
              <p className="text-xs text-blue-200">Cumplimiento General</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold">{alertasRiesgo.filter(a => a.nivelRiesgo === "critico" && a.estado === "activa").length}</p>
              <p className="text-xs text-blue-200">Riesgos Críticos</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold">{hallazgosTotales.length}</p>
              <p className="text-xs text-blue-200">Hallazgos Totales</p>
            </div>
          </div>
        </div>

        {/* Informes */}
        {informesAuditoria.map((informe) => (
          <div key={informe.id} className="bg-white rounded-xl border border-slate-200">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <h3 className="text-sm font-semibold text-slate-900">{informe.titulo}</h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{informe.periodo} &bull; {formatDate(informe.fecha)}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <p className={`text-lg font-bold ${informe.puntuacionCumplimiento >= 80 ? "text-emerald-600" : informe.puntuacionCumplimiento >= 60 ? "text-amber-600" : "text-red-600"}`}>
                    {informe.puntuacionCumplimiento}%
                  </p>
                  <p className="text-[10px] text-slate-400">Cumplimiento</p>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${
                  informe.estado === "aprobado" ? "bg-emerald-50 text-emerald-700" :
                  informe.estado === "borrador" ? "bg-slate-100 text-slate-600" :
                  "bg-blue-50 text-blue-700"
                }`}>
                  {informe.estado.charAt(0).toUpperCase() + informe.estado.slice(1)}
                </span>
              </div>
            </div>
            <div className="p-5 space-y-3">
              {informe.hallazgos.map((h) => (
                <div key={h.id} className={`p-4 rounded-lg border ${getRiskColor(h.nivelRiesgo)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold uppercase`}>{getNivelRiesgoLabel(h.nivelRiesgo)}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          h.estado === "abierto" ? "bg-red-100 text-red-700" :
                          h.estado === "en_correccion" ? "bg-amber-100 text-amber-700" :
                          "bg-emerald-100 text-emerald-700"
                        }`}>
                          {h.estado === "abierto" ? "Abierto" : h.estado === "en_correccion" ? "En Corrección" : "Cerrado"}
                        </span>
                      </div>
                      <p className="text-sm font-medium">{h.descripcion}</p>
                      <p className="text-xs mt-1 opacity-80">Norma: {h.normaIncumplida}</p>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-current/10 flex items-center justify-between">
                    <p className="text-xs"><strong>Recomendación:</strong> {h.recomendacion}</p>
                    <span className="text-[10px] flex items-center gap-1 flex-shrink-0 ml-3">
                      <Clock className="w-3 h-3" />
                      Plazo: {formatDate(h.plazoCorreccion)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
