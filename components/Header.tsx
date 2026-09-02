"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PRODUCTO } from "@/lib/data";

const tabs = [
  { href: "/", etiqueta: "Inicio" },
  { href: "/leyes", etiqueta: "Leyes UX" },
  { href: "/heuristicas", etiqueta: "Heurísticas de Nielsen" },
  { href: "/informe", etiqueta: "Informe" },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="no-print sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-lg font-bold tracking-tight text-indigo-700">
            Evaluación UX
          </span>
          <span className="text-sm text-slate-500">{PRODUCTO}</span>
        </Link>
        <nav className="flex flex-wrap gap-1 text-sm">
          {tabs.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={`rounded-full px-3 py-1.5 font-medium transition-colors ${
                pathname === t.href
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {t.etiqueta}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
