"use client";

import TarjetaLey from "@/components/TarjetaLey";
import { LEYES, PRODUCTO } from "@/lib/data";
import { useRegistros } from "@/lib/useRegistros";

export default function TableroLeyes() {
  const { registros, cargado, actualizar } = useRegistros();

  const documentadas = LEYES.filter((l) => {
    const r = registros[`ley-${l.id}`];
    return r?.cumple && r?.explicacion?.trim() && r?.captura;
  }).length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="mb-1 text-2xl font-bold text-slate-900">
          Tablero 1 · Leyes UX
        </h1>
        <p className="max-w-3xl text-sm text-slate-600">
          Recorré las navegaciones principales de {PRODUCTO} usando las 14
          leyes como checklist. No hace falta encontrar las 14: prioricen las
          más evidentes, con un piso sugerido de 8 documentadas (cumplidas o
          rotas) con evidencia real.
        </p>
        <p className="mt-2 text-sm font-medium text-indigo-700">
          {cargado
            ? `${documentadas} de ${LEYES.length} leyes documentadas`
            : "Cargando…"}
        </p>
      </div>
      <div className="space-y-6">
        {LEYES.map((ley) => (
          <TarjetaLey
            key={ley.id}
            ley={ley}
            registro={registros[`ley-${ley.id}`]}
            onCambio={(cambios, inmediato) =>
              actualizar(`ley-${ley.id}`, cambios, inmediato)
            }
          />
        ))}
      </div>
    </div>
  );
}
