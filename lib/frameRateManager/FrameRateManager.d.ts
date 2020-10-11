export interface FrameRateManager {
    updateCallback(callback: () => void): void;
    updateFrameRate(frameRate: number): void;
    updateAnimation(isAnimating: boolean): void;
}
declare class FrameRateManagerClass implements FrameRateManager {
    private static oneSec;
    private static defaultFrameRate;
    private frameId;
    private frameDuration;
    private lastFrameTime;
    private callback;
    updateCallback: (callback: () => void) => void;
    updateFrameRate: (frameRate: number) => void;
    updateAnimation: (isAnimating: boolean) => void;
    private startAnimation;
    private playAnimation;
    private stopAnimation;
    private tick;
    private update;
}
export declare function createFrameRateManager(): FrameRateManagerClass;
export {};
