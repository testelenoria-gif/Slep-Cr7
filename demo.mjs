// SLEP Control Financiero - Demo Automatizada con Playwright
// Genera screenshots de cada sección + video completo del recorrido

import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = path.join(__dirname, "demo", "screenshots");
const VIDEO_DIR = path.join(__dirname, "demo", "video");
const BASE_URL = "http://localhost:3000";

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function screenshot(page, name, stepNum) {
  await delay(1500); // Wait for render and animations
  const filename = `${String(stepNum).padStart(2, "0")}_${name}.png`;
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, filename),
    fullPage: false,
  });
  console.log(`  ✓ Screenshot: ${filename}`);
  await delay(2000); // Pause for video recording
}

async function main() {
  console.log("═══════════════════════════════════════════════");
  console.log("  SLEP Control Financiero - Demo Automatizada");
  console.log("═══════════════════════════════════════════════\n");

  const browser = await chromium.launch({
    headless: true,
    executablePath: "/root/.cache/ms-playwright/chromium-1194/chrome-linux/chrome",
  });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: VIDEO_DIR,
      size: { width: 1920, height: 1080 },
    },
  });

  const page = await context.newPage();
  let step = 1;

  try {
    // ─── 1. Pantalla de Login ───────────────────────────────
    console.log("1. Pantalla de Login");
    await page.goto(BASE_URL, { waitUntil: "networkidle" });
    await delay(2000);
    await screenshot(page, "login", step++);

    // ─── 2. Login como Admin TI ─────────────────────────────
    console.log("2. Login como Administrador TI");
    // Click on the "Administrador TI" button in quick access
    const adminButton = page.locator("button", { hasText: "Administrador TI" });
    await adminButton.click();
    await delay(3000);
    await screenshot(page, "dashboard", step++);

    // ─── 3. Dashboard - scroll para ver todo ────────────────
    console.log("3. Dashboard - Vista completa");
    // Scroll down to see charts
    await page.evaluate(() => {
      const main = document.querySelector("main") || document.documentElement;
      main.scrollBy(0, 500);
    });
    await delay(1500);
    await screenshot(page, "dashboard_charts", step++);
    // Scroll back up
    await page.evaluate(() => {
      const main = document.querySelector("main") || document.documentElement;
      main.scrollTo(0, 0);
    });
    await delay(500);

    // ─── 4. Requerimientos ──────────────────────────────────
    console.log("4. Requerimientos");
    const reqNav = page.locator("button", { hasText: "Requerimientos" }).first();
    await reqNav.click();
    await delay(2000);
    await screenshot(page, "requerimientos_lista", step++);

    // ─── 5. Detalle de un Requerimiento ─────────────────────
    console.log("5. Detalle de Requerimiento");
    // Click on the first "Ver Detalle" or similar button, or click on a requerimiento row
    const verDetalle = page.locator("text=Ver detalle").first();
    if (await verDetalle.isVisible()) {
      await verDetalle.click();
    } else {
      // Try clicking on a row/card of a requerimiento
      const reqRow = page.locator("[class*='cursor-pointer']").first();
      if (await reqRow.isVisible()) {
        await reqRow.click();
      }
    }
    await delay(2000);
    await screenshot(page, "requerimiento_detalle", step++);

    // Scroll to see timeline
    await page.evaluate(() => {
      const main = document.querySelector("main") || document.documentElement;
      main.scrollBy(0, 600);
    });
    await delay(1500);
    await screenshot(page, "requerimiento_timeline", step++);
    await page.evaluate(() => {
      const main = document.querySelector("main") || document.documentElement;
      main.scrollTo(0, 0);
    });

    // ─── 6. Nuevo Requerimiento ─────────────────────────────
    console.log("6. Nuevo Requerimiento");
    // Navigate back to requerimientos first
    const reqNav2 = page.locator("button", { hasText: "Requerimientos" }).first();
    await reqNav2.click();
    await delay(1500);
    // Click "Nuevo Requerimiento" button
    const nuevoReq = page.locator("button", { hasText: /nuevo/i }).first();
    if (await nuevoReq.isVisible()) {
      await nuevoReq.click();
      await delay(2000);
      await screenshot(page, "nuevo_requerimiento", step++);
    }

    // ─── 7. Presupuesto ─────────────────────────────────────
    console.log("7. Presupuesto");
    const presNav = page.locator("button", { hasText: "Presupuesto" }).first();
    await presNav.click();
    await delay(2000);
    await screenshot(page, "presupuesto", step++);

    // Scroll for more content
    await page.evaluate(() => {
      const main = document.querySelector("main") || document.documentElement;
      main.scrollBy(0, 500);
    });
    await delay(1500);
    await screenshot(page, "presupuesto_detalle", step++);
    await page.evaluate(() => {
      const main = document.querySelector("main") || document.documentElement;
      main.scrollTo(0, 0);
    });

    // ─── 8. Auditoría ───────────────────────────────────────
    console.log("8. Auditoría");
    const audNav = page.locator("button", { hasText: "Auditoría" }).first();
    await audNav.click();
    await delay(2000);
    await screenshot(page, "auditoria", step++);

    // ─── 9. Normativa Legal ─────────────────────────────────
    console.log("9. Normativa Legal");
    const legNav = page.locator("button", { hasText: "Normativa Legal" }).first();
    await legNav.click();
    await delay(2000);
    await screenshot(page, "legal", step++);

    // ─── 10. Contabilidad ───────────────────────────────────
    console.log("10. Contabilidad");
    const contNav = page.locator("button", { hasText: "Contabilidad" }).first();
    await contNav.click();
    await delay(2000);
    await screenshot(page, "contabilidad", step++);

    // ─── 11. Alertas ────────────────────────────────────────
    console.log("11. Alertas");
    const alertNav = page.locator("button", { hasText: "Alertas" }).first();
    await alertNav.click();
    await delay(2000);
    await screenshot(page, "alertas", step++);

    // ─── 12. Configuración ──────────────────────────────────
    console.log("12. Configuración");
    const confNav = page.locator("button", { hasText: "Configuración" }).first();
    await confNav.click();
    await delay(2000);
    await screenshot(page, "configuracion", step++);

    // ─── Volver al Dashboard para cerrar ────────────────────
    console.log("13. Regreso al Dashboard (cierre)");
    const dashNav = page.locator("button", { hasText: "Dashboard" }).first();
    await dashNav.click();
    await delay(3000);
    await screenshot(page, "dashboard_final", step++);

    console.log("\n═══════════════════════════════════════════════");
    console.log(`  ✅ Demo completada: ${step - 1} screenshots generados`);
    console.log(`  📁 Screenshots: demo/screenshots/`);
    console.log(`  🎬 Video: demo/video/`);
    console.log("═══════════════════════════════════════════════\n");
  } catch (error) {
    console.error("Error durante la demo:", error.message);
  } finally {
    await page.close();
    await context.close();
    await browser.close();
  }
}

main();
