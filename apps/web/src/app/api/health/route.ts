import { NextResponse } from "next/server";

/**
 * Elegimos la URL interna del API:
 * - En Docker: http://api:8000  (nombre del servicio en docker-compose)
 * - En local (sin Docker): http://localhost:8000
 */
const API_INTERNAL_BASE_URL =
  process.env.API_INTERNAL_BASE_URL ||
  (process.env.DOCKER ? "http://api:8000" : "http://localhost:8000");

export async function GET() {
  try {
    const res = await fetch(`${API_INTERNAL_BASE_URL}/health`, {
      // Evita cachear en dev; queremos siempre el estado actual
      cache: "no-store",
    });
    if (!res.ok) {
      return NextResponse.json(
        { status: "error", error: `Upstream status ${res.status}` },
        { status: 502 }
      );
    }
    const data = (await res.json()) as { status?: string };
    return NextResponse.json(data, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ status: "error", error: message }, { status: 502 });
  }
}
