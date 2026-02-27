"use client";

import { useState } from "react";
import Header from "../Header";
import { useAuth } from "../../lib/auth-context";
import { useNav } from "../../lib/nav-context";
import { establecimientos } from "../../lib/data";
import { ArrowLeft, Send } from "lucide-react";

export default function NuevoRequerimiento() {
  const { usuario } = useAuth();
  const { navigate } = useNav();
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    tipo: "compra_bienes",
    prioridad: "media",
    montoEstimado: "",
    subtitulo: "",
    fuenteFinanciamiento: "",
  });

  if (!usuario) return null;

  const estUsuario = establecimientos.find((e) => e.directorId === usuario.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Requerimiento creado exitosamente (modo demo). Se enviaría a Subdirector UATP.");
    navigate("requerimientos");
  };

  return (
    <div>
      <Header title="Nuevo Requerimiento" />
      <div className="p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate("requerimientos")} className="p-2 rounded-lg hover:bg-slate-100">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Crear Nuevo Requerimiento</h2>
            <p className="text-xs text-slate-500">Etapa 1: El requerimiento se creará en la sección Establecimiento y se enviará al Subdirector UATP</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
          {/* Establecimiento */}
          {estUsuario && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-xs font-semibold text-blue-800">Establecimiento</p>
              <p className="text-sm text-blue-900 font-medium">{estUsuario.nombre}</p>
              <p className="text-xs text-blue-600">RBD {estUsuario.rbd} &bull; {estUsuario.comuna}</p>
            </div>
          )}

          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Título del Requerimiento *</label>
              <input
                type="text"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                placeholder="Ej: Adquisición de equipamiento para laboratorio"
                className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Descripción *</label>
              <textarea
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                placeholder="Detalle del requerimiento, justificación y antecedentes..."
                className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 h-32 resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tipo *</label>
                <select
                  value={formData.tipo}
                  onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="compra_bienes">Compra de Bienes</option>
                  <option value="contratacion_servicio">Contratación de Servicio</option>
                  <option value="reparacion_infraestructura">Reparación Infraestructura</option>
                  <option value="solicitud_presupuesto">Solicitud Presupuesto</option>
                  <option value="consulta_juridica">Consulta Jurídica</option>
                  <option value="rendicion_fondos">Rendición de Fondos</option>
                  <option value="pago_proveedor">Pago a Proveedor</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Prioridad *</label>
                <select
                  value={formData.prioridad}
                  onChange={(e) => setFormData({ ...formData, prioridad: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                  <option value="urgente">Urgente</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Monto Estimado</label>
                <input
                  type="number"
                  value={formData.montoEstimado}
                  onChange={(e) => setFormData({ ...formData, montoEstimado: e.target.value })}
                  placeholder="$0"
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subtítulo</label>
                <select
                  value={formData.subtitulo}
                  onChange={(e) => setFormData({ ...formData, subtitulo: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="">Seleccionar...</option>
                  <option value="21">Sub 21 - Personal</option>
                  <option value="22">Sub 22 - Bienes y Servicios</option>
                  <option value="24">Sub 24 - Transferencias</option>
                  <option value="29">Sub 29 - Activos</option>
                  <option value="31">Sub 31 - Inversiones</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Fuente</label>
                <select
                  value={formData.fuenteFinanciamiento}
                  onChange={(e) => setFormData({ ...formData, fuenteFinanciamiento: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="">Seleccionar...</option>
                  <option value="subvencion_regular">Subvención Regular</option>
                  <option value="subvencion_preferencial">SEP</option>
                  <option value="pie">PIE</option>
                  <option value="faep">FAEP</option>
                  <option value="fondos_propios">Fondos Propios</option>
                  <option value="transferencias_ministeriales">Transf. Ministeriales</option>
                </select>
              </div>
            </div>

            {/* File upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Archivos Adjuntos</label>
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:border-blue-300 transition-colors">
                <p className="text-sm text-slate-500">Arrastre archivos aquí o haga clic para seleccionar</p>
                <p className="text-[10px] text-slate-400 mt-1">PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (max 10MB)</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              <Send className="w-4 h-4" />
              Crear y Enviar a Subdirector UATP
            </button>
            <button
              type="button"
              onClick={() => navigate("requerimientos")}
              className="px-6 py-2.5 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
