import { useTranslation } from "react-i18next";
import { useAppStore } from "../../lib/store";

export function QueueView() {
  const { t } = useTranslation();
  const jobs = useAppStore((state) => state.jobs);

  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">{t("queue")}</h2>
      {jobs.length === 0 ? (
        <p className="text-sm text-slate-500">{t("emptyQueue")}</p>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <div className="rounded-xl border border-slate-200 p-3" key={job.id}>
              <div className="flex items-center justify-between">
                <span className="truncate text-sm text-slate-700">{job.inputPath}</span>
                <span className="text-xs uppercase text-slate-500">{job.status}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full bg-accent" style={{ width: `${job.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

