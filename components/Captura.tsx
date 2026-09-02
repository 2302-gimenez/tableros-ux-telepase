"use client";

import { useRef, useState } from "react";
import { CapturaImg, procesarImagen } from "@/lib/storage";
import EditorCaptura from "./EditorCaptura";

interface Props {
  lista: CapturaImg[];
  onCambio: (lista: CapturaImg[]) => void;
}

export default function Captura({ lista, onCambio }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [arrastrando, setArrastrando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editando, setEditando] = useState<number | null>(null);

  async function cargar(files: Iterable<Blob | File | null | undefined>) {
    setError(null);
    const nuevas: CapturaImg[] = [];
    for (const file of files) {
      if (!file) continue;
      try {
        nuevas.push({ img: await procesarImagen(file) });
      } catch {
        setError("No se pudo procesar la imagen.");
      }
    }
    if (nuevas.length) onCambio([...lista, ...nuevas]);
  }

  return (
    <div className="space-y-3">
      {lista.map((c, i) => (
        <div key={i} className="relative">
          <img
            src={c.img}
            alt={`Captura ${i + 1} de la evidencia`}
            className="max-h-96 w-full rounded-lg border border-slate-200 bg-white object-contain"
          />
          <div className="no-print absolute right-2 top-2 flex gap-1.5">
            <button
              type="button"
              onClick={() => setEditando(i)}
              className="rounded-full bg-red-600/90 px-3 py-1 text-xs font-medium text-white hover:bg-red-600"
            >
              ✎ Señalar punto
            </button>
            {c.orig && (
              <button
                type="button"
                onClick={() =>
                  onCambio(
                    lista.map((x, j) => (j === i ? { img: x.orig! } : x))
                  )
                }
                className="rounded-full bg-slate-900/70 px-3 py-1 text-xs font-medium text-white hover:bg-slate-900"
              >
                Quitar marcas
              </button>
            )}
            <button
              type="button"
              onClick={() => onCambio(lista.filter((_, j) => j !== i))}
              className="rounded-full bg-slate-900/70 px-3 py-1 text-xs font-medium text-white hover:bg-slate-900"
            >
              Quitar
            </button>
          </div>
        </div>
      ))}

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setArrastrando(true);
        }}
        onDragLeave={() => setArrastrando(false)}
        onDrop={(e) => {
          e.preventDefault();
          setArrastrando(false);
          cargar(e.dataTransfer.files);
        }}
        onPaste={(e) => {
          cargar(
            Array.from(e.clipboardData.items)
              .filter((i) => i.type.startsWith("image/"))
              .map((i) => i.getAsFile())
          );
        }}
        className={`no-print flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed px-4 text-center text-sm transition-colors ${
          lista.length ? "py-3" : "py-8"
        } ${
          arrastrando
            ? "border-indigo-500 bg-indigo-50 text-indigo-700"
            : "border-slate-300 bg-slate-50 text-slate-500 hover:border-indigo-400 hover:text-indigo-600"
        }`}
      >
        <span className="font-medium">
          {lista.length
            ? "Agregar otra captura"
            : "Agregar captura de pantalla"}
        </span>
        <span className="text-xs">
          Hacé clic para elegir un archivo, arrastralo acá o pegalo con
          Ctrl/Cmd+V
        </span>
        {error && <span className="text-xs text-red-600">{error}</span>}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            cargar(e.target.files ?? []);
            e.target.value = "";
          }}
        />
      </div>

      {editando != null && lista[editando] && (
        <EditorCaptura
          img={lista[editando].img}
          onGuardar={(nuevoImg) => {
            onCambio(
              lista.map((x, j) =>
                j === editando
                  ? { img: nuevoImg, orig: x.orig ?? x.img }
                  : x
              )
            );
            setEditando(null);
          }}
          onCancelar={() => setEditando(null)}
        />
      )}
    </div>
  );
}
