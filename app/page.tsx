import Image from "next/image";

export default function Home() {
  return (
    <main
      style={{
        background: "#E8E0D4", // 生成り
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 16px",
      }}
    >
      {/* ロゴ（大きめ） */}
      <Image
        src="/logo.png"
        alt="クラウン商会"
        width={280}
        height={280}
        priority
        style={{ marginBottom: 64 }}
      />

      {/* QRだけ */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 28,
          alignItems: "center",
        }}
      >
        <a href="https://queue.crownshokai.jp" aria-label="行列ウォッチ">
          <Image src="/qr/queue.png" alt="" width={84} height={84} />
        </a>

        <a
          href="https://kondake.crownshokai.jp"
          aria-label="こんだけ"
          style={{ opacity: 0.5 }}
        >
          <Image src="/qr/kondake.png" alt="" width={84} height={84} />
        </a>

        <a
          href="https://pg.crownshokai.jp"
          aria-label="PointGathering"
          style={{ opacity: 0.5 }}
        >
          <Image src="/qr/pg.png" alt="" width={84} height={84} />
        </a>
      </div>
    </main>
  );
}