"use client";

import dynamic from "next/dynamic";
import { initialBoard } from "@/lib/dummy-data";

const Board = dynamic(
  () => import("@/components/Board").then((m) => m.Board),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-gray-200 bg-white px-6 py-5 shadow-sm">
        <h1 className="text-2xl font-bold text-dark-navy">Project Board</h1>
        <p className="mt-1 text-sm text-gray-text">
          Drag cards between columns to track progress
        </p>
      </header>
      <main className="flex-1 overflow-hidden px-6 py-6">
        <Board initialBoard={initialBoard} />
      </main>
    </div>
  );
}
