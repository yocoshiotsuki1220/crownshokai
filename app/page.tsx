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
          <div
            style={{
              marginTop: "6px",
              fontSize: "12px",
              color: "#666",
              letterSpacing: "0.02em",
            }}
          >
            見かけたら、教えてね
          </div>
        </Link>

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
          <div
            style={{
              marginTop: "6px",
              fontSize: "12px",
              color: "#666",
              letterSpacing: "0.02em",
            }}
          >
            なにしてた？
          </div>
        </Link>

        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "132px",
              height: "132px",
              background: "#EFE7DB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#888",
              fontSize: "12px",
              letterSpacing: "0.04em",
            }}
          >
            coming soon
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
          <div
            style={{
              marginTop: "6px",
              fontSize: "12px",
              color: "#666",
              letterSpacing: "0.02em",
            }}
          >
            どこ行ってた？
          </div>
        </div>
      </div>
    </main>
  );
}