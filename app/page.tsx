"use client";

import Link from "next/link";
import { HEURISTICAS, LEYES, PRODUCTO } from "@/lib/data";
import { useRegistros } from "@/lib/useRegistros";

export default function Inicio() {
  const { registros, cargado } = useRegistros();

  const leyesDocumentadas = LEYES.filter((l) => {
    const r = registros[`ley-${l.id}`];
    return r?.cumple && r?.explicacion?.trim() && r?.captura;
  }).length;

  const heuristicasEvaluadas = HEURISTICAS.filter((h) => {
    const r = registros[`heu-${h.id}`];
    return r?.severidad != null && r?.explicacion?.trim() && r?.captura;
  }).length;

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 px-6 py-10 text-white shadow-lg">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">
          Evaluación UX de {PRODUCTO}
        </h1>
        <p className="max-w-2xl text-indigo-100">
          Herramienta para documentar el análisis de la app: leyes UX (con
          evidencia de cumplimiento o incumplimiento) y evaluación heurística
          completa según las 10 heurísticas de Nielsen. Cada hallazgo incluye
          calificación, captura de pantalla y explicación.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/leyes"
          className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
        >
          <h2 className="mb-1 text-xl font-semibold text-slate-900 group-hover:text-indigo-700">
            Tablero 1 · Leyes UX
          </h2>
          <p className="mb-4 text-sm text-slate-600">
            Recorrido por las navegaciones principales usando las 14 leyes de
            la ficha de referencia como checklist. Cobertura mínima sugerida: 8
            leyes con evidencia real.
          </p>
          <Progreso
            actual={cargado ? leyesDocumentadas : 0}
            total={LEYES.length}
            meta={8}
          />
        </Link>

        <Link
          href="/heuristicas"
          className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
        >
          <h2 className="mb-1 text-xl font-semibold text-slate-900 group-hover:text-indigo-700">
            Tablero 2 · Heurísticas de Nielsen
          </h2>
          <p className="mb-4 text-sm text-slate-600">
            Evaluación heurística completa: las 10 heurísticas sin excepción,
            con severidad en la escala de Nielsen (0–4), captura y análisis del
            impacto.
          </p>
          <Progreso
            actual={cargado ? heuristicasEvaluadas : 0}
            total={HEURISTICAS.length}
            meta={10}
          />
        </Link>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Cómo se usa
        </h2>
        <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-600">
          <li>
            Recorré los flujos principales de {PRODUCTO} y sacá capturas de los
            puntos donde una ley o heurística se cumple o se rompe.
          </li>
          <li>
            En cada tarjeta: elegí la calificación, subí (o pegá con Ctrl/Cmd+V)
            la captura y escribí la explicación.
          </li>
          <li>
            Todo se guarda automáticamente en tu navegador. Usá el respaldo JSON
            para compartir el avance con el equipo.
          </li>
          <li>
            Cuando terminen, la pestaña <strong>Informe</strong> muestra la
            evaluación completa lista para presentar o guardar como PDF.
          </li>
        </ol>
        <div className="mt-4 border-t border-slate-100 pt-4">
          <ExportarImportarWrapper />
        </div>
      </section>
    </div>
  );
}

function Progreso({
  actual,
  total,
  meta,
}: {
  actual: number;
  total: number;
  meta: number;
}) {
  const pct = Math.round((actual / total) * 100);
  const cumplida = actual >= meta;
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs font-medium">
        <span className={cumplida ? "text-emerald-600" : "text-slate-500"}>
          {actual} de {total} completas {cumplida && "· ¡meta alcanzada!"}
        </span>
        <span className="text-slate-400">meta: {meta}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all ${
            cumplida ? "bg-emerald-500" : "bg-indigo-500"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

import ExportarImportar from "@/components/ExportarImportar";

function ExportarImportarWrapper() {
  return (
    <ExportarImportar onImportado={() => window.location.reload()} />
  );
}
