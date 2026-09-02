"use client";

import { useRef, useState } from "react";
import { guardarTodos, leerTodos, Registro } from "@/lib/storage";

// Permite respaldar la evaluación como JSON y pasarla entre integrantes del
// equipo, ya que los datos viven en el navegador de cada persona.
export default function ExportarImportar({
  onImportado,
}: {
  onImportado?: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);

  async function exportar() {
    const registros = await leerTodos();
    const blob = new Blob([JSON.stringify({ registros }, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "evaluacion-ux-telepase.json";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  async function importar(file: File | undefined) {
    if (!file) return;
    try {
      const datos = JSON.parse(await file.text());
      const registros: Registro[] = datos.registros ?? [];
      if (!Array.isArray(registros)) throw new Error();
      await guardarTodos(registros);
      setMensaje(`Se importaron ${registros.length} registros.`);
      onImportado?.();
    } catch {
      setMensaje("El archivo no tiene un formato válido.");
    }
  }

  return (
    <div className="no-print flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={exportar}
        className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        Exportar respaldo (JSON)
      </button>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        Importar respaldo
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={(e) => {
          importar(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      {mensaje && <span className="text-sm text-slate-500">{mensaje}</span>}
    </div>
  );
}
