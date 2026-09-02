"use client";

import { Ley } from "@/lib/data";
import { Registro } from "@/lib/storage";
import Captura from "./Captura";

interface Props {
  ley: Ley;
  registro: Registro | undefined;
  onCambio: (cambios: Partial<Registro>, inmediato?: boolean) => void;
}

export default function TarjetaLey({ ley, registro, onCambio }: Props) {
  const completa = Boolean(
    registro?.cumple && registro?.explicacion?.trim() && registro?.captura
  );

  return (
    <article
      className={`print-card rounded-xl border bg-white p-5 shadow-sm transition-colors ${
        completa ? "border-emerald-300" : "border-slate-200"
      }`}
    >
      <div className="mb-1 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900">{ley.nombre}</h3>
        {completa && (
          <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
            Documentada ✓
          </span>
        )}
      </div>
      <p className="mb-2 text-sm text-slate-600">{ley.resumen}</p>
      <p className="mb-4 rounded-md bg-indigo-50 px-3 py-2 text-sm text-indigo-800">
        <span className="font-semibold">Pregunta guía: </span>
        {ley.preguntaGuia}
      </p>

      <div className="mb-4 flex gap-2">
        {(
          [
            ["cumple", "✓ Cumple", "border-emerald-600 bg-emerald-600 text-white"],
            ["rompe", "✗ Rompe", "border-red-600 bg-red-600 text-white"],
          ] as const
        ).map(([valor, etiqueta, activo]) => (
          <button
            key={valor}
            type="button"
            onClick={() =>
              onCambio({ cumple: registro?.cumple === valor ? null : valor })
            }
            className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
              registro?.cumple === valor
                ? activo
                : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {etiqueta}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <Captura
          valor={registro?.captura}
          onCambio={(captura) => onCambio({ captura })}
        />
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-slate-700">
          Explicación (1–2 frases: qué pasa y por qué)
        </span>
        <textarea
          value={registro?.explicacion ?? ""}
          onChange={(e) => onCambio({ explicacion: e.target.value }, false)}
          rows={3}
          placeholder="Ej.: El botón principal de pago ocupa todo el ancho y está al alcance del pulgar, lo que reduce el tiempo para completar la acción."
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      </label>
    </article>
  );
}
