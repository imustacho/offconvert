import { create } from "zustand";
import type { ConversionJob, MediaFile } from "./types";

interface AppState {
  files: MediaFile[];
  jobs: ConversionJob[];
  targetFormat: string;
  presetId?: string;
  addFiles: (files: MediaFile[]) => void;
  setTargetFormat: (format: string) => void;
  setPresetId: (presetId: string) => void;
  addJobs: (jobs: ConversionJob[]) => void;
  updateJob: (job: ConversionJob) => void;
}

export const useAppStore = create<AppState>((set) => ({
  files: [],
  jobs: [],
  targetFormat: "jpg",
  addFiles: (files) => set((state) => ({ files: [...state.files, ...files] })),
  setTargetFormat: (targetFormat) => set({ targetFormat }),
  setPresetId: (presetId) => set({ presetId }),
  addJobs: (jobs) => set((state) => ({ jobs: [...jobs, ...state.jobs] })),
  updateJob: (job) =>
    set((state) => ({
      jobs: state.jobs.map((item) => (item.id === job.id ? job : item)),
    })),
}));

