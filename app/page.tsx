"use client";

import { useEffect } from "react";

export default function QueueRedirect() {
  useEffect(() => {
    window.location.href = "https://queue-watch-4d6d.vercel.app";
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <p>行列ウォッチへ移動中...</p>
    </main>
  );
}