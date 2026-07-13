import { invoke } from "@tauri-apps/api/core";
import { ListOrdered, MousePointerClick, WandSparkles } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function Sidebar() {
  const { t } = useTranslation();
  const [integrationMessage, setIntegrationMessage] = useState<string>();

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  async function installContextMenu() {
    try {
      await invoke("install_context_menu");
      setIntegrationMessage(t("contextMenuInstalled"));
    } catch (reason) {
      setIntegrationMessage(String(reason));
    }
  }

  return (
    <aside className="flex w-64 flex-col gap-3 border-r border-slate-200 bg-white p-4">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Offline-first</p>
        <h1 className="text-2xl font-semibold text-ink">{t("appName")}</h1>
      </div>
      <nav className="mt-4 flex flex-col gap-2">
        <button
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100"
          onClick={() => scrollTo("convert")}
          type="button"
        >
          <WandSparkles className="h-4 w-4" />
          {t("convert")}
        </button>
        <button
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100"
          onClick={() => scrollTo("queue")}
          type="button"
        >
          <ListOrdered className="h-4 w-4" />
          {t("queue")}
        </button>
        <button
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100"
          onClick={() => void installContextMenu()}
          type="button"
        >
          <MousePointerClick className="h-4 w-4" />
          {t("installContextMenu")}
        </button>
      </nav>
      {integrationMessage && <p className="mt-2 text-xs leading-5 text-slate-500">{integrationMessage}</p>}
    </aside>
  );
}
