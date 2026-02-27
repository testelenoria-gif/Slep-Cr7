import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SLEP Control Financiero - Sistema de Trazabilidad",
  description: "Sistema de control financiero, legal y contable para Servicios Locales de Educación Pública. Ley 21.040 - Chile.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
