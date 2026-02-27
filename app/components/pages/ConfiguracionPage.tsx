"use client";

import Header from "../Header";
import { usuarios, permisosPorRol, establecimientos, registrosAuditoria } from "../../lib/data";
import { getRolLabel, formatDateTime } from "../../lib/utils";
import { Settings, Users, Shield, Building, Clock, CheckCircle2, XCircle, Key } from "lucide-react";
import type { RolUsuario } from "../../lib/types";

export default function ConfiguracionPage() {
  const roles: RolUsuario[] = ["admin_ti", "supervisor", "director_ee", "subdirector_uatp", "coordinador", "presupuesto", "compras", "juridica", "finanzas"];

  return (
    <div>
      <Header title="Configuración y RBAC" />
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Info */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-900 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-6 h-6" />
            <h2 className="text-lg font-bold">Control de Acceso Basado en Roles (RBAC)</h2>
          </div>
          <p className="text-sm text-slate-300">
            Sistema de permisos conforme a estándares de seguridad estatal. Cada rol tiene permisos específicos de acuerdo al flujo de requerimientos del manual de trazabilidad v3.2.0.
          </p>
        </div>

        {/* Users table */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-500" />
            <h2 className="text-sm font-semibold text-slate-900">Usuarios del Sistema ({usuarios.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">Rol</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">Nombre</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">Email</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">Contraseña</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">Estado</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.id} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                        {getRolLabel(u.rol)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-700 font-medium">{u.nombre}</td>
                    <td className="px-4 py-3 text-xs text-slate-500 font-mono">{u.email}</td>
                    <td className="px-4 py-3 text-xs text-slate-400 font-mono">{u.contrasena}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit ${
                        u.activo ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                      }`}>
                        {u.activo ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {u.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Permissions matrix */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-500" />
            <h2 className="text-sm font-semibold text-slate-900">Matriz de Permisos por Rol</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-3 py-3 text-[10px] font-bold text-slate-500 uppercase sticky left-0 bg-slate-50">Rol</th>
                  <th className="px-3 py-3 text-[10px] font-bold text-slate-500 uppercase text-center">Crear</th>
                  <th className="px-3 py-3 text-[10px] font-bold text-slate-500 uppercase text-center">Derivar</th>
                  <th className="px-3 py-3 text-[10px] font-bold text-slate-500 uppercase text-center">Rechazar</th>
                  <th className="px-3 py-3 text-[10px] font-bold text-slate-500 uppercase text-center">Adjuntar</th>
                  <th className="px-3 py-3 text-[10px] font-bold text-slate-500 uppercase text-center">Finalizar</th>
                  <th className="px-3 py-3 text-[10px] font-bold text-slate-500 uppercase text-center">Asignar Coord.</th>
                  <th className="px-3 py-3 text-[10px] font-bold text-slate-500 uppercase text-center">Ver Todos</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((rol) => {
                  const p = permisosPorRol[rol];
                  const Pill = ({ ok }: { ok: boolean }) => (
                    <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] ${
                      ok ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400"
                    }`}>
                      {ok ? "S" : "N"}
                    </span>
                  );
                  return (
                    <tr key={rol} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-3 py-3 sticky left-0 bg-white">
                        <span className="text-xs font-semibold text-slate-700">{getRolLabel(rol)}</span>
                      </td>
                      <td className="px-3 py-3 text-center"><Pill ok={p.crearRequerimiento} /></td>
                      <td className="px-3 py-3 text-center"><Pill ok={p.derivar} /></td>
                      <td className="px-3 py-3 text-center"><Pill ok={p.rechazar} /></td>
                      <td className="px-3 py-3 text-center"><Pill ok={p.adjuntarArchivos} /></td>
                      <td className="px-3 py-3 text-center"><Pill ok={p.finalizar} /></td>
                      <td className="px-3 py-3 text-center"><Pill ok={p.asignarCoordinador} /></td>
                      <td className="px-3 py-3 text-center"><Pill ok={p.verTodos} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit Log */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <h2 className="text-sm font-semibold text-slate-900">Log de Auditoría (Últimas Acciones)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">Fecha</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">Usuario</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">Acción</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">Módulo</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">Detalle</th>
                </tr>
              </thead>
              <tbody>
                {registrosAuditoria.map((log) => (
                  <tr key={log.id} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 text-xs text-slate-500 font-mono whitespace-nowrap">{formatDateTime(log.fecha)}</td>
                    <td className="px-4 py-3 text-xs text-slate-700 font-medium">{log.usuario}</td>
                    <td className="px-4 py-3 text-xs text-slate-700">{log.accion}</td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {log.modulo}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">{log.detalle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Establecimientos */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center gap-2">
            <Building className="w-4 h-4 text-blue-500" />
            <h2 className="text-sm font-semibold text-slate-900">Establecimientos ({establecimientos.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">RBD</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">Nombre</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">Comuna</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">Tipo</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase text-right">Matrícula</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase">Director</th>
                </tr>
              </thead>
              <tbody>
                {establecimientos.map((est) => {
                  const dir = usuarios.find((u) => u.id === est.directorId);
                  return (
                    <tr key={est.id} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 text-xs font-mono text-slate-600">{est.rbd}</td>
                      <td className="px-4 py-3 text-xs text-slate-700 font-medium">{est.nombre}</td>
                      <td className="px-4 py-3 text-xs text-slate-600">{est.comuna}</td>
                      <td className="px-4 py-3">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 capitalize">
                          {est.tipo}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-700 text-right">{est.matricula.toLocaleString()}</td>
                      <td className="px-4 py-3 text-xs text-slate-600">{dir?.nombre}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
