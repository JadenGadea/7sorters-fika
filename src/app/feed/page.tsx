import type { Metadata } from "next";
import FeedList from "@/components/FeedList";

export const metadata: Metadata = {
  title: "Flöde — 7Sorters Fika",
  description: "Se vem som matar karaktärerna just nu!",
};

export default function FeedPage() {
  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-12">
      <div className="w-full max-w-md">
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Live-flöde</h1>
          <p className="text-sm text-gray-500 mt-1">
            Se vem som matar karaktärerna just nu
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-xs text-green-600">Live</span>
          </div>
        </header>

        <FeedList />
      </div>
    </main>
  );
}
