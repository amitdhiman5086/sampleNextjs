import { unstable_cache } from "next/cache";
import { NextResponse } from "next/server";

// This function is wrapped in unstable_cache.
// It will only be called on a cache MISS.
// On a cache HIT, Next.js returns the stored result directly.
const getCachedTodo = unstable_cache(
  async () => {
    console.log("[API /cached] Cache MISS — fetching from external API...");
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = await res.json();

    return {
      source: "unstable_cache (cached)",
      data,
      fetchedAt: new Date().toISOString(),
    };
  },
  ["todo-cache-key"],
);

export async function GET() {
  const result = await getCachedTodo();
  return NextResponse.json(result);
}
