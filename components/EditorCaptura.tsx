"use client";

import { useEffect, useRef, useState } from "react";

interface Forma {
  tipo: "rect" | "flecha";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface Props {
  img: string;
  onGuardar: (nuevoImg: string) => void;
  onCancelar: () => void;
}

// Editor para señalar el punto exacto de la interfaz sobre la captura:
// dibuja recuadros o flechas rojas y las "quema" en la imagen al guardar.
export default function EditorCaptura({ img, onGuardar, onCancelar }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagenRef = useRef<HTMLImageElement | null>(null);
  const [listo, setListo] = useState(false);
  const [herramienta, setHerramienta] = useState<"rect" | "flecha">("rect");
  const [formas, setFormas] = useState<Forma[]>([]);
  const [borrador, setBorrador] = useState<Forma | null>(null);

  useEffect(() => {
    const imagen = new Image();
    imagen.onload = () => {
      imagenRef.current = imagen;
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = imagen.naturalWidth;
        canvas.height = imagen.naturalHeight;
      }
      setListo(true);
    };
    imagen.src = img;
  }, [img]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const imagen = imagenRef.current;
    if (!canvas || !imagen || !listo) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(imagen, 0, 0);
    const grosor = Math.max(4, canvas.width * 0.004);
    ctx.strokeStyle = "#dc2626";
    ctx.fillStyle = "#dc2626";
    ctx.lineWidth = grosor;
    ctx.lineCap = "round";
    for (const f of [...formas, ...(borrador ? [borrador] : [])]) {
      if (f.tipo === "rect") {
        ctx.strokeRect(f.x1, f.y1, f.x2 - f.x1, f.y2 - f.y1);
      } else {
        ctx.beginPath();
        ctx.moveTo(f.x1, f.y1);
        ctx.lineTo(f.x2, f.y2);
        ctx.stroke();
        const ang = Math.atan2(f.y2 - f.y1, f.x2 - f.x1);
        const largo = grosor * 3.5;
        ctx.beginPath();
        ctx.moveTo(f.x2, f.y2);
        ctx.lineTo(
          f.x2 - largo * Math.cos(ang - 0.45),
          f.y2 - largo * Math.sin(ang - 0.45)
        );
        ctx.lineTo(
          f.x2 - largo * Math.cos(ang + 0.45),
          f.y2 - largo * Math.sin(ang + 0.45)
        );
        ctx.closePath();
        ctx.fill();
      }
    }
  }, [formas, borrador, listo]);

  function coords(e: React.PointerEvent): [number, number] {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return [
      ((e.clientX - rect.left) / rect.width) * canvas.width,
      ((e.clientY - rect.top) / rect.height) * canvas.height,
    ];
  }

  function guardar() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    onGuardar(canvas.toDataURL("image/jpeg", 0.85));
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/90 p-4">
      <div className="mx-auto mb-3 flex w-full max-w-4xl flex-wrap items-center gap-2">
        <span className="mr-2 text-sm font-medium text-white">
          Señalá el punto exacto:
        </span>
        {(
          [
            ["rect", "▭ Recuadro"],
            ["flecha", "↗ Flecha"],
          ] as const
        ).map(([valor, etiqueta]) => (
          <button
            key={valor}
            type="button"
            onClick={() => setHerramienta(valor)}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
              herramienta === valor
                ? "bg-red-600 text-white"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {etiqueta}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setFormas((f) => f.slice(0, -1))}
          disabled={formas.length === 0}
          className="rounded-lg bg-white/10 px-3 py-1.5 text-sm font-semibold text-white hover:bg-white/20 disabled:opacity-40"
        >
          Deshacer
        </button>
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={onCancelar}
            className="rounded-lg bg-white/10 px-4 py-1.5 text-sm font-semibold text-white hover:bg-white/20"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={guardar}
            className="rounded-lg bg-indigo-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400"
          >
            Guardar
          </button>
        </div>
      </div>
      <div className="mx-auto flex min-h-0 w-full max-w-4xl flex-1 items-start justify-center overflow-auto">
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            const [x, y] = coords(e);
            setBorrador({ tipo: herramienta, x1: x, y1: y, x2: x, y2: y });
          }}
          onPointerMove={(e) => {
            if (!borrador) return;
            const [x, y] = coords(e);
            setBorrador({ ...borrador, x2: x, y2: y });
          }}
          onPointerUp={() => {
            if (!borrador) return;
            if (
              Math.abs(borrador.x2 - borrador.x1) > 5 ||
              Math.abs(borrador.y2 - borrador.y1) > 5
            ) {
              setFormas((f) => [...f, borrador]);
            }
            setBorrador(null);
          }}
          className="max-h-full max-w-full cursor-crosshair rounded-lg bg-white shadow-2xl"
          style={{ touchAction: "none" }}
        />
      </div>
    </div>
  );
}
