import { open } from "@tauri-apps/plugin-dialog";
import { invoke } from "@tauri-apps/api/core";
import { useTranslation } from "react-i18next";
import { useAppStore } from "../../lib/store";
import type { ConversionJob, MediaFile } from "../../lib/types";

export function ConvertView() {
  const { t } = useTranslation();
  const { files, targetFormat, presetId, addFiles, setTargetFormat, setPresetId, addJobs } = useAppStore();

  async function handleSelectFiles() {
    const selected = await open({ multiple: true });
    if (!selected || !Array.isArray(selected)) {
      return;
    }

    const inspected = await invoke<MediaFile[]>("inspect_files", { paths: selected });
    addFiles(inspected);
  }

  async function handleConvert() {
    const jobs = await invoke<ConversionJob[]>("queue_conversion", {
      request: {
        inputPaths: files.map((file) => file.path),
        targetFormat,
        presetId,
        outputDirectory: null,
        overwritePolicy: "rename",
        options: {},
      },
    });
    addJobs(jobs);
  }

  return (
    <section className="flex flex-1 flex-col gap-6 p-6">
      <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-white p-10 text-center">
        <p className="text-lg font-medium text-ink">{t("dropFiles")}</p>
        <button
          className="mt-4 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white"
          onClick={() => void handleSelectFiles()}
          type="button"
        >
          {t("selectFiles")}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="rounded-2xl bg-white p-4 shadow-sm">
          <span className="mb-2 block text-sm text-slate-500">{t("targetFormat")}</span>
          <select
            className="w-full rounded-xl border border-slate-200 px-3 py-2"
            onChange={(event) => setTargetFormat(event.target.value)}
            value={targetFormat}
          >
            <option value="jpg">JPG</option>
            <option value="webp">WebP</option>
            <option value="mp4">MP4</option>
            <option value="mp3">MP3</option>
          </select>
        </label>

        <label className="rounded-2xl bg-white p-4 shadow-sm">
          <span className="mb-2 block text-sm text-slate-500">{t("preset")}</span>
          <select
            className="w-full rounded-xl border border-slate-200 px-3 py-2"
            onChange={(event) => setPresetId(event.target.value)}
            value={presetId ?? ""}
          >
            <option value="">Default</option>
            <option value="image-balanced">Image Balanced</option>
            <option value="video-balanced">Video Balanced</option>
            <option value="audio-voice">Audio Voice</option>
          </select>
        </label>

        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <span className="mb-2 block text-sm text-slate-500">Files</span>
          <p className="text-2xl font-semibold text-ink">{files.length}</p>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Detected files</h2>
        <div className="space-y-2">
          {files.map((file) => (
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2" key={file.path}>
              <span className="truncate text-sm text-slate-700">{file.path}</span>
              <span className="rounded-full bg-accentSoft px-2 py-1 text-xs text-accent">{file.detectedFormat}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        className="w-fit rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
        onClick={() => void handleConvert()}
        type="button"
      >
        {t("convertNow")}
      </button>
    </section>
  );
}
