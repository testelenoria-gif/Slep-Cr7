import type { NivelRiesgo, EstadoGasto, RolUsuario, SeccionFlujo, EstadoRequerimiento, Prioridad, TipoRequerimiento } from "./types";

export function formatCLP(amount: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCompact(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `$${(amount / 1_000_000_000).toFixed(1)}MM`;
  }
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(0)}M`;
  }
  return formatCLP(amount);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("es-CL", { day: "2-digit", month: "short", year: "numeric" });
}

export function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString("es-CL", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

// ─── Colores de Riesgo ───────────────────────────────────────

export function getRiskColor(nivel: NivelRiesgo): string {
  const colors: Record<NivelRiesgo, string> = {
    bajo: "text-emerald-700 bg-emerald-50 border-emerald-200",
    medio: "text-amber-700 bg-amber-50 border-amber-200",
    alto: "text-orange-700 bg-orange-50 border-orange-200",
    critico: "text-red-700 bg-red-50 border-red-200",
  };
  return colors[nivel];
}

export function getRiskDot(nivel: NivelRiesgo): string {
  const colors: Record<NivelRiesgo, string> = {
    bajo: "bg-emerald-500",
    medio: "bg-amber-500",
    alto: "bg-orange-500",
    critico: "bg-red-500",
  };
  return colors[nivel];
}

export function getNivelRiesgoLabel(nivel: NivelRiesgo): string {
  const labels: Record<NivelRiesgo, string> = { bajo: "Bajo", medio: "Medio", alto: "Alto", critico: "Crítico" };
  return labels[nivel];
}

// ─── Estado de Gasto ─────────────────────────────────────────

export function getEstadoStyle(estado: EstadoGasto): string {
  const styles: Record<EstadoGasto, string> = {
    borrador: "text-slate-600 bg-slate-100 border-slate-200",
    pendiente_aprobacion: "text-blue-700 bg-blue-50 border-blue-200",
    aprobado: "text-emerald-700 bg-emerald-50 border-emerald-200",
    rechazado: "text-red-700 bg-red-50 border-red-200",
    observado: "text-orange-700 bg-orange-50 border-orange-200",
    ejecutado: "text-purple-700 bg-purple-50 border-purple-200",
    anulado: "text-gray-500 bg-gray-100 border-gray-200",
  };
  return styles[estado];
}

export function getEstadoLabel(estado: EstadoGasto): string {
  const labels: Record<EstadoGasto, string> = {
    borrador: "Borrador", pendiente_aprobacion: "Pendiente", aprobado: "Aprobado",
    rechazado: "Rechazado", observado: "Observado", ejecutado: "Ejecutado", anulado: "Anulado",
  };
  return labels[estado];
}

// ─── Estado de Requerimiento ─────────────────────────────────

export function getEstadoReqLabel(estado: EstadoRequerimiento): string {
  const labels: Record<EstadoRequerimiento, string> = {
    ingresado: "Ingresado",
    en_revision_subdirector: "En Revisión",
    asignado_coordinador: "Asignado",
    en_gestion: "En Gestión",
    derivado: "Derivado",
    en_proceso: "En Proceso",
    rechazado: "Rechazado",
    finalizado: "Finalizado",
    pendiente_informacion: "Pend. Info",
  };
  return labels[estado];
}

export function getEstadoReqStyle(estado: EstadoRequerimiento): string {
  const styles: Record<EstadoRequerimiento, string> = {
    ingresado: "text-slate-600 bg-slate-100",
    en_revision_subdirector: "text-blue-700 bg-blue-50",
    asignado_coordinador: "text-indigo-700 bg-indigo-50",
    en_gestion: "text-purple-700 bg-purple-50",
    derivado: "text-cyan-700 bg-cyan-50",
    en_proceso: "text-violet-700 bg-violet-50",
    rechazado: "text-red-700 bg-red-50",
    finalizado: "text-emerald-700 bg-emerald-50",
    pendiente_informacion: "text-amber-700 bg-amber-50",
  };
  return styles[estado];
}

// ─── Prioridad ───────────────────────────────────────────────

export function getPrioridadStyle(prioridad: Prioridad): string {
  const styles: Record<Prioridad, string> = {
    baja: "text-slate-600 bg-slate-100",
    media: "text-blue-600 bg-blue-50",
    alta: "text-orange-600 bg-orange-50",
    urgente: "text-red-600 bg-red-50",
  };
  return styles[prioridad];
}

// ─── Sección del Flujo ───────────────────────────────────────

export function getSeccionLabel(seccion: SeccionFlujo): string {
  const labels: Record<SeccionFlujo, string> = {
    establecimiento: "Establecimiento",
    subdirector_uatp: "Subdirector UATP",
    coordinador: "Coordinador",
    presupuesto: "Presupuesto",
    compras: "Compras",
    juridica: "Jurídica",
    finanzas: "Finanzas",
    rechazados: "Rechazados",
    finalizado: "Finalizado",
  };
  return labels[seccion];
}

export function getSeccionColor(seccion: SeccionFlujo): string {
  const colors: Record<SeccionFlujo, string> = {
    establecimiento: "bg-blue-100 text-blue-800",
    subdirector_uatp: "bg-purple-100 text-purple-800",
    coordinador: "bg-indigo-100 text-indigo-800",
    presupuesto: "bg-emerald-100 text-emerald-800",
    compras: "bg-cyan-100 text-cyan-800",
    juridica: "bg-amber-100 text-amber-800",
    finanzas: "bg-green-100 text-green-800",
    rechazados: "bg-red-100 text-red-800",
    finalizado: "bg-emerald-100 text-emerald-800",
  };
  return colors[seccion];
}

// ─── Roles ───────────────────────────────────────────────────

export function getRolLabel(rol: RolUsuario): string {
  const labels: Record<RolUsuario, string> = {
    admin_ti: "Administrador TI",
    supervisor: "Supervisor",
    director_ee: "Director EE",
    subdirector_uatp: "Subdirector UATP",
    coordinador: "Coordinador",
    presupuesto: "Presupuesto",
    compras: "Compras",
    juridica: "Jurídica",
    finanzas: "Finanzas",
  };
  return labels[rol];
}

// ─── Tipo Requerimiento ──────────────────────────────────────

export function getTipoReqLabel(tipo: TipoRequerimiento): string {
  const labels: Record<TipoRequerimiento, string> = {
    compra_bienes: "Compra de Bienes",
    contratacion_servicio: "Contratación de Servicio",
    reparacion_infraestructura: "Reparación Infraestructura",
    solicitud_presupuesto: "Solicitud Presupuesto",
    consulta_juridica: "Consulta Jurídica",
    rendicion_fondos: "Rendición de Fondos",
    pago_proveedor: "Pago a Proveedor",
    otro: "Otro",
  };
  return labels[tipo];
}

// ─── Subtítulos ──────────────────────────────────────────────

export function getSubtituloLabel(sub: string): string {
  const labels: Record<string, string> = {
    "21": "Sub 21 - Gastos en Personal",
    "22": "Sub 22 - Bienes y Servicios",
    "23": "Sub 23 - Prestaciones Seg. Social",
    "24": "Sub 24 - Transferencias Corrientes",
    "25": "Sub 25 - Íntegros al Fisco",
    "26": "Sub 26 - Otros Gastos Corrientes",
    "29": "Sub 29 - Adquisición de Activos",
    "31": "Sub 31 - Inversiones",
    "32": "Sub 32 - Préstamos",
    "33": "Sub 33 - Transferencias de Capital",
    "34": "Sub 34 - Servicio de la Deuda",
    "35": "Sub 35 - Saldo Final de Caja",
  };
  return labels[sub] || sub;
}

export function getFuenteLabel(fuente: string): string {
  const labels: Record<string, string> = {
    subvencion_regular: "Subvención Regular",
    subvencion_preferencial: "SEP",
    pie: "PIE",
    faep: "FAEP",
    aportes_municipales: "Aportes Municipales",
    fondos_propios: "Fondos Propios",
    transferencias_ministeriales: "Transf. Ministeriales",
    otros: "Otros",
  };
  return labels[fuente] || fuente;
}

// ─── Acción del Flujo ────────────────────────────────────────

export function getAccionLabel(accion: string): string {
  const labels: Record<string, string> = {
    crear: "Creado",
    derivar: "Derivado",
    rechazar: "Rechazado",
    solicitar_info: "Info Solicitada",
    adjuntar: "Archivo Adjunto",
    finalizar: "Finalizado",
    comentar: "Comentario",
  };
  return labels[accion] || accion;
}

export function getAccionColor(accion: string): string {
  const colors: Record<string, string> = {
    crear: "bg-blue-500",
    derivar: "bg-indigo-500",
    rechazar: "bg-red-500",
    solicitar_info: "bg-amber-500",
    adjuntar: "bg-slate-500",
    finalizar: "bg-emerald-500",
    comentar: "bg-slate-400",
  };
  return colors[accion] || "bg-slate-400";
}
