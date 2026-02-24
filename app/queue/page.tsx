export default function Page() {
  return (
    <main className="min-h-screen bg-[#E8E0D4] flex flex-col items-center justify-start pt-16">
      
      {/* ロゴ */}
      <img
        src="/logo.png"
        alt="クラウン商会"
        className="w-32 h-32 mb-10"
      />

      {/* QR縦並び */}
      <div className="flex flex-col items-center gap-8">

        <div className="flex flex-col items-center">
          <img
            src="/qr/queue.png"
            alt="行列ウォッチ"
            className="w-24 h-24"
          />
          <div className="text-xs mt-2 text-zinc-700">行列ウォッチ</div>
        </div>

        <div className="flex flex-col items-center">
          <img
            src="/qr/kondake.png"
            alt="こんだけ"
            className="w-24 h-24 opacity-40"
          />
          <div className="text-xs mt-2 text-zinc-500">こんだけ</div>
        </div>

        <div className="flex flex-col items-center">
          <img
            src="/qr/pg.png"
            alt="PG"
            className="w-24 h-24 opacity-40"
          />
          <div className="text-xs mt-2 text-zinc-500">PG</div>
        </div>

      </div>

    </main>
  );
}