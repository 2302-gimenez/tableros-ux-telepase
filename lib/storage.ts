// Persistencia local con IndexedDB (las capturas como dataURL no entran en localStorage).

export interface CapturaImg {
  img: string; // dataURL mostrado (puede tener anotaciones quemadas)
  orig?: string; // dataURL sin anotaciones, para restaurar
}

export interface Registro {
  id: string;
  cumple?: "cumple" | "rompe" | null; // tablero de leyes
  severidad?: number | null; // tablero de heurísticas
  pantalla?: string; // pantalla o flujo analizado
  explicacion: string;
  captura?: string | null; // formato viejo: una sola captura
  capturas?: CapturaImg[];
  actualizado: number;
}

// Compatibilidad con respaldos del formato viejo (campo `captura` único).
export function capturasDe(r: Registro | undefined): CapturaImg[] {
  if (!r) return [];
  if (r.capturas?.length) return r.capturas;
  return r.captura ? [{ img: r.captura }] : [];
}

const DB_NAME = "tableros-ux-telepase";
const STORE = "registros";

function abrirDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) {
        req.result.createObjectStore(STORE, { keyPath: "id" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function leerTodos(): Promise<Registro[]> {
  const db = await abrirDB();
  return new Promise((resolve, reject) => {
    const req = db.transaction(STORE, "readonly").objectStore(STORE).getAll();
    req.onsuccess = () => resolve(req.result as Registro[]);
    req.onerror = () => reject(req.error);
  });
}

export async function guardar(registro: Registro): Promise<void> {
  const db = await abrirDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(registro);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function guardarTodos(registros: Registro[]): Promise<void> {
  const db = await abrirDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    for (const r of registros) tx.objectStore(STORE).put(r);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

// Redimensiona una captura a un ancho máximo y la comprime como JPEG,
// para que el almacenamiento local no se llene con imágenes de pantalla completa.
export function procesarImagen(file: Blob, maxAncho = 1600): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const escala = Math.min(1, maxAncho / img.width);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * escala);
      canvas.height = Math.round(img.height * escala);
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas no disponible"));
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("No se pudo leer la imagen"));
    };
    img.src = url;
  });
}
