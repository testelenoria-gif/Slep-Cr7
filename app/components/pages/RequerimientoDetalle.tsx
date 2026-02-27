"use client";

import { useState } from "react";
import Header from "../Header";
import { useAuth } from "../../lib/auth-context";
import { useNav } from "../../lib/nav-context";
import { requerimientos, establecimientos, usuarios, permisosPorRol } from "../../lib/data";
import {
  formatCompact, formatDateTime, getEstadoReqLabel, getEstadoReqStyle, getPrioridadStyle,
  getSeccionLabel, getSeccionColor, getTipoReqLabel, getNivelRiesgoLabel, getRiskColor,
  getAccionLabel, getAccionColor, getSubtituloLabel, getFuenteLabel,
} from "../../lib/utils";
import {
  ArrowLeft, ArrowRight, FileText, Clock, Paperclip, Send, XCircle,
  CheckCircle2, MessageSquare, Upload, User, Building, AlertTriangle,
  Info,
} from "lucide-react";
import type { SeccionFlujo } from "../../lib/types";

export default function RequerimientoDetalle() {
  const { usuario } = useAuth();
  const { navigate, params } = useNav();
  const [comentario, setComentario] = useState("");
  const [seccionDestino, setSeccionDestino] = useState<SeccionFlujo | "">("");
  const [showDerivar, setShowDerivar] = useState(false);
  const [showRechazar, setShowRechazar] = useState(false);
  const [motivoRechazo, setMotivoRechazo] = useState("");

  if (!usuario) return null;

  const req = requerimientos.find((r) => r.id === params.id);
  if (!req) {
    return (
      <div className="p-12 text-center">
        <p className="text-slate-500">Requerimiento no encontrado</p>
        <button onClick={() => navigate("requerimientos")} className="text-blue-600 text-sm mt-2 hover:underline">
          Volver a la lista
        </button>
      </div>
    );
  }

  const est = establecimientos.find((e) => e.id === req.establecimientoId);
  const creador = usuarios.find((u) => u.id === req.creadoPor);
  const coordinador = req.coordinadorAsignado ? usuarios.find((u) => u.id === req.coordinadorAsignado) : null;
  const permisos = permisosPorRol[usuario.rol];

  const canDerivar = permisos.derivar && !["finalizado", "rechazado"].includes(req.estado);
  const canRechazar = permisos.rechazar && !["finalizado", "rechazado"].includes(req.estado);
  const canFinalizar = permisos.finalizar && !["finalizado", "rechazado"].includes(req.estado);
  const canAdjuntar = permisos.adjuntarArchivos && !["finalizado", "rechazado"].includes(req.estado);
  const canAsignarCoord = permisos.asignarCoordinador && req.seccionActual === "subdirector_uatp";

  return (
    <div>
      <Header title={`Requerimiento ${req.numero}`} />
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Back + Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("requerimientos")}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono text-slate-400">{req.numero}</span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${getEstadoReqStyle(req.estado)}`}>
                {getEstadoReqLabel(req.estado)}
              </span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${getPrioridadStyle(req.prioridad)}`}>
                {req.prioridad.toUpperCase()}
              </span>
              <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${getSeccionColor(req.seccionActual)}`}>
                {getSeccionLabel(req.seccionActual)}
              </span>
              {req.nivelRiesgo && (
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getRiskColor(req.nivelRiesgo)}`}>
                  Riesgo: {getNivelRiesgoLabel(req.nivelRiesgo)}
                </span>
              )}
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">{req.titulo}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-500" />
                Descripción
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">{req.descripcion}</p>
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Tipo</p>
                  <p className="text-sm text-slate-700">{getTipoReqLabel(req.tipo)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Monto Estimado</p>
                  <p className="text-sm text-slate-700 font-semibold">{req.montoEstimado ? formatCompact(req.montoEstimado) : "No especificado"}</p>
                </div>
                {req.subtitulo && (
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Subtítulo</p>
                    <p className="text-sm text-slate-700">{getSubtituloLabel(req.subtitulo)}</p>
                  </div>
                )}
                {req.fuenteFinanciamiento && (
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Fuente</p>
                    <p className="text-sm text-slate-700">{getFuenteLabel(req.fuenteFinanciamiento)}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                Historial del Flujo ({req.movimientos.length} movimientos)
              </h3>
              <div className="space-y-0">
                {req.movimientos.map((mov, i) => {
                  const actor = usuarios.find((u) => u.id === mov.realizadoPor);
                  return (
                    <div key={mov.id} className="timeline-line flex gap-3 pb-4">
                      <div className={`w-8 h-8 rounded-full ${getAccionColor(mov.accion)} flex items-center justify-center flex-shrink-0 z-10`}>
                        {mov.accion === "crear" && <FileText className="w-3.5 h-3.5 text-white" />}
                        {mov.accion === "derivar" && <ArrowRight className="w-3.5 h-3.5 text-white" />}
                        {mov.accion === "rechazar" && <XCircle className="w-3.5 h-3.5 text-white" />}
                        {mov.accion === "finalizar" && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                        {mov.accion === "solicitar_info" && <MessageSquare className="w-3.5 h-3.5 text-white" />}
                        {mov.accion === "adjuntar" && <Paperclip className="w-3.5 h-3.5 text-white" />}
                        {mov.accion === "comentar" && <MessageSquare className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-slate-800">{getAccionLabel(mov.accion)}</span>
                          <span className="text-[10px] text-slate-400">{formatDateTime(mov.fecha)}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">{mov.comentario}</p>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                          <User className="w-3 h-3" />
                          {actor?.nombre || mov.realizadoPor}
                          {mov.accion === "derivar" && (
                            <span className="flex items-center gap-1">
                              <ArrowRight className="w-3 h-3" />
                              <span className={`px-1.5 py-0.5 rounded ${getSeccionColor(mov.seccionDestino)}`}>
                                {getSeccionLabel(mov.seccionDestino)}
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions Panel */}
            {(canDerivar || canRechazar || canFinalizar) && (
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="text-sm font-semibold text-slate-900 mb-4">Acciones</h3>
                <div className="flex gap-2 flex-wrap">
                  {canDerivar && (
                    <button
                      onClick={() => { setShowDerivar(!showDerivar); setShowRechazar(false); }}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      Derivar
                    </button>
                  )}
                  {canAsignarCoord && (
                    <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors">
                      <User className="w-4 h-4" />
                      Asignar Coordinador
                    </button>
                  )}
                  {canFinalizar && (
                    <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors">
                      <CheckCircle2 className="w-4 h-4" />
                      Finalizar
                    </button>
                  )}
                  {canRechazar && (
                    <button
                      onClick={() => { setShowRechazar(!showRechazar); setShowDerivar(false); }}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      Rechazar
                    </button>
                  )}
                  {canAdjuntar && (
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                      <Upload className="w-4 h-4" />
                      Adjuntar Archivo
                    </button>
                  )}
                </div>

                {/* Derivar form */}
                {showDerivar && (
                  <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <p className="text-sm font-semibold text-indigo-900 mb-2">Derivar Requerimiento</p>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-medium text-indigo-800">Sección destino</label>
                        <select
                          value={seccionDestino}
                          onChange={(e) => setSeccionDestino(e.target.value as SeccionFlujo)}
                          className="w-full mt-1 px-3 py-2 text-sm border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        >
                          <option value="">Seleccionar destino...</option>
                          {permisos.seccionesDerivacion.map((sec) => (
                            <option key={sec} value={sec}>{getSeccionLabel(sec)}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-indigo-800">Comentario</label>
                        <textarea
                          value={comentario}
                          onChange={(e) => setComentario(e.target.value)}
                          placeholder="Motivo de la derivación..."
                          className="w-full mt-1 px-3 py-2 text-sm border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 h-20 resize-none"
                        />
                      </div>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">
                        Confirmar Derivación
                      </button>
                    </div>
                  </div>
                )}

                {/* Rechazar form */}
                {showRechazar && (
                  <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-sm font-semibold text-red-900 mb-2">Rechazar Requerimiento</p>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-medium text-red-800">Motivo del rechazo (obligatorio)</label>
                        <textarea
                          value={motivoRechazo}
                          onChange={(e) => setMotivoRechazo(e.target.value)}
                          placeholder="Explique el motivo del rechazo..."
                          className="w-full mt-1 px-3 py-2 text-sm border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 h-20 resize-none"
                        />
                      </div>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors">
                        Confirmar Rechazo
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right column: Info */}
          <div className="space-y-6">
            {/* Info Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Información</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <p className="text-slate-400 uppercase font-semibold text-[10px]">Establecimiento</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <p className="text-slate-700 font-medium">{est?.nombre}</p>
                  </div>
                  {est && <p className="text-slate-400 ml-5">RBD {est.rbd} &bull; {est.comuna}</p>}
                </div>
                <div>
                  <p className="text-slate-400 uppercase font-semibold text-[10px]">Creado por</p>
                  <p className="text-slate-700">{creador?.nombre}</p>
                  <p className="text-slate-400">{formatDateTime(req.fechaCreacion)}</p>
                </div>
                {coordinador && (
                  <div>
                    <p className="text-slate-400 uppercase font-semibold text-[10px]">Coordinador Asignado</p>
                    <p className="text-slate-700">{coordinador.nombre}</p>
                  </div>
                )}
                <div>
                  <p className="text-slate-400 uppercase font-semibold text-[10px]">Última actualización</p>
                  <p className="text-slate-700">{formatDateTime(req.fechaActualizacion)}</p>
                </div>
              </div>
            </div>

            {/* Archivos */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-blue-500" />
                Archivos ({req.archivos.length})
              </h3>
              {req.archivos.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">Sin archivos adjuntos</p>
              ) : (
                <div className="space-y-2">
                  {req.archivos.map((arch) => {
                    const uploader = usuarios.find((u) => u.id === arch.cargadoPor);
                    return (
                      <div key={arch.id} className="flex items-center gap-2 p-2 rounded-lg border border-slate-100 hover:bg-slate-50">
                        <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-slate-700 truncate">{arch.nombre}</p>
                          <p className="text-[10px] text-slate-400">{arch.tamano} &bull; {uploader?.nombre}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              <p className="text-[10px] text-slate-400 mt-3 border-t border-slate-100 pt-2">
                Formatos: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (max 10MB)
              </p>
            </div>

            {/* Flujo Visual */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Ruta del Flujo</h3>
              <div className="space-y-2">
                {req.movimientos.filter(m => m.accion === "crear" || m.accion === "derivar" || m.accion === "rechazar" || m.accion === "finalizar").map((mov, i) => (
                  <div key={mov.id} className="flex items-center gap-2">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${getSeccionColor(mov.seccionDestino)}`}>
                      {getSeccionLabel(mov.seccionDestino)}
                    </span>
                    {i < req.movimientos.filter(m => ["crear", "derivar", "rechazar", "finalizar"].includes(m.accion)).length - 1 && (
                      <ArrowRight className="w-3 h-3 text-slate-300" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
