"use client";

import { Heuristica, SEVERIDADES } from "@/lib/data";
import { Registro } from "@/lib/storage";
import Captura from "./Captura";

interface Props {
  heuristica: Heuristica;
  registro: Registro | undefined;
  onCambio: (cambios: Partial<Registro>, inmediato?: boolean) => void;
}

export default function TarjetaHeuristica({
  heuristica,
  registro,
  onCambio,
}: Props) {
  const completa = Boolean(
    registro?.severidad != null &&
      registro?.explicacion?.trim() &&
      registro?.captura
  );

  return (
    <article
      className={`print-card rounded-xl border bg-white p-5 shadow-sm transition-colors ${
        completa ? "border-emerald-300" : "border-slate-200"
      }`}
    >
      <div className="mb-1 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900">
          <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
            {heuristica.numero}
          </span>
          {heuristica.nombre}
        </h3>
        {completa && (
          <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
            Evaluada ✓
          </span>
        )}
      </div>
      <p className="mb-2 text-sm text-slate-600">{heuristica.resumen}</p>
      <p className="mb-4 rounded-md bg-indigo-50 px-3 py-2 text-sm text-indigo-800">
        <span className="font-semibold">Pregunta guía: </span>
        {heuristica.preguntaGuia}
      </p>

      <fieldset className="mb-4">
        <legend className="mb-2 text-sm font-medium text-slate-700">
          Severidad (escala de Nielsen)
        </legend>
        <div className="flex flex-wrap gap-2">
          {SEVERIDADES.map((s) => (
            <button
              key={s.valor}
              type="button"
              title={s.descripcion}
              onClick={() =>
                onCambio({
                  severidad: registro?.severidad === s.valor ? null : s.valor,
                })
              }
              className={`rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
                registro?.severidad === s.valor ? s.colorActivo : s.color
              }`}
            >
              {s.valor} · {s.etiqueta}
            </button>
          ))}
        </div>
        {registro?.severidad != null && (
          <p className="mt-2 text-xs text-slate-500">
            {SEVERIDADES[registro.severidad].descripcion}
          </p>
        )}
      </fieldset>

      <div className="mb-4">
        <Captura
          valor={registro?.captura}
          onCambio={(captura) => onCambio({ captura })}
        />
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-slate-700">
          Explicación (qué pasa, por qué rompe o cumple la heurística y qué
          impacto tiene en la persona usuaria)
        </span>
        <textarea
          value={registro?.explicacion ?? ""}
          onChange={(e) => onCambio({ explicacion: e.target.value }, false)}
          rows={4}
          placeholder="Ej.: Al pagar el saldo no aparece ningún indicador de progreso y la pantalla queda congelada varios segundos; la persona no sabe si el pago se procesó y puede volver a tocar el botón."
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      </label>
    </article>
  );
}
