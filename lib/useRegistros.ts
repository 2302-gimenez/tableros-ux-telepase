"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { guardar, leerTodos, Registro } from "./storage";

export function useRegistros() {
  const [registros, setRegistros] = useState<Record<string, Registro>>({});
  const [cargado, setCargado] = useState(false);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    leerTodos()
      .then((lista) => {
        const map: Record<string, Registro> = {};
        for (const r of lista) map[r.id] = r;
        setRegistros(map);
      })
      .catch(() => {})
      .finally(() => setCargado(true));
  }, []);

  const actualizar = useCallback(
    (id: string, cambios: Partial<Registro>, inmediato = true) => {
      setRegistros((prev) => {
        const base: Registro = prev[id] ?? {
          id,
          explicacion: "",
          actualizado: Date.now(),
        };
        const nuevo: Registro = {
          ...base,
          ...cambios,
          id,
          actualizado: Date.now(),
        };
        if (inmediato) {
          guardar(nuevo).catch(() => {});
        } else {
          clearTimeout(timers.current[id]);
          timers.current[id] = setTimeout(() => {
            guardar(nuevo).catch(() => {});
          }, 500);
        }
        return { ...prev, [id]: nuevo };
      });
    },
    []
  );

  return { registros, cargado, actualizar, setRegistros };
}
