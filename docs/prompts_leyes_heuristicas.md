# prompts_leyes_heuristicas

Registro de los prompts usados para construir los tableros de evaluación de leyes UX y heurísticas de Nielsen sobre **TelePASE**.

- **Herramienta de IA usada:** Claude Code (modelo Claude Fable 5), ejecutado en la terminal sobre el proyecto.
- **Producto evaluado:** app TelePASE.
- **Resultado final:** un solo proyecto Next.js + TypeScript + Tailwind con dos vistas (leyes y heurísticas) más una vista de informe, desplegado en Vercel.
  - Tablero en línea: https://tableros-ux-telepase.vercel.app
  - Repositorio: https://github.com/2302-gimenez/tableros-ux-telepase

---

## Prompt 1 — Construcción completa de los tableros, repo y deploy

**Herramienta de IA usada:** Claude Code (Claude Fable 5).

**Objetivo del prompt:** pedirle a la IA que construya la herramienta completa de la tarea: los dos tableros de evaluación (leyes UX y heurísticas de Nielsen), la subida a GitHub y el deploy en Vercel. Se le pasó como contexto la consigna completa de la cátedra.

**Prompt completo (texto exacto):**

> Claude, tengo que hacer esta tarea para una materia de tecnologia. Preguntame si hace falta alguna informacion adicional, sino, hacelo
>
> *(a continuación se pegó, textual, la consigna completa de la cátedra: el mensaje de Slack con el repaso de la semana — card sorting, flujos de navegación, task flow, user flow, Gestalt, leyes UX, heurísticas de Nielsen — y las aclaraciones sobre la tarea: dos tableros construidos como mini-web con IA generativa, deploy en Vercel, repositorio en GitHub, tablero 1 con al menos 8 de las 14 leyes con cumple/rompe + captura + explicación, tablero 2 con las 10 heurísticas completas con severidad 0–4 + captura + explicación, y el documento de prompts con herramienta, objetivo, prompt completo y resultado/ajustes.)*

**Resultado y ajustes:**

- La IA primero hizo cuatro preguntas de alcance antes de escribir código: qué producto se evalúa (respondimos **la app de TelePASE**), cómo completar la evaluación (elegimos **interactivo en el navegador**, con guardado local, en lugar de contenido fijo en el código), con qué stack (**Next.js + Tailwind**) y si debía crear el repo y hacer el deploy (**sí, repo + deploy**).
- Con esas respuestas generó el proyecto completo en una sola pasada: página de inicio con progreso por tablero, tablero de leyes (14 leyes con resumen y pregunta guía, botones Cumple/Rompe, carga de captura por archivo, arrastre o pegado con Ctrl/Cmd+V, y campo de explicación), tablero de heurísticas (las 10, con la escala de severidad 0–4 de Nielsen explicada en cada botón), vista Informe de solo lectura para imprimir/guardar como PDF, y exportación/importación de un respaldo JSON para compartir el avance entre integrantes (los datos viven en el navegador de cada persona, no hay backend).
- **Qué hubo que corregir:** la primera compilación falló dos veces por errores de TypeScript en el hook de guardado (propiedades duplicadas en un objeto con spread); la propia IA los detectó al correr `npm run build` y los corrigió. También hubo que ajustar la configuración del servidor de desarrollo porque el puerto 3000 estaba ocupado por otro proceso.
- La IA verificó la herramienta en el navegador antes de publicar: completó una heurística de prueba (severidad + explicación + captura), recargó la página para confirmar que los datos persistían, revisó la vista Informe y después limpió los datos de prueba.
- Finalmente creó el repositorio público en GitHub, hizo el commit inicial y el deploy a producción en Vercel con el CLI (`vercel deploy --prod`). El único paso manual fue autorizar el login de Vercel en el navegador.

---

## Prompt 2 — Mejoras: anotación de capturas, resumen ejecutivo y multi-captura

**Herramienta de IA usada:** Claude Code (Claude Fable 5).

**Objetivo del prompt:** pedirle a la IA ideas para mejorar la herramienta y que implemente las elegidas. Antes preguntamos si la app debía evaluar automáticamente lo subido; la IA aclaró que no: la consigna pide una herramienta de documentación donde el juicio (cumple/rompe, severidad) es del equipo, y que automatizar el análisis iría contra el objetivo pedagógico de la tarea.

**Prompt completo (texto exacto):**

> pregunta, la idea de la webapp era que yo decida que cumple y que no o que la misma app cuando le subis algo lo decida?

> hay algo que se te ocurra para mejorarla en algo? Para que se mas intuitiva o incluso mas automatica, o lo que sea

**Resultado y ajustes:**

- La IA propuso cinco mejoras (anotar capturas, resumen ejecutivo en el informe, merge de respaldos JSON, campo pantalla/flujo, multi-captura) y elegimos tres: **anotar capturas**, **resumen ejecutivo** y **campo pantalla/flujo + multi-captura**.
- Implementó: un editor para dibujar recuadros y flechas rojas sobre la captura y señalar el punto exacto de la interfaz (con deshacer y "quitar marcas", que restaura la imagen original); un resumen ejecutivo al inicio del informe (leyes cumplidas/rotas, heurísticas con problemas, catástrofes, y una tabla con la severidad de las 10 heurísticas); un campo "pantalla o flujo analizado" en cada tarjeta; y soporte para varias capturas por tarjeta, manteniendo compatibilidad con los respaldos del formato anterior.
- **Ajustes:** en esta iteración no hubo errores de compilación; la IA verificó todo en el navegador (dibujó una anotación real con el mouse, recargó para confirmar la persistencia y revisó el resumen del informe) antes de hacer el deploy.

---

## Cómo seguir registrando prompts

Si usamos más prompts para ajustar los tableros o cargar el análisis, agregarlos acá con el mismo formato: **herramienta, objetivo, prompt completo (texto exacto) y resultado/ajustes**.
