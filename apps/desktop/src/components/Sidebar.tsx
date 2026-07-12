import { History, ListOrdered, Settings, SlidersHorizontal, WandSparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

const items = [
  { key: "convert", icon: WandSparkles },
  { key: "queue", icon: ListOrdered },
  { key: "presets", icon: SlidersHorizontal },
  { key: "history", icon: History },
  { key: "settings", icon: Settings },
] as const;

export function Sidebar() {
  const { t } = useTranslation();

  return (
    <aside className="flex w-64 flex-col gap-3 border-r border-slate-200 bg-white p-4">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Offline-first</p>
        <h1 className="text-2xl font-semibold text-ink">{t("appName")}</h1>
      </div>
      <nav className="mt-4 flex flex-col gap-2">
        {items.map(({ key, icon: Icon }) => (
          <button
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100"
            key={key}
            type="button"
          >
            <Icon className="h-4 w-4" />
            {t(key)}
          </button>
        ))}
      </nav>
    </aside>
  );
}

