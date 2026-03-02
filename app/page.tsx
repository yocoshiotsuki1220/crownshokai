import Image from "next/image";
import Link from "next/link";

const BG = "#E8E0D4"; // 生成り（今の仮）
const TEXT = "#0A0A0C"; // 黒
const BLUE = "#0047AB"; // コバルト

export default function Home() {
  return (
    <main
      style={{
        background: BG,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 20px",
      }}
    >
      {/* 双魚ロゴ（でかめ） */}
      <div style={{ marginBottom: "44px" }}>
        <Image
          src="/logo.png"
          alt="クラウン商会"
          width={320}
          height={320}
          priority
          style={{ display: "block" }}
        />
      </div>

      {/* QR群 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "34px",
          alignItems: "center",
          width: "100%",
          maxWidth: "520px",
        }}
      >
        {/* 行列ウォッチ */}
        <Link
          href="https://queue.crownshokai.jp"
          style={{
            textAlign: "center",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Image
            src="/qr/queue.png"
            alt="行列ウォッチ"
            width={132}
            height={132}
            style={{ display: "block" }}
          />
          <div
            style={{
              marginTop: "10px",
              fontSize: "14px",
              color: TEXT,
              letterSpacing: "0.02em",
            }}
          >
            行列ウォッチ
          </div>
        </Link>

        {/* こんだけ */}
        <Link
          href="https://kondake.crownshokai.jp"
          style={{
            textAlign: "center",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Image
            src="/qr/kondake.png"
            alt="こんだけ"
            width={132}
            height={132}
            style={{ display: "block" }}
          />
          <div
            style={{
              marginTop: "10px",
              fontSize: "14px",
              color: TEXT,
              letterSpacing: "0.02em",
            }}
          >
            こんだけ
          </div>
        </Link>

        {/* 今日どこ行った？（準備中） */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "132px",
              height: "132px",
              border: `2px dashed ${BLUE}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: BLUE,
              fontSize: "12px",
              userSelect: "none",
            }}
          >
            QR準備中
          </div>
          <div
            style={{
              marginTop: "10px",
              fontSize: "14px",
              color: TEXT,
              letterSpacing: "0.02em",
            }}
          >
            今日どこ行った？
          </div>
        </div>
      </div>
    </main>
  );
}
