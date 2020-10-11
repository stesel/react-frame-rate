export class FrameRateManager {
    private static oneSec = 1000;
    private static defaultFrameRate = 60;

    private frameId = 0;
    private frameDuration = FrameRateManager.oneSec / FrameRateManager.defaultFrameRate;
    private lastFrameTime = 0;
    private callback: (() => void) | undefined;

    public updateCallback = (callback: () => void) => {
        this.callback = callback;
    }

    public updateFrameRate = (frameRate: number) => {
        this.frameDuration = FrameRateManager.oneSec / frameRate;
    }

    public updateAnimation = (isAnimating: boolean) => {
        if (isAnimating) {
            this.startAnimation();
        } else {
            this.stopAnimation();
        }
    }

    private startAnimation = () => {
        this.lastFrameTime = 0;
        this.frameId = window.requestAnimationFrame(this.playAnimation);
    }

    private playAnimation = (time: number) => {
        this.update(time);
        this.frameId = window.requestAnimationFrame(this.playAnimation);
    }

    private stopAnimation = () => {
        if (this.frameId) {
            window.cancelAnimationFrame(this.frameId);
            this.frameId = 0;
        }
    }

    private tick = () => {
        if (this.callback) {
            this.callback();
        }
    }

    private update = (time: number) => {
        if (time - this.lastFrameTime >= this.frameDuration) {
            this.tick();
            this.lastFrameTime = time;
        }
    }
}
