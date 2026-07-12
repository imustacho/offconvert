export type MediaCategory = "image" | "video" | "audio";

export interface ConversionJob {
  id: string;
  inputPath: string;
  outputPath?: string;
  sourceFormat?: string;
  targetFormat: string;
  presetId?: string;
  status: "pending" | "inspecting" | "ready" | "processing" | "completed" | "failed" | "cancelled";
  progress: number;
  currentStep?: string;
  createdAt: string;
}

export interface MediaFile {
  path: string;
  detectedFormat: string;
  category: MediaCategory;
}

