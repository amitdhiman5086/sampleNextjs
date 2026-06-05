import Image from "next/image";

type ApiResult = {
  source: string;
  data: { id: number; title: string; completed: boolean };
  fetchedAt: string;
};

async function getCachedResult(): Promise<ApiResult> {
  // Server-side fetch to our own cached API route
  const res = await fetch("http://localhost:3000/api/cached", {
    next: { revalidate: 60 },
  });
  return res.json();
}

async function getLiveResult(): Promise<ApiResult> {
  // Server-side fetch to our own live (no-cache) API route
  const res = await fetch("http://localhost:3000/api/live", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Home() {
  const [cached, live] = await Promise.all([
    getCachedResult(),
    getLiveResult(),
  ]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />

        <div className="flex flex-col gap-6 w-full mt-10">
          <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-white">
            Caching Demo
          </h1>

          {/* Cached API Result */}
          <div className="p-5 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
              <h2 className="text-sm font-semibold text-green-700 dark:text-green-300 uppercase tracking-wider">
                /api/cached — with unstable_cache
              </h2>
            </div>
            <p className="text-xs font-mono text-green-800 dark:text-green-200 mb-1">
              <span className="font-bold">Source:</span> {cached.source}
            </p>
            <p className="text-xs font-mono text-green-800 dark:text-green-200 mb-1">
              <span className="font-bold">Title:</span> {cached.data.title}
            </p>
            <p className="text-xs font-mono text-green-600 dark:text-green-400">
              <span className="font-bold">Fetched At:</span> {cached.fetchedAt}
            </p>
            <p className="mt-2 text-xs text-green-600 dark:text-green-500 italic">
              ↻ This timestamp stays the same for 60s — it&apos;s served from cache.
            </p>
          </div>

          {/* Live API Result */}
          <div className="p-5 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <h2 className="text-sm font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                /api/live — no cache
              </h2>
            </div>
            <p className="text-xs font-mono text-blue-800 dark:text-blue-200 mb-1">
              <span className="font-bold">Source:</span> {live.source}
            </p>
            <p className="text-xs font-mono text-blue-800 dark:text-blue-200 mb-1">
              <span className="font-bold">Title:</span> {live.data.title}
            </p>
            <p className="text-xs font-mono text-blue-600 dark:text-blue-400">
              <span className="font-bold">Fetched At:</span> {live.fetchedAt}
            </p>
            <p className="mt-2 text-xs text-blue-600 dark:text-blue-500 italic">
              ↻ This timestamp changes on every page reload — no cache used.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
