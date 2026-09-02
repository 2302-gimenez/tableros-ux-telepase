"use client";

import { useRef, useState } from "react";
import { procesarImagen } from "@/lib/storage";

interface Props {
  valor: string | null | undefined;
  onCambio: (dataUrl: string | null) => void;
}

export default function Captura({ valor, onCambio }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [arrastrando, setArrastrando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function cargar(file: Blob | null | undefined) {
    if (!file) return;
    setError(null);
    try {
      onCambio(await procesarImagen(file));
    } catch {
      setError("No se pudo procesar la imagen.");
    }
  }

  if (valor) {
    return (
      <div className="relative">
        <img
          src={valor}
          alt="Captura de pantalla de la evidencia"
          className="max-h-96 w-full rounded-lg border border-slate-200 object-contain bg-white"
        />
        <button
          type="button"
          onClick={() => onCambio(null)}
          className="no-print absolute right-2 top-2 rounded-full bg-slate-900/70 px-3 py-1 text-xs font-medium text-white hover:bg-slate-900"
        >
          Quitar
        </button>
      </div>
    );
  }

  return (
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
        cargar(e.dataTransfer.files?.[0]);
      }}
      onPaste={(e) => {
        const item = Array.from(e.clipboardData.items).find((i) =>
          i.type.startsWith("image/")
        );
        cargar(item?.getAsFile());
      }}
      className={`no-print flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed px-4 py-8 text-center text-sm transition-colors ${
        arrastrando
          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
          : "border-slate-300 bg-slate-50 text-slate-500 hover:border-indigo-400 hover:text-indigo-600"
      }`}
    >
      <span className="font-medium">Agregar captura de pantalla</span>
      <span className="text-xs">
        Hacé clic para elegir un archivo, arrastralo acá o pegalo con Ctrl/Cmd+V
      </span>
      {error && <span className="text-xs text-red-600">{error}</span>}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          cargar(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
    </div>
  );
}
