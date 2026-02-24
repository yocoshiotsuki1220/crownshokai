import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#F3EFE6] text-[#0A0A0C]">
      <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-12">
        <img
          src="/logo.png"
          alt="クラウン商会"
          className="mb-6 h-28 w-28"
        />

        <h1 className="mb-2 text-xl font-semibold tracking-wide">クラウン商会</h1>
        <p className="mb-8 text-sm opacity-70">入口</p>

        <Link
          href="/queue"
          className="rounded-2xl border border-black/10 bg-white px-4 py-4 text-center text-base font-medium shadow-sm transition hover:shadow"
        >
          行列ウォッチへ
        </Link>
      </div>
    </main>
  );
}