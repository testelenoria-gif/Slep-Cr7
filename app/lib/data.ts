// ============================================================
// SLEP Control Financiero - Sistema de Trazabilidad v3.2.0
// Mock Data Layer
// ============================================================

import type {
  Usuario,
  Establecimiento,
  Requerimiento,
  PartidaPresupuestaria,
  SolicitudGasto,
  Contrato,
  AlertaRiesgo,
  InformeAuditoria,
  NormaLegal,
  Conciliacion,
  EjecucionMensual,
  DashboardData,
  RegistroAuditoria,
  PermisosRol,
  RolUsuario,
} from "./types";

// ─── Usuarios del Sistema (Acceso Abierto - Modo Prueba) ────

export const usuarios: Usuario[] = [
  { id: "usr-admin", nombre: "Administrador TI", email: "admin@sistema.com", contrasena: "admin123", rol: "admin_ti", activo: true },
  { id: "usr-supervisor", nombre: "Supervisor General", email: "supervisor@sistema.com", contrasena: "admin123", rol: "supervisor", activo: true },
  { id: "usr-dir-9386", nombre: "Director (RBD 9386)", email: "director@rbd9386.com", contrasena: "admin123", rol: "director_ee", rbd: "9386", activo: true },
  { id: "usr-dir-9387", nombre: "Director (RBD 9387)", email: "director@rbd9387.com", contrasena: "admin123", rol: "director_ee", rbd: "9387", activo: true },
  { id: "usr-dir-9388", nombre: "Director (RBD 9388)", email: "director@rbd9388.com", contrasena: "admin123", rol: "director_ee", rbd: "9388", activo: true },
  { id: "usr-dir-9389", nombre: "Director (RBD 9389)", email: "director@rbd9389.com", contrasena: "admin123", rol: "director_ee", rbd: "9389", activo: true },
  { id: "usr-dir-9390", nombre: "Director (RBD 9390)", email: "director@rbd9390.com", contrasena: "admin123", rol: "director_ee", rbd: "9390", activo: true },
  { id: "usr-dir-9391", nombre: "Director (RBD 9391)", email: "director@rbd9391.com", contrasena: "admin123", rol: "director_ee", rbd: "9391", activo: true },
  { id: "usr-subdirector", nombre: "Subdirector UATP", email: "subdirector@uatp.com", contrasena: "admin123", rol: "subdirector_uatp", activo: true },
  { id: "usr-coord1", nombre: "Coordinador 1", email: "coord1@uatp.com", contrasena: "admin123", rol: "coordinador", activo: true },
  { id: "usr-coord2", nombre: "Coordinador 2", email: "coord2@uatp.com", contrasena: "admin123", rol: "coordinador", activo: true },
  { id: "usr-presupuesto", nombre: "Presupuesto", email: "presupuesto@sistema.com", contrasena: "admin123", rol: "presupuesto", activo: true },
  { id: "usr-compras", nombre: "Compras", email: "compras@sistema.com", contrasena: "admin123", rol: "compras", activo: true },
  { id: "usr-juridica", nombre: "Jurídica", email: "juridica@sistema.com", contrasena: "admin123", rol: "juridica", activo: true },
  { id: "usr-finanzas", nombre: "Finanzas", email: "finanzas@sistema.com", contrasena: "admin123", rol: "finanzas", activo: true },
];

// ─── Permisos por Rol (Tabla de Permisos del Manual) ─────────

export const permisosPorRol: Record<RolUsuario, PermisosRol> = {
  admin_ti: {
    crearRequerimiento: true,
    derivar: true,
    rechazar: true,
    adjuntarArchivos: true,
    finalizar: true,
    asignarCoordinador: true,
    verTodos: true,
    seccionesDerivacion: ["establecimiento", "subdirector_uatp", "coordinador", "presupuesto", "compras", "juridica", "finanzas"],
  },
  supervisor: {
    crearRequerimiento: false,
    derivar: false,
    rechazar: false,
    adjuntarArchivos: false,
    finalizar: false,
    asignarCoordinador: false,
    verTodos: true,
    seccionesDerivacion: [],
  },
  director_ee: {
    crearRequerimiento: true,
    derivar: true,
    rechazar: false,
    adjuntarArchivos: true,
    finalizar: false,
    asignarCoordinador: false,
    verTodos: false,
    seccionesDerivacion: ["subdirector_uatp", "presupuesto", "compras", "juridica", "finanzas"],
  },
  subdirector_uatp: {
    crearRequerimiento: false,
    derivar: true,
    rechazar: true,
    adjuntarArchivos: true,
    finalizar: false,
    asignarCoordinador: true,
    verTodos: false,
    seccionesDerivacion: ["coordinador", "presupuesto", "compras", "juridica", "finanzas", "establecimiento"],
  },
  coordinador: {
    crearRequerimiento: false,
    derivar: true,
    rechazar: true,
    adjuntarArchivos: true,
    finalizar: false,
    asignarCoordinador: false,
    verTodos: false,
    seccionesDerivacion: ["presupuesto", "compras", "juridica", "finanzas", "establecimiento", "subdirector_uatp"],
  },
  presupuesto: {
    crearRequerimiento: false,
    derivar: true,
    rechazar: true,
    adjuntarArchivos: true,
    finalizar: true,
    asignarCoordinador: false,
    verTodos: false,
    seccionesDerivacion: ["compras", "juridica", "finanzas", "coordinador", "subdirector_uatp", "establecimiento"],
  },
  compras: {
    crearRequerimiento: false,
    derivar: true,
    rechazar: true,
    adjuntarArchivos: true,
    finalizar: true,
    asignarCoordinador: false,
    verTodos: false,
    seccionesDerivacion: ["presupuesto", "juridica", "finanzas", "coordinador", "subdirector_uatp", "establecimiento"],
  },
  juridica: {
    crearRequerimiento: false,
    derivar: true,
    rechazar: true,
    adjuntarArchivos: true,
    finalizar: true,
    asignarCoordinador: false,
    verTodos: false,
    seccionesDerivacion: ["presupuesto", "compras", "finanzas", "coordinador", "subdirector_uatp", "establecimiento"],
  },
  finanzas: {
    crearRequerimiento: false,
    derivar: true,
    rechazar: true,
    adjuntarArchivos: true,
    finalizar: true,
    asignarCoordinador: false,
    verTodos: false,
    seccionesDerivacion: ["presupuesto", "compras", "juridica", "coordinador", "subdirector_uatp", "establecimiento"],
  },
};

// ─── Establecimientos ────────────────────────────────────────

export const establecimientos: Establecimiento[] = [
  { id: "est-9386", nombre: "Escuela Básica Pudahuel Norte", rbd: "9386", comuna: "Pudahuel", tipo: "escuela", matricula: 650, directorId: "usr-dir-9386" },
  { id: "est-9387", nombre: "Liceo Bicentenario Lo Prado", rbd: "9387", comuna: "Lo Prado", tipo: "liceo", matricula: 1200, directorId: "usr-dir-9387" },
  { id: "est-9388", nombre: "Jardín Infantil Cerro Navia", rbd: "9388", comuna: "Cerro Navia", tipo: "jardin", matricula: 120, directorId: "usr-dir-9388" },
  { id: "est-9389", nombre: "Colegio República de Francia", rbd: "9389", comuna: "Pudahuel", tipo: "colegio", matricula: 890, directorId: "usr-dir-9389" },
  { id: "est-9390", nombre: "Escuela Especial Lo Prado", rbd: "9390", comuna: "Lo Prado", tipo: "escuela", matricula: 180, directorId: "usr-dir-9390" },
  { id: "est-9391", nombre: "Liceo Técnico Profesional Cerro Navia", rbd: "9391", comuna: "Cerro Navia", tipo: "liceo", matricula: 950, directorId: "usr-dir-9391" },
];

// ─── Requerimientos (Flujo Completo) ─────────────────────────

export const requerimientos: Requerimiento[] = [
  {
    id: "req-001", numero: "REQ-2026-0001", titulo: "Adquisición de notebooks para laboratorio", descripcion: "Se requiere la compra de 50 notebooks para habilitar el laboratorio de computación. Los equipos actuales tienen más de 8 años y no soportan el software educativo vigente.", tipo: "compra_bienes", prioridad: "alta", estado: "en_gestion", seccionActual: "coordinador", establecimientoId: "est-9386", creadoPor: "usr-dir-9386", fechaCreacion: "2026-02-15T09:00:00", fechaActualizacion: "2026-02-20T14:30:00", coordinadorAsignado: "usr-coord1", montoEstimado: 45_000_000, subtitulo: "29", fuenteFinanciamiento: "faep",
    archivos: [
      { id: "arch-001", nombre: "cotizacion_teched.pdf", tipo: "application/pdf", tamano: "1.2 MB", fechaCarga: "2026-02-15T09:10:00", cargadoPor: "usr-dir-9386" },
      { id: "arch-002", nombre: "informe_tecnico.pdf", tipo: "application/pdf", tamano: "850 KB", fechaCarga: "2026-02-16T11:00:00", cargadoPor: "usr-dir-9386" },
    ],
    movimientos: [
      { id: "mov-001", fecha: "2026-02-15T09:00:00", seccionOrigen: "establecimiento", seccionDestino: "establecimiento", realizadoPor: "usr-dir-9386", accion: "crear", comentario: "Requerimiento creado" },
      { id: "mov-002", fecha: "2026-02-15T09:05:00", seccionOrigen: "establecimiento", seccionDestino: "subdirector_uatp", realizadoPor: "usr-dir-9386", accion: "derivar", comentario: "Enviado a Subdirector UATP para revisión" },
      { id: "mov-003", fecha: "2026-02-17T10:00:00", seccionOrigen: "subdirector_uatp", seccionDestino: "coordinador", realizadoPor: "usr-subdirector", accion: "derivar", comentario: "Asignado a Coordinador 1" },
    ],
    nivelRiesgo: "medio",
  },
  {
    id: "req-002", numero: "REQ-2026-0002", titulo: "Reparación techumbre gimnasio", descripcion: "La techumbre del gimnasio presenta filtraciones severas que afectan las actividades deportivas y ponen en riesgo la seguridad de los estudiantes. Requiere intervención urgente.", tipo: "reparacion_infraestructura", prioridad: "urgente", estado: "derivado", seccionActual: "presupuesto", establecimientoId: "est-9387", creadoPor: "usr-dir-9387", fechaCreacion: "2026-02-10T08:30:00", fechaActualizacion: "2026-02-22T16:00:00", coordinadorAsignado: "usr-coord1", montoEstimado: 85_000_000, subtitulo: "31", fuenteFinanciamiento: "transferencias_ministeriales",
    archivos: [
      { id: "arch-003", nombre: "fotos_dano.zip", tipo: "application/zip", tamano: "15 MB", fechaCarga: "2026-02-10T08:35:00", cargadoPor: "usr-dir-9387" },
      { id: "arch-004", nombre: "presupuesto_reparacion.pdf", tipo: "application/pdf", tamano: "2.1 MB", fechaCarga: "2026-02-12T14:00:00", cargadoPor: "usr-coord1" },
    ],
    movimientos: [
      { id: "mov-004", fecha: "2026-02-10T08:30:00", seccionOrigen: "establecimiento", seccionDestino: "establecimiento", realizadoPor: "usr-dir-9387", accion: "crear", comentario: "Requerimiento urgente - Filtraciones gimnasio" },
      { id: "mov-005", fecha: "2026-02-10T08:32:00", seccionOrigen: "establecimiento", seccionDestino: "subdirector_uatp", realizadoPor: "usr-dir-9387", accion: "derivar", comentario: "Urgente: seguridad de estudiantes" },
      { id: "mov-006", fecha: "2026-02-11T09:00:00", seccionOrigen: "subdirector_uatp", seccionDestino: "coordinador", realizadoPor: "usr-subdirector", accion: "derivar", comentario: "Prioridad alta. Asignado Coord 1." },
      { id: "mov-007", fecha: "2026-02-18T10:00:00", seccionOrigen: "coordinador", seccionDestino: "presupuesto", realizadoPor: "usr-coord1", accion: "derivar", comentario: "Derivado a Presupuesto para verificar disponibilidad Sub 31" },
    ],
    nivelRiesgo: "alto",
  },
  {
    id: "req-003", numero: "REQ-2026-0003", titulo: "Contratación servicio alimentación complementaria", descripcion: "Se necesita contratar servicio de alimentación complementaria para jornada extendida en el segundo semestre 2026.", tipo: "contratacion_servicio", prioridad: "media", estado: "en_revision_subdirector", seccionActual: "subdirector_uatp", establecimientoId: "est-9389", creadoPor: "usr-dir-9389", fechaCreacion: "2026-02-24T11:00:00", fechaActualizacion: "2026-02-24T11:00:00", montoEstimado: 120_000_000, subtitulo: "22", fuenteFinanciamiento: "subvencion_preferencial",
    archivos: [
      { id: "arch-006", nombre: "propuesta_alimentacion.docx", tipo: "application/docx", tamano: "780 KB", fechaCarga: "2026-02-24T11:05:00", cargadoPor: "usr-dir-9389" },
    ],
    movimientos: [
      { id: "mov-008", fecha: "2026-02-24T11:00:00", seccionOrigen: "establecimiento", seccionDestino: "establecimiento", realizadoPor: "usr-dir-9389", accion: "crear", comentario: "Solicitud contratación alimentación" },
      { id: "mov-009", fecha: "2026-02-24T11:02:00", seccionOrigen: "establecimiento", seccionDestino: "subdirector_uatp", realizadoPor: "usr-dir-9389", accion: "derivar", comentario: "Enviado para evaluación" },
    ],
    nivelRiesgo: "bajo",
  },
  {
    id: "req-004", numero: "REQ-2026-0004", titulo: "Consulta legalidad trato directo", descripcion: "Consulta jurídica sobre la procedencia de un trato directo para asesoría legal externa por $28.000.000. Se requiere dictamen antes de proceder.", tipo: "consulta_juridica", prioridad: "alta", estado: "derivado", seccionActual: "juridica", establecimientoId: "est-9386", creadoPor: "usr-dir-9386", fechaCreacion: "2026-02-12T14:00:00", fechaActualizacion: "2026-02-25T11:00:00", coordinadorAsignado: "usr-coord2", montoEstimado: 28_000_000,
    archivos: [
      { id: "arch-007", nombre: "antecedentes_trato_directo.pdf", tipo: "application/pdf", tamano: "1.5 MB", fechaCarga: "2026-02-12T14:05:00", cargadoPor: "usr-dir-9386" },
    ],
    movimientos: [
      { id: "mov-010", fecha: "2026-02-12T14:00:00", seccionOrigen: "establecimiento", seccionDestino: "establecimiento", realizadoPor: "usr-dir-9386", accion: "crear", comentario: "Consulta jurídica trato directo" },
      { id: "mov-011", fecha: "2026-02-12T14:05:00", seccionOrigen: "establecimiento", seccionDestino: "subdirector_uatp", realizadoPor: "usr-dir-9386", accion: "derivar", comentario: "Requiere evaluación jurídica" },
      { id: "mov-012", fecha: "2026-02-13T09:00:00", seccionOrigen: "subdirector_uatp", seccionDestino: "coordinador", realizadoPor: "usr-subdirector", accion: "derivar", comentario: "Asignado a Coordinador 2" },
      { id: "mov-013", fecha: "2026-02-14T15:00:00", seccionOrigen: "coordinador", seccionDestino: "juridica", realizadoPor: "usr-coord2", accion: "derivar", comentario: "Derivado a Jurídica para dictamen" },
    ],
    nivelRiesgo: "critico",
  },
  {
    id: "req-005", numero: "REQ-2026-0005", titulo: "Compra material didáctico parvularia", descripcion: "Adquisición de material didáctico especializado para nivel de transición.", tipo: "compra_bienes", prioridad: "media", estado: "finalizado", seccionActual: "finalizado", establecimientoId: "est-9388", creadoPor: "usr-dir-9388", fechaCreacion: "2026-01-20T10:00:00", fechaActualizacion: "2026-02-15T16:00:00", coordinadorAsignado: "usr-coord1", montoEstimado: 3_200_000, subtitulo: "22", fuenteFinanciamiento: "subvencion_preferencial",
    archivos: [
      { id: "arch-008", nombre: "listado_materiales.xlsx", tipo: "application/xlsx", tamano: "340 KB", fechaCarga: "2026-01-20T10:05:00", cargadoPor: "usr-dir-9388" },
      { id: "arch-009", nombre: "orden_compra_OC2026.pdf", tipo: "application/pdf", tamano: "200 KB", fechaCarga: "2026-02-10T11:00:00", cargadoPor: "usr-compras" },
      { id: "arch-010", nombre: "factura_edumat.pdf", tipo: "application/pdf", tamano: "150 KB", fechaCarga: "2026-02-15T16:00:00", cargadoPor: "usr-finanzas" },
    ],
    movimientos: [
      { id: "mov-014", fecha: "2026-01-20T10:00:00", seccionOrigen: "establecimiento", seccionDestino: "establecimiento", realizadoPor: "usr-dir-9388", accion: "crear", comentario: "Solicitud material didáctico" },
      { id: "mov-015", fecha: "2026-01-20T10:05:00", seccionOrigen: "establecimiento", seccionDestino: "subdirector_uatp", realizadoPor: "usr-dir-9388", accion: "derivar", comentario: "Enviado al Subdirector" },
      { id: "mov-016", fecha: "2026-01-21T09:00:00", seccionOrigen: "subdirector_uatp", seccionDestino: "coordinador", realizadoPor: "usr-subdirector", accion: "derivar", comentario: "Asignado Coordinador 1" },
      { id: "mov-017", fecha: "2026-01-22T14:00:00", seccionOrigen: "coordinador", seccionDestino: "compras", realizadoPor: "usr-coord1", accion: "derivar", comentario: "Derivado a Compras" },
      { id: "mov-018", fecha: "2026-02-10T11:00:00", seccionOrigen: "compras", seccionDestino: "finanzas", realizadoPor: "usr-compras", accion: "derivar", comentario: "OC emitida. A Finanzas para pago" },
      { id: "mov-019", fecha: "2026-02-15T16:00:00", seccionOrigen: "finanzas", seccionDestino: "finalizado", realizadoPor: "usr-finanzas", accion: "finalizar", comentario: "Pago realizado. Finalizado." },
    ],
    nivelRiesgo: "bajo",
  },
  {
    id: "req-006", numero: "REQ-2026-0006", titulo: "Fondos actividades extraescolares", descripcion: "Solicitud de presupuesto para actividades extraescolares del segundo semestre.", tipo: "solicitud_presupuesto", prioridad: "baja", estado: "rechazado", seccionActual: "rechazados", establecimientoId: "est-9390", creadoPor: "usr-dir-9390", fechaCreacion: "2026-02-05T15:00:00", fechaActualizacion: "2026-02-08T10:00:00", montoEstimado: 15_000_000,
    archivos: [],
    movimientos: [
      { id: "mov-020", fecha: "2026-02-05T15:00:00", seccionOrigen: "establecimiento", seccionDestino: "establecimiento", realizadoPor: "usr-dir-9390", accion: "crear", comentario: "Solicitud fondos extraescolares" },
      { id: "mov-021", fecha: "2026-02-05T15:05:00", seccionOrigen: "establecimiento", seccionDestino: "subdirector_uatp", realizadoPor: "usr-dir-9390", accion: "derivar", comentario: "Enviado al Subdirector" },
      { id: "mov-022", fecha: "2026-02-08T10:00:00", seccionOrigen: "subdirector_uatp", seccionDestino: "rechazados", realizadoPor: "usr-subdirector", accion: "rechazar", comentario: "Rechazado: fuera de período. Ingresar en planificación anual (marzo)." },
    ],
    nivelRiesgo: "bajo",
  },
  {
    id: "req-007", numero: "REQ-2026-0007", titulo: "Rendición fondos PIE Q4 2025", descripcion: "Rendición de cuenta de fondos transferidos durante el Q4 2025 para programa PIE.", tipo: "rendicion_fondos", prioridad: "alta", estado: "derivado", seccionActual: "finanzas", establecimientoId: "est-9391", creadoPor: "usr-dir-9391", fechaCreacion: "2026-02-18T09:00:00", fechaActualizacion: "2026-02-26T11:00:00", coordinadorAsignado: "usr-coord2", montoEstimado: 42_000_000, subtitulo: "24", fuenteFinanciamiento: "pie",
    archivos: [
      { id: "arch-011", nombre: "rendicion_q4_2025.xlsx", tipo: "application/xlsx", tamano: "2.3 MB", fechaCarga: "2026-02-18T09:05:00", cargadoPor: "usr-dir-9391" },
      { id: "arch-012", nombre: "comprobantes_gastos.zip", tipo: "application/zip", tamano: "25 MB", fechaCarga: "2026-02-18T09:10:00", cargadoPor: "usr-dir-9391" },
    ],
    movimientos: [
      { id: "mov-023", fecha: "2026-02-18T09:00:00", seccionOrigen: "establecimiento", seccionDestino: "establecimiento", realizadoPor: "usr-dir-9391", accion: "crear", comentario: "Rendición fondos PIE Q4 2025" },
      { id: "mov-024", fecha: "2026-02-18T09:05:00", seccionOrigen: "establecimiento", seccionDestino: "subdirector_uatp", realizadoPor: "usr-dir-9391", accion: "derivar", comentario: "Enviado para revisión" },
      { id: "mov-025", fecha: "2026-02-19T10:00:00", seccionOrigen: "subdirector_uatp", seccionDestino: "coordinador", realizadoPor: "usr-subdirector", accion: "derivar", comentario: "Asignado Coordinador 2" },
      { id: "mov-026", fecha: "2026-02-20T14:00:00", seccionOrigen: "coordinador", seccionDestino: "finanzas", realizadoPor: "usr-coord2", accion: "derivar", comentario: "Derivado a Finanzas para revisión" },
    ],
    nivelRiesgo: "medio",
  },
  {
    id: "req-008", numero: "REQ-2026-0008", titulo: "Pago factura mantención calefacción", descripcion: "Solicitud de pago factura N°4521 por mantención preventiva del sistema de calefacción central.", tipo: "pago_proveedor", prioridad: "media", estado: "derivado", seccionActual: "compras", establecimientoId: "est-9387", creadoPor: "usr-dir-9387", fechaCreacion: "2026-02-22T10:00:00", fechaActualizacion: "2026-02-26T15:00:00", coordinadorAsignado: "usr-coord1", montoEstimado: 12_500_000, subtitulo: "22", fuenteFinanciamiento: "subvencion_regular",
    archivos: [
      { id: "arch-013", nombre: "factura_4521.pdf", tipo: "application/pdf", tamano: "320 KB", fechaCarga: "2026-02-22T10:05:00", cargadoPor: "usr-dir-9387" },
      { id: "arch-014", nombre: "recepcion_conforme.pdf", tipo: "application/pdf", tamano: "180 KB", fechaCarga: "2026-02-23T09:00:00", cargadoPor: "usr-coord1" },
    ],
    movimientos: [
      { id: "mov-027", fecha: "2026-02-22T10:00:00", seccionOrigen: "establecimiento", seccionDestino: "establecimiento", realizadoPor: "usr-dir-9387", accion: "crear", comentario: "Solicitud pago factura mantención" },
      { id: "mov-028", fecha: "2026-02-22T10:05:00", seccionOrigen: "establecimiento", seccionDestino: "subdirector_uatp", realizadoPor: "usr-dir-9387", accion: "derivar", comentario: "Enviado al Subdirector" },
      { id: "mov-029", fecha: "2026-02-23T09:00:00", seccionOrigen: "subdirector_uatp", seccionDestino: "coordinador", realizadoPor: "usr-subdirector", accion: "derivar", comentario: "Asignado Coordinador 1" },
      { id: "mov-030", fecha: "2026-02-24T11:00:00", seccionOrigen: "coordinador", seccionDestino: "compras", realizadoPor: "usr-coord1", accion: "derivar", comentario: "Derivado a Compras para verificar contrato" },
    ],
    nivelRiesgo: "bajo",
  },
];

// ─── Partidas Presupuestarias ────────────────────────────────

export const partidasPresupuestarias: PartidaPresupuestaria[] = [
  { id: "pp-001", anio: 2026, subtitulo: "21", item: "01", descripcion: "Gastos en Personal - Planta", montoAprobado: 18_500_000_000, montoComprometido: 16_200_000_000, montoDevengado: 14_800_000_000, montoPagado: 14_200_000_000, saldoDisponible: 2_300_000_000, centroCosto: "CC-001", fuenteFinanciamiento: "subvencion_regular" },
  { id: "pp-002", anio: 2026, subtitulo: "21", item: "02", descripcion: "Gastos en Personal - Contrata", montoAprobado: 8_200_000_000, montoComprometido: 7_500_000_000, montoDevengado: 6_900_000_000, montoPagado: 6_600_000_000, saldoDisponible: 700_000_000, centroCosto: "CC-001", fuenteFinanciamiento: "subvencion_regular" },
  { id: "pp-003", anio: 2026, subtitulo: "22", item: "01", descripcion: "Bienes y Servicios - Alimentos", montoAprobado: 3_800_000_000, montoComprometido: 2_900_000_000, montoDevengado: 2_400_000_000, montoPagado: 2_100_000_000, saldoDisponible: 900_000_000, centroCosto: "CC-002", fuenteFinanciamiento: "subvencion_preferencial" },
  { id: "pp-004", anio: 2026, subtitulo: "22", item: "04", descripcion: "Bienes y Servicios - Materiales", montoAprobado: 2_100_000_000, montoComprometido: 1_650_000_000, montoDevengado: 1_300_000_000, montoPagado: 1_150_000_000, saldoDisponible: 450_000_000, centroCosto: "CC-002", fuenteFinanciamiento: "subvencion_preferencial" },
  { id: "pp-005", anio: 2026, subtitulo: "22", item: "07", descripcion: "Bienes y Servicios - Servicios", montoAprobado: 4_500_000_000, montoComprometido: 3_200_000_000, montoDevengado: 2_800_000_000, montoPagado: 2_500_000_000, saldoDisponible: 1_300_000_000, centroCosto: "CC-003", fuenteFinanciamiento: "fondos_propios" },
  { id: "pp-006", anio: 2026, subtitulo: "29", item: "01", descripcion: "Activos - Mobiliario", montoAprobado: 1_800_000_000, montoComprometido: 1_200_000_000, montoDevengado: 950_000_000, montoPagado: 800_000_000, saldoDisponible: 600_000_000, centroCosto: "CC-004", fuenteFinanciamiento: "faep" },
  { id: "pp-007", anio: 2026, subtitulo: "29", item: "05", descripcion: "Activos - Equipamiento TI", montoAprobado: 2_200_000_000, montoComprometido: 1_800_000_000, montoDevengado: 1_500_000_000, montoPagado: 1_300_000_000, saldoDisponible: 400_000_000, centroCosto: "CC-004", fuenteFinanciamiento: "transferencias_ministeriales" },
  { id: "pp-008", anio: 2026, subtitulo: "24", item: "01", descripcion: "Transferencias Corrientes", montoAprobado: 2_500_000_000, montoComprometido: 1_900_000_000, montoDevengado: 1_600_000_000, montoPagado: 1_400_000_000, saldoDisponible: 600_000_000, centroCosto: "CC-005", fuenteFinanciamiento: "subvencion_regular" },
  { id: "pp-009", anio: 2026, subtitulo: "31", item: "01", descripcion: "Inversión - Infraestructura", montoAprobado: 1_600_000_000, montoComprometido: 800_000_000, montoDevengado: 500_000_000, montoPagado: 350_000_000, saldoDisponible: 800_000_000, centroCosto: "CC-006", fuenteFinanciamiento: "transferencias_ministeriales" },
];

// ─── Solicitudes de Gasto ────────────────────────────────────

export const solicitudesGasto: SolicitudGasto[] = [
  {
    id: "sg-001", requerimientoId: "req-001", fecha: "2026-02-25", descripcion: "Notebooks para laboratorio", monto: 45_000_000, subtitulo: "29", centroCosto: "CC-004", fuenteFinanciamiento: "faep", estado: "pendiente_aprobacion", solicitante: "Director (RBD 9386)", proveedor: "TechEd Chile SpA",
    checklistCumplimiento: [
      { id: "cl-001", descripcion: "Disponibilidad presupuestaria verificada", obligatorio: true, cumplido: true, normaReferencia: "DL 1263 Art. 25" },
      { id: "cl-002", descripcion: "Proceso conforme a Ley 19.886", obligatorio: true, cumplido: true, normaReferencia: "Ley 19.886 Art. 5" },
      { id: "cl-003", descripcion: "Proveedor sin inhabilidades", obligatorio: true, cumplido: true, normaReferencia: "Ley 19.886 Art. 4" },
      { id: "cl-004", descripcion: "Tres cotizaciones obtenidas", obligatorio: true, cumplido: false, normaReferencia: "Regl. Ley 19.886 Art. 10" },
    ],
    observaciones: ["Falta tercera cotización"], nivelRiesgo: "medio",
  },
  {
    id: "sg-002", requerimientoId: "req-002", fecha: "2026-02-22", descripcion: "Reparación techumbre gimnasio", monto: 85_000_000, subtitulo: "31", centroCosto: "CC-006", fuenteFinanciamiento: "transferencias_ministeriales", estado: "pendiente_aprobacion", solicitante: "Director (RBD 9387)",
    checklistCumplimiento: [
      { id: "cl-005", descripcion: "Disponibilidad presupuestaria verificada", obligatorio: true, cumplido: true, normaReferencia: "DL 1263 Art. 25" },
      { id: "cl-006", descripcion: "Licitación pública realizada", obligatorio: true, cumplido: true, normaReferencia: "Ley 19.886 Art. 5" },
      { id: "cl-007", descripcion: "Autorización DIPRES", obligatorio: true, cumplido: false, normaReferencia: "DL 1263" },
    ],
    observaciones: ["Pendiente autorización DIPRES >50MM"], nivelRiesgo: "alto",
  },
];

// ─── Contratos ───────────────────────────────────────────────

export const contratos: Contrato[] = [
  { id: "ctr-001", proveedor: "TechEd Chile SpA", rutProveedor: "76.543.210-K", descripcion: "Suministro equipamiento tecnológico", montoTotal: 320_000_000, montoEjecutado: 185_000_000, fechaInicio: "2025-06-01", fechaTermino: "2026-05-31", estado: "vigente", tipoContratacion: "licitacion_publica", idMercadoPublico: "LP-2025-1234" },
  { id: "ctr-002", proveedor: "Sodexo Chile", rutProveedor: "96.556.780-5", descripcion: "Alimentación escolar PAE", montoTotal: 1_200_000_000, montoEjecutado: 800_000_000, fechaInicio: "2026-01-01", fechaTermino: "2026-12-31", estado: "vigente", tipoContratacion: "licitacion_publica", idMercadoPublico: "LP-2025-5678" },
  { id: "ctr-003", proveedor: "Climatech Ltda.", rutProveedor: "77.123.456-7", descripcion: "Mantención calefacción", montoTotal: 85_000_000, montoEjecutado: 52_000_000, fechaInicio: "2025-04-01", fechaTermino: "2026-03-31", estado: "vigente", tipoContratacion: "licitacion_privada" },
  { id: "ctr-004", proveedor: "Constructora Sur SpA", rutProveedor: "76.987.654-3", descripcion: "Reparaciones infraestructura", montoTotal: 450_000_000, montoEjecutado: 120_000_000, fechaInicio: "2025-08-01", fechaTermino: "2026-07-31", estado: "vigente", tipoContratacion: "licitacion_publica", idMercadoPublico: "LP-2025-9012" },
  { id: "ctr-005", proveedor: "Limpieza Total SA", rutProveedor: "96.111.222-3", descripcion: "Aseo establecimientos", montoTotal: 180_000_000, montoEjecutado: 165_000_000, fechaInicio: "2025-03-01", fechaTermino: "2026-02-28", estado: "vigente", tipoContratacion: "convenio_marco", idMercadoPublico: "CM-2025-3456" },
];

// ─── Alertas ─────────────────────────────────────────────────

export const alertasRiesgo: AlertaRiesgo[] = [
  { id: "alt-001", tipo: "presupuestario", nivelRiesgo: "alto", titulo: "Sobre-ejecución Subtítulo 21", descripcion: "Ejecución Sub 21 al 87.5% con 10 meses restantes.", fecha: "2026-02-25", estado: "activa", accionRecomendada: "Solicitar reasignación a DIPRES.", normaRelacionada: "DL 1263 Art. 25-26" },
  { id: "alt-002", tipo: "legal", nivelRiesgo: "critico", titulo: "Trato directo sin justificación", descripcion: "REQ-0004: $28M excede umbral de trato directo.", fecha: "2026-02-18", estado: "activa", accionRecomendada: "Rechazar. Exigir licitación.", normaRelacionada: "Ley 19.886 Art. 8" },
  { id: "alt-003", tipo: "contrato", nivelRiesgo: "alto", titulo: "Contrato por vencer sin renovación", descripcion: "CTR-005 vence 28/02/2026 sin proceso iniciado.", fecha: "2026-02-15", estado: "activa", accionRecomendada: "Licitación urgente.", normaRelacionada: "Ley 19.886 Art. 12" },
  { id: "alt-004", tipo: "contable", nivelRiesgo: "medio", titulo: "Diferencias conciliación bancaria", descripcion: "Diferencias $2.340.000 en conciliación enero.", fecha: "2026-02-10", estado: "en_revision", accionRecomendada: "Analizar partidas pendientes.", normaRelacionada: "CGR Normas Contables" },
  { id: "alt-005", tipo: "proveedor", nivelRiesgo: "medio", titulo: "Incumplimiento Sodexo - PAE", descripcion: "Recepción no conforme en 3 establecimientos.", fecha: "2026-02-28", estado: "activa", accionRecomendada: "Aplicar multas contractuales.", normaRelacionada: "Bases LP-2025-5678" },
];

// ─── Informes de Auditoría ───────────────────────────────────

export const informesAuditoria: InformeAuditoria[] = [
  {
    id: "inf-001", periodo: "Q4 2025", tipo: "trimestral", titulo: "Auditoría Interna Q4 2025", fecha: "2026-01-15", puntuacionCumplimiento: 78, estado: "aprobado",
    hallazgos: [
      { id: "hal-001", descripcion: "Contratos sin actualización de garantías", nivelRiesgo: "alto", normaIncumplida: "Regl. Ley 19.886 Art. 68", recomendacion: "Alerta vencimiento de garantías", plazoCorreccion: "2026-03-31", estado: "en_correccion" },
      { id: "hal-002", descripcion: "Recepciones conformes sin verificación presencial", nivelRiesgo: "medio", normaIncumplida: "Ley 19.886 Art. 3", recomendacion: "Protocolo verificación in situ", plazoCorreccion: "2026-02-28", estado: "cerrado" },
      { id: "hal-003", descripcion: "Demora en rendición de fondos", nivelRiesgo: "medio", normaIncumplida: "CGR Res. 30/2015", recomendacion: "Plazo máximo 30 días", plazoCorreccion: "2026-03-15", estado: "abierto" },
    ],
  },
  {
    id: "inf-002", periodo: "Q1 2026", tipo: "trimestral", titulo: "Auditoría Interna Q1 2026", fecha: "2026-02-27", puntuacionCumplimiento: 82, estado: "borrador",
    hallazgos: [
      { id: "hal-004", descripcion: "Trato directo sin resolución fundada", nivelRiesgo: "critico", normaIncumplida: "Ley 19.886 Art. 8", recomendacion: "Anular y exigir licitación", plazoCorreccion: "2026-03-15", estado: "abierto" },
      { id: "hal-005", descripcion: "Diferencias no conciliadas", nivelRiesgo: "medio", normaIncumplida: "CGR Normas Contables", recomendacion: "Conciliación exhaustiva", plazoCorreccion: "2026-03-31", estado: "abierto" },
    ],
  },
];

// ─── Normas Legales ──────────────────────────────────────────

export const normasLegales: NormaLegal[] = [
  { id: "nl-001", nombre: "Ley Nueva Educación Pública", tipo: "ley", numero: "21.040", fechaPublicacion: "2017-11-24", resumen: "Crea el Sistema de Educación Pública y los SLEP.", articulosRelevantes: ["Art. 12 - Funciones SLEP", "Art. 18 - Director Ejecutivo", "Art. 42 - Patrimonio", "Art. 44 - Presupuesto"], vigente: true, categoria: "educacion" },
  { id: "nl-002", nombre: "Ley de Compras Públicas", tipo: "ley", numero: "19.886", fechaPublicacion: "2003-07-30", resumen: "Bases contratos administrativos de suministro y servicios.", articulosRelevantes: ["Art. 3 - Principios", "Art. 4 - Inhabilidades", "Art. 5 - Licitación pública", "Art. 8 - Trato directo"], vigente: true, categoria: "compras" },
  { id: "nl-003", nombre: "DL Administración Financiera", tipo: "decreto", numero: "DL 1.263", fechaPublicacion: "1975-11-28", resumen: "Sistema presupuestario del Estado.", articulosRelevantes: ["Art. 19 - Presupuesto", "Art. 25 - Ejecución", "Art. 26 - Modificaciones"], vigente: true, categoria: "presupuesto" },
  { id: "nl-004", nombre: "Ley Orgánica Contraloría", tipo: "ley", numero: "10.336", fechaPublicacion: "1952-05-29", resumen: "Organización y atribuciones de la CGR.", articulosRelevantes: ["Art. 1 - Fiscalización", "Art. 95 - Examen de cuentas"], vigente: true, categoria: "general" },
  { id: "nl-005", nombre: "Res. Contabilidad Gubernamental", tipo: "resolucion", numero: "CGR 30/2015", fechaPublicacion: "2015-12-01", resumen: "Procedimientos contabilidad gubernamental.", articulosRelevantes: ["Sección 3 - Registros", "Sección 5 - Conciliaciones", "Sección 8 - Rendición"], vigente: true, categoria: "contabilidad" },
  { id: "nl-006", nombre: "Reglamento Ley de Compras", tipo: "decreto", numero: "DS 250/2004", fechaPublicacion: "2004-09-24", resumen: "Reglamento de la Ley 19.886.", articulosRelevantes: ["Art. 10 - Procedimientos", "Art. 68 - Garantías", "Art. 79 - Recepción conforme"], vigente: true, categoria: "compras" },
];

// ─── Conciliaciones ──────────────────────────────────────────

export const conciliaciones: Conciliacion[] = [
  { id: "conc-001", periodo: "Enero 2026", tipo: "bancaria", saldoLibro: 1_245_000_000, saldoReal: 1_247_340_000, diferencia: 2_340_000, estado: "con_diferencias" },
  { id: "conc-002", periodo: "Enero 2026", tipo: "presupuestaria", saldoLibro: 36_150_000_000, saldoReal: 36_150_000_000, diferencia: 0, estado: "conciliada" },
  { id: "conc-003", periodo: "Diciembre 2025", tipo: "bancaria", saldoLibro: 980_000_000, saldoReal: 980_000_000, diferencia: 0, estado: "conciliada" },
];

// ─── Ejecución Mensual ───────────────────────────────────────

export const ejecucionMensual: EjecucionMensual[] = [
  { mes: "Ene", presupuestoAprobado: 3_767_000_000, comprometido: 3_500_000_000, devengado: 3_200_000_000, pagado: 2_900_000_000, porcentajeEjecucion: 85 },
  { mes: "Feb", presupuestoAprobado: 3_767_000_000, comprometido: 3_400_000_000, devengado: 3_000_000_000, pagado: 2_750_000_000, porcentajeEjecucion: 80 },
  { mes: "Mar", presupuestoAprobado: 3_767_000_000, comprometido: 3_600_000_000, devengado: 3_300_000_000, pagado: 3_100_000_000, porcentajeEjecucion: 88 },
  { mes: "Abr", presupuestoAprobado: 3_767_000_000, comprometido: 3_550_000_000, devengado: 3_100_000_000, pagado: 2_800_000_000, porcentajeEjecucion: 82 },
  { mes: "May", presupuestoAprobado: 3_767_000_000, comprometido: 3_700_000_000, devengado: 3_400_000_000, pagado: 3_200_000_000, porcentajeEjecucion: 90 },
  { mes: "Jun", presupuestoAprobado: 3_767_000_000, comprometido: 3_650_000_000, devengado: 3_350_000_000, pagado: 3_100_000_000, porcentajeEjecucion: 89 },
  { mes: "Jul", presupuestoAprobado: 3_767_000_000, comprometido: 3_500_000_000, devengado: 3_100_000_000, pagado: 2_900_000_000, porcentajeEjecucion: 82 },
  { mes: "Ago", presupuestoAprobado: 3_767_000_000, comprometido: 3_450_000_000, devengado: 3_050_000_000, pagado: 2_850_000_000, porcentajeEjecucion: 81 },
  { mes: "Sep", presupuestoAprobado: 3_767_000_000, comprometido: 3_600_000_000, devengado: 3_200_000_000, pagado: 3_000_000_000, porcentajeEjecucion: 85 },
  { mes: "Oct", presupuestoAprobado: 3_767_000_000, comprometido: 3_700_000_000, devengado: 3_500_000_000, pagado: 3_300_000_000, porcentajeEjecucion: 93 },
  { mes: "Nov", presupuestoAprobado: 3_767_000_000, comprometido: 3_800_000_000, devengado: 3_600_000_000, pagado: 3_400_000_000, porcentajeEjecucion: 95 },
  { mes: "Dic", presupuestoAprobado: 3_767_000_000, comprometido: 3_850_000_000, devengado: 3_700_000_000, pagado: 3_500_000_000, porcentajeEjecucion: 98 },
];

// ─── Registros Auditoría ─────────────────────────────────────

export const registrosAuditoria: RegistroAuditoria[] = [
  { id: "log-001", fecha: "2026-02-27T10:30:00", usuario: "Finanzas", accion: "Aprobación gasto", modulo: "Presupuesto", detalle: "Aprobó SG-002 por $12.500.000" },
  { id: "log-002", fecha: "2026-02-27T09:15:00", usuario: "Coordinador 1", accion: "Derivación", modulo: "Requerimientos", detalle: "Derivó REQ-0001 a Compras" },
  { id: "log-003", fecha: "2026-02-26T16:45:00", usuario: "Presupuesto", accion: "Alerta generada", modulo: "Auditoría", detalle: "ALT-002: Trato directo sin justificación" },
  { id: "log-004", fecha: "2026-02-26T14:20:00", usuario: "Jurídica", accion: "Revisión legal", modulo: "Jurídica", detalle: "Bloqueó SG-003 por incumplimiento" },
  { id: "log-005", fecha: "2026-02-25T11:00:00", usuario: "Finanzas", accion: "Conciliación", modulo: "Contabilidad", detalle: "Conciliación bancaria enero - diferencias" },
];

// ─── Dashboard Data ──────────────────────────────────────────

export const dashboardData: DashboardData = {
  presupuestoTotal: 45_200_000_000,
  presupuestoEjecutado: 32_750_000_000,
  porcentajeEjecucion: 72.5,
  alertasActivas: 5,
  cumplimientoLegal: 82,
  requerimientosActivos: 5,
  requerimientosPendientes: 2,
  contratosPorVencer: 2,
  ejecucionMensual,
  distribucionSubtitulos: [
    { subtitulo: "Sub 21 - Personal", monto: 26_700_000_000, porcentaje: 59.1 },
    { subtitulo: "Sub 22 - Bienes y Servicios", monto: 10_400_000_000, porcentaje: 23.0 },
    { subtitulo: "Sub 24 - Transferencias", monto: 2_500_000_000, porcentaje: 5.5 },
    { subtitulo: "Sub 29 - Activos", monto: 4_000_000_000, porcentaje: 8.9 },
    { subtitulo: "Sub 31 - Inversiones", monto: 1_600_000_000, porcentaje: 3.5 },
  ],
  alertasRecientes: alertasRiesgo.slice(0, 4),
};
