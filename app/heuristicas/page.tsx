"use client";

import TarjetaHeuristica from "@/components/TarjetaHeuristica";
import { HEURISTICAS, PRODUCTO } from "@/lib/data";
import { useRegistros } from "@/lib/useRegistros";

export default function TableroHeuristicas() {
  const { registros, cargado, actualizar } = useRegistros();

  const evaluadas = HEURISTICAS.filter((h) => {
    const r = registros[`heu-${h.id}`];
    return r?.severidad != null && r?.explicacion?.trim() && r?.captura;
  }).length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="mb-1 text-2xl font-bold text-slate-900">
          Tablero 2 · Heurísticas de Nielsen
        </h1>
        <p className="max-w-3xl text-sm text-slate-600">
          Evaluación heurística completa de {PRODUCTO}: las 10 heurísticas, sin
          excepción. Para cada una, asigná la severidad en la escala de Nielsen
          (0–4), adjuntá la captura del punto de dolor (severidad ≥ 1) o del
          punto donde se cumple bien (severidad 0) y explicá el impacto.
        </p>
        <p className="mt-2 text-sm font-medium text-indigo-700">
          {cargado
            ? `${evaluadas} de ${HEURISTICAS.length} heurísticas evaluadas`
            : "Cargando…"}
        </p>
      </div>
      <div className="space-y-6">
        {HEURISTICAS.map((h) => (
          <TarjetaHeuristica
            key={h.id}
            heuristica={h}
            registro={registros[`heu-${h.id}`]}
            onCambio={(cambios, inmediato) =>
              actualizar(`heu-${h.id}`, cambios, inmediato)
            }
          />
        ))}
      </div>
    </div>
  );
}
