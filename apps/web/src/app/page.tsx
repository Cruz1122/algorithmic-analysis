export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold tracking-tight">Web OK</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Next.js + TypeScript listo. Tailwind activado.
      </p>
      <div className="mt-4 inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium
                      border-emerald-300 bg-emerald-50 text-emerald-800
                      dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
        Tailwind OK
      </div>
    </main>
  );
}
