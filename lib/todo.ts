import { unstable_cache } from "next/cache";

// Cached version — shared between the API route and the page
export const getCachedTodo = unstable_cache(
  async () => {
    console.log("[getCachedTodo] Cache MISS — fetching from external API...");
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = await res.json();
    return {
      source: "unstable_cache (cached)",
      data,
      fetchedAt: new Date().toISOString(),
    };
  },
  ["todo-cache-key"]
);

// Live version — always fetches fresh data, no cache
export async function getLiveTodo() {
  console.log("[getLiveTodo] Fetching live data (no cache)...");
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
    cache: "no-store",
  });
  const data = await res.json();
  return {
    source: "no cache (live)",
    data,
    fetchedAt: new Date().toISOString(),
  };
}
