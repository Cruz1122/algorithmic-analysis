"use client";

import { useEffect, useState } from "react";

type Health = { status: string; error?: string };

export default function HealthStatus() {
    const [state, setState] = useState<"loading" | "ok" | "error">("loading");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        fetch("/api/health", { cache: "no-store" })
            .then(async (r) => {
                const data = (await r.json()) as Health;
                if (cancelled) return;
                if (r.ok && data.status === "ok") setState("ok");
                else {
                    setState("error");
                    setError(data.error || `HTTP ${r.status}`);
                }
            })
            .catch((e) => {
                if (cancelled) return;
                setState("error");
                setError(e instanceof Error ? e.message : String(e));
            });
        return () => {
            cancelled = true;
        };
    }, []);

    if (state === "loading") {
        return (
            <span className="mt-4 inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium
                      border-slate-300 bg-slate-50 text-slate-800
                      dark:border-slate-800 dark:bg-slate-900/30 dark:text-slate-200">
                API: comprobando…
            </span>
        );
    }

    if (state === "ok") {
        return (
            <span className="mt-4 inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium
                      border-emerald-300 bg-emerald-50 text-emerald-800
                      dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
                API: OK
            </span>
        );
    }

    return (
        <span className="mt-4 inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium
                      border-rose-300 bg-rose-50 text-rose-800
                      dark:border-rose-800 dark:bg-rose-900/30 dark:text-rose-200">
            API: error{error ? ` — ${error}` : ""}
        </span>
    );
}
