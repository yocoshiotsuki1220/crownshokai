"use client";

import Image from "next/image";

const APPS = [
  {
    name: "行列ウォッチ",
    url: "https://queue.crownshokai.jp",
    qr: "/qr/queue.png",
  },
  {
    name: "PointGathering",
    url: "https://pg.crownshokai.jp",
    qr: "/qr/pg.png",
  },
  {
    name: "こんだけ",
    url: "https://kondake.crownshokai.jp",
    qr: "/qr/kondake.png",
  },
];

export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#0A0A0C",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div style={{ textAlign: "center" }}>

        <Image src="/logo.png" alt="logo" width={160} height={160} />

        <div style={{
          marginTop: 16,
          marginBottom: 40,
          fontSize: 14,
          letterSpacing: 2,
          opacity: 0.7,
        }}>
          CROWN SHOKAI INC.
        </div>

        <div style={{
          display: "flex",
          gap: 32,
          justifyContent: "center",
        }}>
          {APPS.map(app => (
            <a key={app.name} href={app.url}>
              <Image src={app.qr} alt={app.name} width={120} height={120} />
              <div>{app.name}</div>
            </a>
          ))}
        </div>

      </div>
    </main>
  );
}