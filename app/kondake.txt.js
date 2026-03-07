"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type IconDef = { id: string; emoji: string; label: string };
type Post = { id: string; iconId: string; text: string; author: string; createdAt: number };

const STORAGE_POSTS = "kondake.posts.v1";
const STORAGE_AUTHOR = "kondake.author.v1";
const STORAGE_RECENTS = "kondake.iconRecents.v1";
const STORAGE_LAST_ICON = "kondake.lastIcon.v1";
const STORAGE_DRAFT = "kondake.draft.v1";

const ICONS: IconDef[] = [
  { id: "fire", emoji: "🔥", label: "熱" },
  { id: "sparkles", emoji: "✨", label: "きら" },
  { id: "eyes", emoji: "👀", label: "見た" },
  { id: "note", emoji: "📝", label: "メモ" },
  { id: "idea", emoji: "💡", label: "ひらめき" },
  { id: "moon", emoji: "🌙", label: "夜" },
  { id: "coffee", emoji: "☕", label: "コーヒー" },
  { id: "beer", emoji: "🍺", label: "酒" },
  { id: "cat", emoji: "🐈", label: "猫" },
  { id: "bike", emoji: "🏍️", label: "バイク" },
  { id: "food", emoji: "🍜", label: "飯" },
  { id: "mikan", emoji: "🍊", label: "柑" },
  { id: "smoke", emoji: "🚬", label: "煙" },
  { id: "snow", emoji: "❄️", label: "雪" },
  { id: "music", emoji: "🎧", label: "音" },
  { id: "ok", emoji: "👌", label: "OK" },
  { id: "question", emoji: "❓", label: "?" },
  { id: "home", emoji: "🏠", label: "家" },
  { id: "shop", emoji: "🛒", label: "買" },
  { id: "sun", emoji: "☀️", label: "朝" },
  { id: "cloud", emoji: "☁️", label: "曇" },
  { id: "rain", emoji: "🌧️", label: "雨" },
  { id: "wind", emoji: "🌬️", label: "風" },
  { id: "tree", emoji: "🌳", label: "木" },
  { id: "flower", emoji: "🌸", label: "花" },
  { id: "book", emoji: "📚", label: "本" },
  { id: "pen", emoji: "✒️", label: "書" },
  { id: "pc", emoji: "💻", label: "PC" },
  { id: "phone", emoji: "📱", label: "電" },
  { id: "train", emoji: "🚃", label: "電車" },
  { id: "walk", emoji: "🚶", label: "歩" },
  { id: "run", emoji: "🏃", label: "走" },
  { id: "sleep", emoji: "😴", label: "眠" },
  { id: "heart", emoji: "🤍", label: "心" },
  { id: "star", emoji: "⭐", label: "星" },
  { id: "camera", emoji: "📷", label: "写" },
  { id: "clock", emoji: "⏰", label: "時" },
  { id: "money", emoji: "💴", label: "金" },
  { id: "gift", emoji: "🎁", label: "贈" },
  { id: "tea", emoji: "🍵", label: "茶" },
  { id: "bread", emoji: "🍞", label: "パン" },
  { id: "leaf", emoji: "🍃", label: "葉" },
];

const uid = () => {
  const c: any = globalThis as any;
  if (c?.crypto?.randomUUID) return c.crypto.randomUUID();
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

const safeParse = <T,>(s: string | null, fallback: T): T => {
  try { return s ? (JSON.parse(s) as T) : fallback; } catch { return fallback; }
};

const ago = (t: number) => {
  const m = Math.floor((Date.now() - t) / 60000);
  if (m < 1) return "いま";
  if (m < 60) return `${m}分前`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}時間前`;
  const d = Math.floor(h / 24);
  return `${d}日前`;
};

function clampRecents(ids: string[], max = 8) {
  const uniq: string[] = [];
  for (const id of ids) if (!uniq.includes(id)) uniq.push(id);
  return uniq.slice(0, max);
}

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("@me");

  const [iconId, setIconId] = useState(ICONS[0].id);
  const [recents, setRecents] = useState<string[]>([
    "note","eyes","idea","coffee","cat","bike","food","moon",
  ]);

  const [pickerOpen, setPickerOpen] = useState(false);
  const [menuFor, setMenuFor] = useState<string | null>(null);

  const undoRef = useRef<{ post: Post; timer: number } | null>(null);
  const [undoToast, setUndoToast] = useState<null | { id: string; label: string }>(null);

  const iconMap = useMemo(() => {
    const m: Record<string, IconDef> = {};
    for (const i of ICONS) m[i.id] = i;
    return m;
  }, []);

  useEffect(() => {
    setPosts(safeParse<Post[]>(localStorage.getItem(STORAGE_POSTS), []));
    const a = localStorage.getItem(STORAGE_AUTHOR);
    if (a) setAuthor(a);

    const r = safeParse<string[]>(localStorage.getItem(STORAGE_RECENTS), recents);
    setRecents(clampRecents(r));

    const last = localStorage.getItem(STORAGE_LAST_ICON);
    if (last && iconMap[last]) setIconId(last);

    const draft = localStorage.getItem(STORAGE_DRAFT);
    if (draft) setText(draft);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { localStorage.setItem(STORAGE_POSTS, JSON.stringify(posts)); }, [posts]);
  useEffect(() => { localStorage.setItem(STORAGE_AUTHOR, author); }, [author]);
  useEffect(() => { localStorage.setItem(STORAGE_RECENTS, JSON.stringify(recents)); }, [recents]);
  useEffect(() => { localStorage.setItem(STORAGE_LAST_ICON, iconId); }, [iconId]);
  useEffect(() => { localStorage.setItem(STORAGE_DRAFT, text); }, [text]);

  const chooseIcon = (id: string) => {
    setIconId(id);
    setRecents((prev) => clampRecents([id, ...prev]));
  };

  const submit = () => {
    const newPost: Post = { id: uid(), iconId, text: text.trim(), author, createdAt: Date.now() };
    setPosts((prev) => [newPost, ...prev]);
    setText("");
    setMenuFor(null);
  };

  const deleteWithUndo = (id: string) => {
    const target = posts.find((p) => p.id === id);
    if (!target) return;

    if (undoRef.current) {
      window.clearTimeout(undoRef.current.timer);
      undoRef.current = null;
      setUndoToast(null);
    }

    setPosts((prev) => prev.filter((p) => p.id !== id));
    setMenuFor(null);

    setUndoToast({ id, label: "削除しました" });

    const timer = window.setTimeout(() => {
      undoRef.current = null;
      setUndoToast(null);
    }, 4500);

    undoRef.current = { post: target, timer };
  };

  const undo = () => {
    if (!undoRef.current) return;
    window.clearTimeout(undoRef.current.timer);
    const { post } = undoRef.current;
    undoRef.current = null;
    setUndoToast(null);
    setPosts((prev) => [post, ...prev]);
  };

  const onComposerKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  };

  return (
    <main className="bg-black text-white min-h-[100dvh] flex justify-center">
      <div className="w-full max-w-[430px] min-h-[100dvh] flex flex-col relative">
        <div className="px-4 pt-4 pb-3 border-b border-neutral-800 flex items-center justify-between">
          <h1 className="text-lg font-semibold">こんだけ</h1>
          <div className="text-xs text-neutral-500 select-none">置くだけ</div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {posts.length === 0 ? (
            <div className="text-sm text-neutral-500 pt-6 leading-relaxed">
              まだ何もない。<br />
              下でアイコンを選んで、ひとこと置いていく。
            </div>
          ) : (
            posts.map((p) => {
              const icon = iconMap[p.iconId]?.emoji ?? "•";
              const open = menuFor === p.id;
              return (
                <div key={p.id} className="bg-neutral-900 rounded-2xl p-3">
                  <div className="flex gap-3">
                    <div className="text-xl leading-none pt-[2px]">{icon}</div>
                    <button
                      type="button"
                      className="min-w-0 text-left flex-1"
                      onClick={() => setMenuFor((cur) => (cur === p.id ? null : p.id))}
                      aria-label="メニューを開く"
                    >
                      <div className="whitespace-pre-wrap break-words text-[15px] leading-relaxed">
                        {p.text ? p.text : <span className="text-neutral-500">（無言）</span>}
                      </div>
                      <div className="text-xs text-neutral-500 mt-2">{ago(p.createdAt)}</div>
                    </button>
                  </div>

                  {open && (
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        className="px-3 py-2 rounded-xl bg-neutral-800 text-sm"
                        onClick={() => {
                          const next = prompt("表示名（例：@me）", author);
                          if (next !== null) setAuthor(next.trim() || "@me");
                          setMenuFor(null);
                        }}
                      >
                        名義
                      </button>
                      <button
                        type="button"
                        className="px-3 py-2 rounded-xl bg-neutral-800 text-sm"
                        onClick={() => deleteWithUndo(p.id)}
                      >
                        削除
                      </button>
                      <button
                        type="button"
                        className="ml-auto px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-sm"
                        onClick={() => setMenuFor(null)}
                      >
                        閉じる
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="border-t border-neutral-800 bg-black px-4 pt-3 pb-4">
          <div className="flex items-center gap-2 mb-3">
            <button
              type="button"
              onClick={() => setPickerOpen(true)}
              className="h-10 w-10 rounded-full border border-neutral-700 bg-neutral-900 flex items-center justify-center"
              aria-label="アイコン一覧"
              title="アイコン一覧"
            >
              ＋
            </button>

            <div className="flex-1 overflow-x-auto">
              <div className="flex gap-2 w-max pr-2">
                {recents.filter((id) => iconMap[id]).map((id) => {
                  const i = iconMap[id];
                  const active = iconId === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => chooseIcon(id)}
                      className={`h-10 w-10 rounded-full border flex items-center justify-center ${
                        active ? "border-neutral-200 bg-neutral-900" : "border-neutral-700 bg-neutral-900"
                      }`}
                      aria-label={i.label}
                      title={i.label}
                    >
                      {i.emoji}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="text-xs text-neutral-500 select-none">Ctrl+Enterで置く</div>
          </div>

          <div className="flex gap-2">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={onComposerKeyDown}
              rows={2}
              placeholder="ひとこと（空でもOK）"
              className="flex-1 resize-none rounded-2xl bg-neutral-900 px-3 py-3 outline-none text-[15px] leading-relaxed"
            />
            <button
              type="button"
              onClick={submit}
              className="px-4 rounded-2xl bg-white text-black font-medium"
            >
              置く
            </button>
          </div>
        </div>

        {pickerOpen && (
          <div className="absolute inset-0 bg-black/60 flex items-end" onClick={() => setPickerOpen(false)}>
            <div
              className="w-full max-w-[430px] bg-neutral-950 border-t border-neutral-800 rounded-t-3xl p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-semibold">アイコン</div>
                <button
                  type="button"
                  className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-sm"
                  onClick={() => setPickerOpen(false)}
                >
                  閉じる
                </button>
              </div>

              <div className="grid grid-cols-8 gap-2 max-h-[52vh] overflow-y-auto pb-2">
                {ICONS.map((i) => {
                  const active = iconId === i.id;
                  return (
                    <button
                      key={i.id}
                      type="button"
                      onClick={() => {
                        chooseIcon(i.id);
                        setPickerOpen(false);
                      }}
                      className={`h-10 w-10 rounded-full border flex items-center justify-center ${
                        active ? "border-neutral-200 bg-neutral-900" : "border-neutral-700 bg-neutral-900"
                      }`}
                      aria-label={i.label}
                      title={i.label}
                    >
                      {i.emoji}
                    </button>
                  );
                })}
              </div>

              <div className="text-xs text-neutral-500 mt-2">最近使ったアイコンは下の列に出る。</div>
            </div>
          </div>
        )}

        {undoToast && (
          <div className="absolute left-0 right-0 bottom-24 flex justify-center px-4">
            <div className="w-full max-w-[430px] bg-neutral-900 border border-neutral-800 rounded-2xl px-4 py-3 flex items-center gap-3">
              <div className="text-sm text-neutral-200">{undoToast.label}</div>
              <button
                type="button"
                onClick={undo}
                className="ml-auto px-3 py-2 rounded-xl bg-white text-black text-sm font-medium"
              >
                取り消し
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}