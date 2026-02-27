// ============================================================
// SLEP Control Financiero - Sistema de Trazabilidad v3.2.0
// Type Definitions
// ============================================================

// ─── Roles del Sistema ───────────────────────────────────────

export type RolUsuario =
  | "admin_ti"
  | "supervisor"
  | "director_ee"
  | "subdirector_uatp"
  | "coordinador"
  | "presupuesto"
  | "compras"
  | "juridica"
  | "finanzas";

// ─── Secciones del Flujo ─────────────────────────────────────

export type SeccionFlujo =
  | "establecimiento"
  | "subdirector_uatp"
  | "coordinador"
  | "presupuesto"
  | "compras"
  | "juridica"
  | "finanzas"
  | "rechazados"
  | "finalizado";

// ─── Estados de Requerimiento ────────────────────────────────

export type EstadoRequerimiento =
  | "ingresado"
  | "en_revision_subdirector"
  | "asignado_coordinador"
  | "en_gestion"
  | "derivado"
  | "en_proceso"
  | "rechazado"
  | "finalizado"
  | "pendiente_informacion";

// ─── Prioridad ───────────────────────────────────────────────

export type Prioridad = "baja" | "media" | "alta" | "urgente";

// ─── Nivel de Riesgo ─────────────────────────────────────────

export type NivelRiesgo = "bajo" | "medio" | "alto" | "critico";

// ─── Tipo de Requerimiento ───────────────────────────────────

export type TipoRequerimiento =
  | "compra_bienes"
  | "contratacion_servicio"
  | "reparacion_infraestructura"
  | "solicitud_presupuesto"
  | "consulta_juridica"
  | "rendicion_fondos"
  | "pago_proveedor"
  | "otro";

// ─── Subtítulos Presupuestarios ──────────────────────────────

export type SubtituloPresupuestario =
  | "21" | "22" | "23" | "24" | "25" | "26" | "29" | "31" | "32" | "33" | "34" | "35";

export type FuenteFinanciamiento =
  | "subvencion_regular"
  | "subvencion_preferencial"
  | "pie"
  | "faep"
  | "aportes_municipales"
  | "fondos_propios"
  | "transferencias_ministeriales"
  | "otros";

export type EstadoGasto =
  | "borrador"
  | "pendiente_aprobacion"
  | "aprobado"
  | "rechazado"
  | "observado"
  | "ejecutado"
  | "anulado";

// ─── Interfaces Principales ──────────────────────────────────

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  contrasena: string;
  rol: RolUsuario;
  rbd?: string;
  activo: boolean;
  avatar?: string;
}

export interface Establecimiento {
  id: string;
  nombre: string;
  rbd: string;
  comuna: string;
  tipo: "escuela" | "liceo" | "jardin" | "colegio";
  matricula: number;
  directorId: string;
}

export interface ArchivoAdjunto {
  id: string;
  nombre: string;
  tipo: string;
  tamano: string;
  fechaCarga: string;
  cargadoPor: string;
}

export interface MovimientoFlujo {
  id: string;
  fecha: string;
  seccionOrigen: SeccionFlujo;
  seccionDestino: SeccionFlujo;
  realizadoPor: string;
  accion: "crear" | "derivar" | "rechazar" | "solicitar_info" | "adjuntar" | "finalizar" | "comentar";
  comentario: string;
}

export interface Requerimiento {
  id: string;
  numero: string;
  titulo: string;
  descripcion: string;
  tipo: TipoRequerimiento;
  prioridad: Prioridad;
  estado: EstadoRequerimiento;
  seccionActual: SeccionFlujo;
  establecimientoId: string;
  creadoPor: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  coordinadorAsignado?: string;
  montoEstimado?: number;
  subtitulo?: SubtituloPresupuestario;
  fuenteFinanciamiento?: FuenteFinanciamiento;
  archivos: ArchivoAdjunto[];
  movimientos: MovimientoFlujo[];
  nivelRiesgo?: NivelRiesgo;
}

// ─── Control Presupuestario ──────────────────────────────────

export interface PartidaPresupuestaria {
  id: string;
  anio: number;
  subtitulo: SubtituloPresupuestario;
  item: string;
  descripcion: string;
  montoAprobado: number;
  montoComprometido: number;
  montoDevengado: number;
  montoPagado: number;
  saldoDisponible: number;
  centroCosto: string;
  fuenteFinanciamiento: FuenteFinanciamiento;
}

export interface SolicitudGasto {
  id: string;
  requerimientoId?: string;
  fecha: string;
  descripcion: string;
  monto: number;
  subtitulo: SubtituloPresupuestario;
  centroCosto: string;
  fuenteFinanciamiento: FuenteFinanciamiento;
  estado: EstadoGasto;
  solicitante: string;
  aprobador?: string;
  proveedor?: string;
  checklistCumplimiento: ChecklistItem[];
  observaciones: string[];
  nivelRiesgo: NivelRiesgo;
}

export interface ChecklistItem {
  id: string;
  descripcion: string;
  obligatorio: boolean;
  cumplido: boolean;
  normaReferencia: string;
  fechaVerificacion?: string;
}

// ─── Contratos ───────────────────────────────────────────────

export interface Contrato {
  id: string;
  proveedor: string;
  rutProveedor: string;
  descripcion: string;
  montoTotal: number;
  montoEjecutado: number;
  fechaInicio: string;
  fechaTermino: string;
  estado: "vigente" | "vencido" | "en_renovacion" | "terminado";
  tipoContratacion: "licitacion_publica" | "licitacion_privada" | "trato_directo" | "convenio_marco";
  idMercadoPublico?: string;
}

// ─── Alertas ─────────────────────────────────────────────────

export interface AlertaRiesgo {
  id: string;
  tipo: "presupuestario" | "legal" | "contable" | "contrato" | "proveedor";
  nivelRiesgo: NivelRiesgo;
  titulo: string;
  descripcion: string;
  fecha: string;
  estado: "activa" | "resuelta" | "en_revision";
  accionRecomendada: string;
  normaRelacionada?: string;
}

// ─── Auditoría ───────────────────────────────────────────────

export interface InformeAuditoria {
  id: string;
  periodo: string;
  tipo: "trimestral" | "semestral" | "anual" | "especial";
  titulo: string;
  fecha: string;
  hallazgos: Hallazgo[];
  puntuacionCumplimiento: number;
  estado: "borrador" | "revision" | "aprobado" | "enviado";
}

export interface Hallazgo {
  id: string;
  descripcion: string;
  nivelRiesgo: NivelRiesgo;
  normaIncumplida: string;
  recomendacion: string;
  plazoCorreccion: string;
  estado: "abierto" | "en_correccion" | "cerrado";
}

// ─── Normativa ───────────────────────────────────────────────

export interface NormaLegal {
  id: string;
  nombre: string;
  tipo: "ley" | "decreto" | "resolucion" | "circular" | "dictamen";
  numero: string;
  fechaPublicacion: string;
  resumen: string;
  articulosRelevantes: string[];
  vigente: boolean;
  categoria: "presupuesto" | "compras" | "personal" | "educacion" | "contabilidad" | "general";
}

// ─── Conciliación ────────────────────────────────────────────

export interface Conciliacion {
  id: string;
  periodo: string;
  tipo: "bancaria" | "presupuestaria" | "contable";
  saldoLibro: number;
  saldoReal: number;
  diferencia: number;
  estado: "pendiente" | "conciliada" | "con_diferencias";
}

// ─── Ejecución Mensual ───────────────────────────────────────

export interface EjecucionMensual {
  mes: string;
  presupuestoAprobado: number;
  comprometido: number;
  devengado: number;
  pagado: number;
  porcentajeEjecucion: number;
}

// ─── Log de Auditoría ────────────────────────────────────────

export interface RegistroAuditoria {
  id: string;
  fecha: string;
  usuario: string;
  accion: string;
  modulo: string;
  detalle: string;
}

// ─── Dashboard ───────────────────────────────────────────────

export interface DashboardData {
  presupuestoTotal: number;
  presupuestoEjecutado: number;
  porcentajeEjecucion: number;
  alertasActivas: number;
  cumplimientoLegal: number;
  requerimientosActivos: number;
  requerimientosPendientes: number;
  contratosPorVencer: number;
  ejecucionMensual: EjecucionMensual[];
  distribucionSubtitulos: { subtitulo: string; monto: number; porcentaje: number }[];
  alertasRecientes: AlertaRiesgo[];
}

// ─── Permisos por Rol ────────────────────────────────────────

export interface PermisosRol {
  crearRequerimiento: boolean;
  derivar: boolean;
  rechazar: boolean;
  adjuntarArchivos: boolean;
  finalizar: boolean;
  asignarCoordinador: boolean;
  verTodos: boolean;
  seccionesDerivacion: SeccionFlujo[];
}
