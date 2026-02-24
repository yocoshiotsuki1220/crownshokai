import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#F3EFE6] text-[#0A0A0C]">
      <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-12">
        {/* ロゴ */}
        <div className="mb-6 flex items-center justify-center">
          {/* public/logo.png を置く */}
          <img
            src="/logo.png"
            alt="クラウン商会"
            className="h-28 w-28 rounded-full"
          />
        </div>

        <h1 className="mb-2 text-xl font-semibold tracking-wide">クラウン商会</h1>
        <p className="mb-8 text-sm opacity-70">
          “見るだけで成立する” 小さな道具たち
        </p>

        {/* 入口ボタン */}
        <div className="mb-10 flex w-full flex-col gap-3">
          <Link
            href="/queue"
            className="rounded-2xl border border-black/10 bg-white px-4 py-4 text-center text-base font-medium shadow-sm transition hover:shadow"
          >
            行列ウォッチへ
          </Link>

          {/* 後で追加する用：/pg /kondake など */}
          <div className="rounded-2xl border border-black/10 bg-white/60 px-4 py-4 text-center text-sm opacity-70">
            （他のアプリは後で増やす）
          </div>
        </div>

        {/* QR（縦スクロール枠） */}
        <section className="w-full">
          <h2 className="mb-3 text-sm font-medium opacity-80">QR</h2>
          <div className="h-56 w-full overflow-y-auto rounded-2xl border border-black/10 bg-white p-4">
            <div className="flex flex-col items-center gap-6">
              <QrItem label="行列ウォッチ" src="/qr/queue.png" />
              {/* 必要なら増やす */}
              {/* <QrItem label="PG" src="/qr/pg.png" /> */}
              {/* <QrItem label="こんだけ" src="/qr/kondake.png" /> */}
            </div>
          </div>
          <p className="mt-3 text-xs opacity-60">
            ※ ここでは「自動で飛ばす」はしない（無限ループ防止）
          </p>
        </section>
      </div>
    </main>
  );
}

function QrItem({ label, src }: { label: string; src: string }) {
  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-2">
      <div className="text-sm font-medium">{label}</div>
      <img
        src={src}
        alt={`${label} QR`}
        className="h-40 w-40 rounded-xl border border-black/10 bg-white p-2"
      />
    </div>
  );
}