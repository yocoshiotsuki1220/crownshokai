import Image from "next/image";

export default function Home() {
  return (
    <main style={{
      background: "#E8E0D4",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>

      <Image
        src="/logo.png"
        alt="logo"
        width={140}
        height={140}
        priority
        style={{ marginBottom: 40 }}
      />

      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 28,
        alignItems: "center",
      }}>

        <a href="https://queue.crownshokai.jp">
          <Image src="/qr/queue.png" alt="queue" width={64} height={64} />
        </a>

        <a href="https://kondake.crownshokai.jp" style={{ opacity: 0.5 }}>
          <Image src="/qr/kondake.png" alt="kondake" width={64} height={64} />
        </a>

        <a href="https://pg.crownshokai.jp" style={{ opacity: 0.5 }}>
          <Image src="/qr/pg.png" alt="pg" width={64} height={64} />
        </a>

      </div>

    </main>
  );
}
