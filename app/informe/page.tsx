"use client";

import { HEURISTICAS, LEYES, PRODUCTO, SEVERIDADES } from "@/lib/data";
import { capturasDe, Registro } from "@/lib/storage";
import { useRegistros } from "@/lib/useRegistros";

export default function Informe() {
  const { registros, cargado } = useRegistros();

  if (!cargado) {
    return <p className="text-sm text-slate-500">Cargando informe…</p>;
  }

  const leyes = LEYES.map((l) => ({ item: l, r: registros[`ley-${l.id}`] }));
  const heuristicas = HEURISTICAS.map((h) => ({
    item: h,
    r: registros[`heu-${h.id}`],
  }));
  const leyesConDatos = leyes.filter(({ r }) => tieneDatos(r));
  const cumplidas = leyes.filter(({ r }) => r?.cumple === "cumple").length;
  const rotas = leyes.filter(({ r }) => r?.cumple === "rompe").length;
  const problemas = heuristicas.filter(
    ({ r }) => r?.severidad != null && r.severidad >= 1
  ).length;

  return (
    <div className="space-y-10">
      <div className="no-print flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-sm text-slate-600">
          Vista de solo lectura con toda la evaluación. Ideal para presentar en
          clase o guardar como PDF.
        </p>
        <button
          type="button"
          onClick={() => window.print()}
          className="shrink-0 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Imprimir / Guardar PDF
        </button>
      </div>

      <header>
        <h1 className="text-3xl font-bold text-slate-900">
          Informe de evaluación UX · {PRODUCTO}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Leyes UX y evaluación heurística de Nielsen, con evidencia y análisis.
        </p>
      </header>

      <section className="print-card rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">
          Resumen ejecutivo
        </h2>
        <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Cifra valor={cumplidas} etiqueta="leyes cumplidas" tono="text-emerald-600" />
          <Cifra valor={rotas} etiqueta="leyes rotas" tono="text-red-600" />
          <Cifra
            valor={problemas}
            etiqueta="heurísticas con problemas (sev. ≥ 1)"
            tono="text-orange-600"
          />
          <Cifra
            valor={heuristicas.filter(({ r }) => r?.severidad === 4).length}
            etiqueta="catástrofes de usabilidad"
            tono="text-red-700"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                <th className="py-2 pr-3">#</th>
                <th className="py-2 pr-3">Heurística</th>
                <th className="py-2 pr-3">Pantalla / flujo</th>
                <th className="py-2">Severidad</th>
              </tr>
            </thead>
            <tbody>
              {heuristicas.map(({ item, r }) => (
                <tr key={item.id} className="border-b border-slate-100">
                  <td className="py-2 pr-3 font-semibold text-slate-400">
                    {item.numero}
                  </td>
                  <td className="py-2 pr-3 font-medium text-slate-800">
                    {item.nombre}
                  </td>
                  <td className="py-2 pr-3 text-slate-500">
                    {r?.pantalla?.trim() || "—"}
                  </td>
                  <td className="py-2">
                    {r?.severidad != null ? (
                      <span
                        className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold ${SEVERIDADES[r.severidad].color}`}
                      >
                        {r.severidad} · {SEVERIDADES[r.severidad].etiqueta}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">sin evaluar</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900">
          Tablero 1 · Leyes UX ({leyesConDatos.length} documentadas)
        </h2>
        {leyesConDatos.length === 0 && (
          <p className="text-sm text-slate-500">
            Todavía no hay leyes documentadas.
          </p>
        )}
        <div className="space-y-6">
          {leyesConDatos.map(({ item, r }) => (
            <article
              key={item.id}
              className="print-card rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold">{item.nombre}</h3>
                {r?.cumple === "cumple" && (
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                    ✓ Cumple
                  </span>
                )}
                {r?.cumple === "rompe" && (
                  <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">
                    ✗ Rompe
                  </span>
                )}
                {r?.pantalla?.trim() && (
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                    {r.pantalla}
                  </span>
                )}
              </div>
              <Evidencia r={r} alt={`Evidencia de ${item.nombre}`} />
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900">
          Tablero 2 · Heurísticas de Nielsen
        </h2>
        <div className="space-y-6">
          {heuristicas.map(({ item, r }) => (
            <article
              key={item.id}
              className="print-card rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold">
                  {item.numero}. {item.nombre}
                </h3>
                {r?.severidad != null ? (
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${SEVERIDADES[r.severidad].color}`}
                  >
                    Severidad {r.severidad} · {SEVERIDADES[r.severidad].etiqueta}
                  </span>
                ) : (
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
                    Sin evaluar
                  </span>
                )}
                {r?.pantalla?.trim() && (
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                    {r.pantalla}
                  </span>
                )}
              </div>
              <Evidencia
                r={r}
                alt={`Evidencia de la heurística ${item.numero}`}
              />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function Cifra({
  valor,
  etiqueta,
  tono,
}: {
  valor: number;
  etiqueta: string;
  tono: string;
}) {
  return (
    <div className="rounded-lg bg-slate-50 px-4 py-3 text-center">
      <div className={`text-3xl font-bold ${tono}`}>{valor}</div>
      <div className="mt-1 text-xs text-slate-500">{etiqueta}</div>
    </div>
  );
}

function Evidencia({ r, alt }: { r: Registro | undefined; alt: string }) {
  const capturas = capturasDe(r);
  return (
    <>
      {capturas.map((c, i) => (
        <img
          key={i}
          src={c.img}
          alt={`${alt} (${i + 1})`}
          className="mb-3 max-h-96 rounded-lg border border-slate-200 bg-white object-contain"
        />
      ))}
      {r?.explicacion?.trim() && (
        <p className="text-sm text-slate-700">{r.explicacion}</p>
      )}
    </>
  );
}

function tieneDatos(r: Registro | undefined) {
  return Boolean(
    r && (r.cumple || capturasDe(r).length || r.explicacion?.trim())
  );
}
