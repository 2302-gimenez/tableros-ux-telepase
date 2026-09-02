# Evaluación UX · TelePASE

Tableros interactivos para documentar la evaluación de **leyes UX** y **heurísticas de Nielsen** sobre la app TelePASE. Construido con asistencia de IA generativa (Claude Code) como parte de la tarea de análisis de leyes y heurísticas.

## Los dos tableros

- **Tablero 1 · Leyes UX** (`/leyes`): checklist de las 14 leyes de la ficha de referencia rápida. Por cada ley: cumple/rompe, captura de pantalla y explicación (1–2 frases). Meta sugerida: al menos 8 documentadas.
- **Tablero 2 · Heurísticas de Nielsen** (`/heuristicas`): evaluación heurística completa de las 10 heurísticas. Por cada una: severidad en escala de Nielsen (0–4), captura y explicación del impacto.
- **Informe** (`/informe`): vista de solo lectura con toda la evaluación, lista para presentar o guardar como PDF.

## Cómo funciona

- La evaluación se completa directamente en el navegador: calificación, explicación y captura (se puede subir, arrastrar o pegar con Ctrl/Cmd+V).
- Todo se guarda automáticamente en el navegador (IndexedDB); no hay backend.
- Desde el inicio se puede **exportar/importar un respaldo JSON** para compartir el avance entre integrantes del equipo.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre en [http://localhost:3000](http://localhost:3000).

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS. Deploy en Vercel.
