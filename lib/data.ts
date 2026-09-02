export const PRODUCTO = "TelePASE";

export interface Ley {
  id: string;
  nombre: string;
  resumen: string;
  preguntaGuia: string;
}

export interface Heuristica {
  id: string;
  numero: number;
  nombre: string;
  resumen: string;
  preguntaGuia: string;
}

// Las 14 leyes UX de la ficha de referencia rápida
export const LEYES: Ley[] = [
  {
    id: "jakob",
    nombre: "Ley de Jakob",
    resumen:
      "Las personas pasan la mayor parte del tiempo en otros sitios y esperan que el tuyo funcione igual que los que ya conocen.",
    preguntaGuia:
      "¿La app usa patrones y convenciones que la persona ya conoce de otras apps similares?",
  },
  {
    id: "fitts",
    nombre: "Ley de Fitts",
    resumen:
      "El tiempo para alcanzar un objetivo depende de su tamaño y su distancia: botones grandes y cercanos se tocan más rápido.",
    preguntaGuia:
      "¿Los botones y zonas táctiles importantes son grandes y fáciles de alcanzar con el pulgar?",
  },
  {
    id: "hick",
    nombre: "Ley de Hick",
    resumen:
      "A más opciones y más complejas, más tiempo tarda la persona en decidir.",
    preguntaGuia:
      "¿La pantalla limita la cantidad de opciones o abruma con demasiadas alternativas a la vez?",
  },
  {
    id: "miller",
    nombre: "Ley de Miller",
    resumen:
      "La memoria de trabajo retiene unos 7 (±2) elementos: la información conviene agruparla en bloques manejables.",
    preguntaGuia:
      "¿La información está agrupada en bloques cortos y fáciles de retener, o exige memorizar demasiado?",
  },
  {
    id: "postel",
    nombre: "Ley de Postel",
    resumen:
      "Sé liberal con lo que aceptás del usuario y conservador con lo que le mostrás.",
    preguntaGuia:
      "¿Los formularios aceptan entradas con formatos variados (patente con o sin espacios, mayúsculas, etc.) sin castigar al usuario?",
  },
  {
    id: "peak-end",
    nombre: "Regla del pico-final",
    resumen:
      "Una experiencia se juzga por su momento más intenso y por cómo termina, no por el promedio.",
    preguntaGuia:
      "¿El momento más crítico del flujo y el cierre de la tarea dejan una sensación positiva?",
  },
  {
    id: "estetica-usabilidad",
    nombre: "Efecto estética-usabilidad",
    resumen:
      "Un diseño estéticamente agradable se percibe como más fácil de usar y vuelve más tolerables los problemas menores.",
    preguntaGuia:
      "¿El diseño visual transmite cuidado y hace que la app se perciba como más usable?",
  },
  {
    id: "von-restorff",
    nombre: "Efecto Von Restorff",
    resumen:
      "Entre varios elementos similares, el que se diferencia visualmente es el que se recuerda.",
    preguntaGuia:
      "¿La acción o el dato más importante de la pantalla se destaca claramente del resto?",
  },
  {
    id: "tesler",
    nombre: "Ley de Tesler",
    resumen:
      "Toda tarea tiene una complejidad mínima que no se puede eliminar: alguien la absorbe, el sistema o el usuario.",
    preguntaGuia:
      "¿La app absorbe la complejidad del trámite o se la traslada a la persona usuaria?",
  },
  {
    id: "doherty",
    nombre: "Umbral de Doherty",
    resumen:
      "La productividad se dispara cuando sistema y usuario interactúan a un ritmo menor a 400 ms, o al menos con feedback de progreso.",
    preguntaGuia:
      "¿La app responde rápido o, cuando demora, muestra indicadores de carga y progreso?",
  },
  {
    id: "zeigarnik",
    nombre: "Efecto Zeigarnik",
    resumen:
      "Las tareas incompletas se recuerdan mejor que las completas: señalar lo pendiente invita a terminarlo.",
    preguntaGuia:
      "¿La app señala lo que quedó pendiente (datos incompletos, pasos restantes) e invita a completarlo?",
  },
  {
    id: "posicion-serial",
    nombre: "Efecto de posición serial",
    resumen:
      "En una lista se recuerdan mejor los primeros y los últimos elementos.",
    preguntaGuia:
      "¿Los ítems clave de menús y listas están ubicados al principio o al final?",
  },
  {
    id: "pragnanz",
    nombre: "Ley de Prägnanz",
    resumen:
      "Percibimos las formas ambiguas o complejas en su versión más simple posible.",
    preguntaGuia:
      "¿El layout se percibe simple y ordenado, o hay pantallas visualmente confusas?",
  },
  {
    id: "proximidad",
    nombre: "Ley de proximidad",
    resumen:
      "Los elementos que están cerca entre sí se perciben como un grupo relacionado.",
    preguntaGuia:
      "¿Los elementos relacionados están agrupados y los no relacionados, separados con claridad?",
  },
];

// Las 10 heurísticas de Nielsen
export const HEURISTICAS: Heuristica[] = [
  {
    id: "h1",
    numero: 1,
    nombre: "Visibilidad del estado del sistema",
    resumen:
      "El sistema debe mantener informada a la persona sobre lo que está pasando, con feedback apropiado y a tiempo.",
    preguntaGuia:
      "¿La app comunica claramente saldo, estado del trámite, cargas en proceso y confirmaciones?",
  },
  {
    id: "h2",
    numero: 2,
    nombre: "Coincidencia entre el sistema y el mundo real",
    resumen:
      "El sistema debe hablar el idioma de la persona, con palabras y conceptos familiares, no jerga interna.",
    preguntaGuia:
      "¿Los textos usan lenguaje cotidiano o jerga administrativa/técnica difícil de entender?",
  },
  {
    id: "h3",
    numero: 3,
    nombre: "Control y libertad del usuario",
    resumen:
      "Las personas cometen errores y necesitan una salida de emergencia clara: deshacer, cancelar, volver.",
    preguntaGuia:
      "¿Se puede cancelar, volver atrás o deshacer una acción sin quedar atrapado en el flujo?",
  },
  {
    id: "h4",
    numero: 4,
    nombre: "Consistencia y estándares",
    resumen:
      "Las mismas palabras, situaciones y acciones deben significar lo mismo en toda la app, y seguir las convenciones de la plataforma.",
    preguntaGuia:
      "¿Los botones, íconos y términos se usan de forma consistente en todas las pantallas?",
  },
  {
    id: "h5",
    numero: 5,
    nombre: "Prevención de errores",
    resumen:
      "Mejor que un buen mensaje de error es un diseño que evita que el problema ocurra.",
    preguntaGuia:
      "¿La app valida datos, confirma acciones riesgosas y evita que la persona se equivoque?",
  },
  {
    id: "h6",
    numero: 6,
    nombre: "Reconocimiento antes que recuerdo",
    resumen:
      "Minimizar la carga de memoria: opciones y acciones visibles en lugar de obligar a recordar información entre pantallas.",
    preguntaGuia:
      "¿La app muestra la información necesaria en cada paso o exige recordar datos de pantallas anteriores?",
  },
  {
    id: "h7",
    numero: 7,
    nombre: "Flexibilidad y eficiencia de uso",
    resumen:
      "Atajos y personalización permiten que quienes ya conocen el sistema trabajen más rápido, sin complicar a quien recién empieza.",
    preguntaGuia:
      "¿Existen atajos (accesos rápidos, favoritos, datos guardados) para las tareas frecuentes?",
  },
  {
    id: "h8",
    numero: 8,
    nombre: "Diseño estético y minimalista",
    resumen:
      "Las pantallas no deben contener información irrelevante: cada elemento extra compite con los relevantes.",
    preguntaGuia:
      "¿Las pantallas muestran solo lo necesario o hay ruido visual e información irrelevante?",
  },
  {
    id: "h9",
    numero: 9,
    nombre: "Ayudar a reconocer, diagnosticar y recuperarse de errores",
    resumen:
      "Los mensajes de error deben estar en lenguaje simple, indicar el problema con precisión y sugerir una solución.",
    preguntaGuia:
      "¿Los mensajes de error explican qué pasó y cómo resolverlo, o son códigos y textos genéricos?",
  },
  {
    id: "h10",
    numero: 10,
    nombre: "Ayuda y documentación",
    resumen:
      "Idealmente el sistema no necesita explicación, pero la ayuda debe ser fácil de encontrar, concreta y orientada a la tarea.",
    preguntaGuia:
      "¿Hay ayuda accesible y útil (preguntas frecuentes, tutoriales, soporte) cuando algo no se entiende?",
  },
];

export const SEVERIDADES = [
  {
    valor: 0,
    etiqueta: "No es un problema",
    descripcion: "La heurística se cumple bien en el punto analizado.",
    color: "bg-emerald-100 text-emerald-800 border-emerald-300",
    colorActivo: "bg-emerald-600 text-white border-emerald-600",
  },
  {
    valor: 1,
    etiqueta: "Cosmético",
    descripcion: "Solo se corrige si sobra tiempo.",
    color: "bg-sky-100 text-sky-800 border-sky-300",
    colorActivo: "bg-sky-600 text-white border-sky-600",
  },
  {
    valor: 2,
    etiqueta: "Menor",
    descripcion: "Molesta, pero baja prioridad de arreglo.",
    color: "bg-amber-100 text-amber-800 border-amber-300",
    colorActivo: "bg-amber-500 text-white border-amber-500",
  },
  {
    valor: 3,
    etiqueta: "Mayor",
    descripcion: "Dificulta la tarea, alta prioridad de arreglo.",
    color: "bg-orange-100 text-orange-800 border-orange-300",
    colorActivo: "bg-orange-600 text-white border-orange-600",
  },
  {
    valor: 4,
    etiqueta: "Catástrofe",
    descripcion: "Impide completar la tarea, se debe arreglar sí o sí.",
    color: "bg-red-100 text-red-800 border-red-300",
    colorActivo: "bg-red-600 text-white border-red-600",
  },
] as const;
