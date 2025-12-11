import type { Analysis } from "@/shared/model/types";

export interface UploadProps {
    onAnalysisReady: (analysis: Analysis) => void;
}