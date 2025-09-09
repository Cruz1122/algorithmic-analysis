import HealthStatus from "@/components/HealthStatus";

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold tracking-tight">Web OK</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Next.js + TypeScript listo. Tailwind activado.
      </p>

        <HealthStatus />
    </main>
  );
}
