"use client";

import { useNav } from "../lib/nav-context";
import DashboardContent from "./DashboardContent";
import RequerimientosPage from "./pages/RequerimientosPage";
import RequerimientoDetalle from "./pages/RequerimientoDetalle";
import NuevoRequerimiento from "./pages/NuevoRequerimiento";
import PresupuestoPage from "./pages/PresupuestoPage";
import AuditoriaPage from "./pages/AuditoriaPage";
import LegalPage from "./pages/LegalPage";
import ContabilidadPage from "./pages/ContabilidadPage";
import AlertasPage from "./pages/AlertasPage";
import ConfiguracionPage from "./pages/ConfiguracionPage";

export default function MainContent() {
  const { currentPage } = useNav();

  switch (currentPage) {
    case "dashboard":
      return <DashboardContent />;
    case "requerimientos":
      return <RequerimientosPage />;
    case "requerimiento-detalle":
      return <RequerimientoDetalle />;
    case "nuevo-requerimiento":
      return <NuevoRequerimiento />;
    case "presupuesto":
      return <PresupuestoPage />;
    case "auditoria":
      return <AuditoriaPage />;
    case "legal":
      return <LegalPage />;
    case "contabilidad":
      return <ContabilidadPage />;
    case "alertas":
      return <AlertasPage />;
    case "configuracion":
      return <ConfiguracionPage />;
    default:
      return <DashboardContent />;
  }
}
