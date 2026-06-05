import { NextResponse } from "next/server";

// No caching — every request hits the external API directly.
export async function GET() {
  console.log("[API /live] Fetching fresh data directly (no cache)...");

  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
    cache: "no-store", // explicitly opt out of any HTTP caching
  });
  const data = await res.json();

  return NextResponse.json({
    source: "no cache (live)",
    data,
    fetchedAt: new Date().toISOString(),
  });
}
