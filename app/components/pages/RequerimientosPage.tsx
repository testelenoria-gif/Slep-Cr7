"use client";

import { useState } from "react";
import Header from "../Header";
import { useAuth } from "../../lib/auth-context";
import { useNav } from "../../lib/nav-context";
import { requerimientos, establecimientos, usuarios, permisosPorRol } from "../../lib/data";
import { formatCompact, formatDate, getEstadoReqLabel, getEstadoReqStyle, getPrioridadStyle, getSeccionLabel, getSeccionColor, getTipoReqLabel, getNivelRiesgoLabel, getRiskColor } from "../../lib/utils";
import { Plus, Search, Filter, Clock, CheckCircle2, XCircle, ArrowRight, Eye, FileText, Building, ChevronDown } from "lucide-react";

export default function RequerimientosPage() {
  const { usuario } = useAuth();
  const { navigate } = useNav();
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [filtroSeccion, setFiltroSeccion] = useState("todos");
  const [busqueda, setBusqueda] = useState("");

  if (!usuario) return null;

  const permisos = permisosPorRol[usuario.rol];

  // Filter requirements by role
  const reqsFiltrados = requerimientos.filter((req) => {
    // Supervisor and admin see all
    if (permisos.verTodos) return true;
    // Director EE sees their own establishment
    if (usuario.rol === "director_ee") {
      const est = establecimientos.find((e) => e.directorId === usuario.id);
      return est ? req.establecimientoId === est.id : false;
    }
    // Subdirector sees those in their section
    if (usuario.rol === "subdirector_uatp") return req.seccionActual === "subdirector_uatp" || req.movimientos.some(m => m.seccionOrigen === "subdirector_uatp" || m.seccionDestino === "subdirector_uatp");
    // Coordinador sees assigned
    if (usuario.rol === "coordinador") return req.coordinadorAsignado === usuario.id || req.seccionActual === "coordinador";
    // Operational roles see their section
    return req.seccionActual === usuario.rol || req.movimientos.some(m => m.seccionDestino === usuario.rol as string);
  });

  // Apply filters
  const reqsMostrados = reqsFiltrados.filter((req) => {
    if (filtroEstado !== "todos" && req.estado !== filtroEstado) return false;
    if (filtroSeccion !== "todos" && req.seccionActual !== filtroSeccion) return false;
    if (busqueda) {
      const q = busqueda.toLowerCase();
      return req.numero.toLowerCase().includes(q) || req.titulo.toLowerCase().includes(q) || req.descripcion.toLowerCase().includes(q);
    }
    return true;
  });

  const stats = {
    total: reqsFiltrados.length,
    activos: reqsFiltrados.filter(r => !["finalizado", "rechazado"].includes(r.estado)).length,
    finalizados: reqsFiltrados.filter(r => r.estado === "finalizado").length,
    rechazados: reqsFiltrados.filter(r => r.estado === "rechazado").length,
  };

  return (
    <div>
      <Header title="Requerimientos" />
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
            <p className="text-xs text-slate-500">Total</p>
          </div>
          <div className="bg-white rounded-xl border border-blue-200 p-4 text-center">
            <p className="text-2xl font-bold text-blue-700">{stats.activos}</p>
            <p className="text-xs text-blue-600">Activos</p>
          </div>
          <div className="bg-white rounded-xl border border-emerald-200 p-4 text-center">
            <p className="text-2xl font-bold text-emerald-700">{stats.finalizados}</p>
            <p className="text-xs text-emerald-600">Finalizados</p>
          </div>
          <div className="bg-white rounded-xl border border-red-200 p-4 text-center">
            <p className="text-2xl font-bold text-red-700">{stats.rechazados}</p>
            <p className="text-xs text-red-600">Rechazados</p>
          </div>
        </div>

        {/* Actions & Filters */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3 flex-wrap">
            {permisos.crearRequerimiento && (
              <button
                onClick={() => navigate("nuevo-requerimiento")}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Nuevo Requerimiento
              </button>
            )}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por número, título..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
              />
            </div>
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="todos">Todos los estados</option>
              <option value="ingresado">Ingresado</option>
              <option value="en_revision_subdirector">En Revisión</option>
              <option value="en_gestion">En Gestión</option>
              <option value="derivado">Derivado</option>
              <option value="finalizado">Finalizado</option>
              <option value="rechazado">Rechazado</option>
            </select>
            <select
              value={filtroSeccion}
              onChange={(e) => setFiltroSeccion(e.target.value)}
              className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="todos">Todas las secciones</option>
              <option value="establecimiento">Establecimiento</option>
              <option value="subdirector_uatp">Subdirector UATP</option>
              <option value="coordinador">Coordinador</option>
              <option value="presupuesto">Presupuesto</option>
              <option value="compras">Compras</option>
              <option value="juridica">Jurídica</option>
              <option value="finanzas">Finanzas</option>
            </select>
          </div>
        </div>

        {/* Requirements List */}
        <div className="space-y-3">
          {reqsMostrados.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-500">No se encontraron requerimientos</p>
            </div>
          ) : (
            reqsMostrados.map((req) => {
              const est = establecimientos.find((e) => e.id === req.establecimientoId);
              const creador = usuarios.find((u) => u.id === req.creadoPor);
              return (
                <div
                  key={req.id}
                  onClick={() => navigate("requerimiento-detalle", { id: req.id })}
                  className="bg-white rounded-xl border border-slate-200 p-5 hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="text-xs font-mono text-slate-400">{req.numero}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${getEstadoReqStyle(req.estado)}`}>
                          {getEstadoReqLabel(req.estado)}
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${getPrioridadStyle(req.prioridad)}`}>
                          {req.prioridad.toUpperCase()}
                        </span>
                        {req.nivelRiesgo && req.nivelRiesgo !== "bajo" && (
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getRiskColor(req.nivelRiesgo)}`}>
                            Riesgo: {getNivelRiesgoLabel(req.nivelRiesgo)}
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-semibold text-slate-900">{req.titulo}</h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{req.descripcion}</p>
                      <div className="flex items-center gap-4 mt-2 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          {est?.nombre || "N/A"}
                        </span>
                        <span>{getTipoReqLabel(req.tipo)}</span>
                        {req.montoEstimado && <span>{formatCompact(req.montoEstimado)}</span>}
                        <span>{formatDate(req.fechaCreacion)}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${getSeccionColor(req.seccionActual)}`}>
                        {getSeccionLabel(req.seccionActual)}
                      </span>
                      <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-400">
                        <FileText className="w-3 h-3" />
                        {req.archivos.length} archivos
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                        <ArrowRight className="w-3 h-3" />
                        {req.movimientos.length} movimientos
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
