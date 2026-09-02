import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { PRODUCTO } from "@/lib/data";

export const metadata: Metadata = {
  title: `Evaluación UX · ${PRODUCTO}`,
  description:
    "Tableros de evaluación de leyes UX y heurísticas de Nielsen sobre " +
    PRODUCTO,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <footer className="no-print mx-auto max-w-5xl px-4 pb-8 text-center text-xs text-slate-400">
          Herramienta de evaluación construida con asistencia de IA (Claude
          Code) · Los datos se guardan localmente en tu navegador
        </footer>
      </body>
    </html>
  );
}
