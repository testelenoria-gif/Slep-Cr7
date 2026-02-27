"use client";

import Header from "../Header";
import { normasLegales } from "../../lib/data";
import { Scale, BookOpen, Search, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function LegalPage() {
  const [filtro, setFiltro] = useState("todas");
  const [busqueda, setBusqueda] = useState("");

  const normasFiltradas = normasLegales.filter((n) => {
    if (filtro !== "todas" && n.categoria !== filtro) return false;
    if (busqueda) {
      const q = busqueda.toLowerCase();
      return n.nombre.toLowerCase().includes(q) || n.numero.toLowerCase().includes(q) || n.resumen.toLowerCase().includes(q);
    }
    return true;
  });

  const categorias = [
    { value: "todas", label: "Todas" },
    { value: "educacion", label: "Educación" },
    { value: "compras", label: "Compras Públicas" },
    { value: "presupuesto", label: "Presupuesto" },
    { value: "contabilidad", label: "Contabilidad" },
    { value: "general", label: "General" },
  ];

  return (
    <div>
      <Header title="Normativa Legal" />
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Header info */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Scale className="w-6 h-6" />
            <h2 className="text-lg font-bold">Soporte Legal Integrado</h2>
          </div>
          <p className="text-sm text-amber-100">
            Base normativa actualizada para el cumplimiento legal de los SLEP. Incluye Ley 21.040, Ley 19.886, DL 1.263 y normativa CGR.
            Las reglas del motor de cumplimiento se actualizan automáticamente según cambios legales.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar normativa..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            />
          </div>
          <div className="flex gap-1">
            {categorias.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFiltro(cat.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  filtro === cat.value ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Normas list */}
        <div className="space-y-4">
          {normasFiltradas.map((norma) => (
            <div key={norma.id} className="bg-white rounded-xl border border-slate-200 p-5 card-hover">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      norma.tipo === "ley" ? "bg-blue-100 text-blue-700" :
                      norma.tipo === "decreto" ? "bg-purple-100 text-purple-700" :
                      norma.tipo === "resolucion" ? "bg-green-100 text-green-700" :
                      "bg-slate-100 text-slate-600"
                    }`}>
                      {norma.tipo}
                    </span>
                    <span className="text-xs font-mono text-slate-500">{norma.numero}</span>
                    {norma.vigente && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                        Vigente
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900">{norma.nombre}</h3>
                  <p className="text-xs text-slate-500 mt-1">{norma.resumen}</p>
                  <div className="mt-3">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase mb-1">Artículos Relevantes</p>
                    <div className="flex flex-wrap gap-1">
                      {norma.articulosRelevantes.map((art, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-slate-600">
                          {art}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[10px] text-slate-400">Publicada</p>
                  <p className="text-xs text-slate-600">{new Date(norma.fechaPublicacion).toLocaleDateString("es-CL")}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
