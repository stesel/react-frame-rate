import { useRef } from "react";
import { createFrameRateManager } from "./FrameRateManager";
import type { FrameRateManager } from "./FrameRateManager";

export function useFrameRateManager(): FrameRateManager {
    return useRef<FrameRateManager>(createFrameRateManager()).current;
}
