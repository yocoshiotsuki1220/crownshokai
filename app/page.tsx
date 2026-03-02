import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        background: "#E8E0D4",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      {/* ロゴ */}
      <Image
        src="/logo.png"
        alt="ロゴ"
        width={280}
        height={280}
        priority
        style={{ marginBottom: "70px" }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "50px",
          alignItems: "center",
        }}
      >
        {/* 行列ウォッチ */}
        <Link
          href="https://queue.crownshokai.jp"
          style={{ textAlign: "center", textDecoration: "none" }}
        >
          <Image src="/qr/queue.png" alt="行列ウォッチ" width={120} height={120} />
          <div style={{ marginTop: "10px", fontSize: "14px", color: "#0A0A0C" }}>
            行列ウォッチ
          </div>
        </Link>

        {/* こんだけ */}
        <Link
          href="https://kondake.crownshokai.jp"
          style={{ textAlign: "center", textDecoration: "none" }}
        >
          <Image src="/qr/kondake.png" alt="こんだけ" width={120} height={120} />
          <div style={{ marginTop: "10px", fontSize: "14px", color: "#0A0A0C" }}>
            こんだけ
          </div>
        </Link>

        {/* 今日どこ行った？（準備中：リンクなし） */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "120px",
              height: "120px",
              border: "2px dashed #0047AB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0047AB",
              fontSize: "12px",
            }}
          >
            QR準備中
          </div>
          <div style={{ marginTop: "10px", fontSize: "14px", color: "#0A0A0C" }}>
            今日どこ行った？
          </div>
        </div>
      </div>
    </main>
  );
}