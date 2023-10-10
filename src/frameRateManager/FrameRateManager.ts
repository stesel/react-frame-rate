import { toFrameDuration } from "./toFrameDuration";

export interface FrameRateManager {
  updateCallback(callback: (time: number) => void): void;
  updateFrameRate(frameRate: number): void;
  updateAnimation(isAnimating: boolean): void;
}

class FrameRateManagerClass implements FrameRateManager {
  private static defaultFrameRate = 60;

  private frameId = 0;
  private frameDuration = toFrameDuration(
    FrameRateManagerClass.defaultFrameRate
  );
  private lastFrameTime = 0;
  private callback: ((time: number) => void) | undefined;

  public updateCallback = (callback: (time: number) => void) => {
    this.callback = callback;
  };

  public updateFrameRate = (frameRate: number) => {
    this.frameDuration = toFrameDuration(frameRate);
  };

  public updateAnimation = (isAnimating: boolean) => {
    if (isAnimating) {
      this.startAnimation();
    } else {
      this.stopAnimation();
    }
  };

  private startAnimation = () => {
    this.lastFrameTime = 0;
    this.frameId = window.requestAnimationFrame(this.playAnimation);
  };

  private playAnimation = (time: number) => {
    this.update(time);
    this.frameId = window.requestAnimationFrame(this.playAnimation);
  };

  private stopAnimation = () => {
    if (this.frameId) {
      window.cancelAnimationFrame(this.frameId);
      this.frameId = 0;
    }
  };

  private tick = (time: number) => {
    if (this.callback) {
      this.callback(time);
    }
  };

  private update = (time: number) => {
    if (time - this.lastFrameTime >= this.frameDuration) {
      this.tick(time);
      this.lastFrameTime = time;
    }
  };
}

export function createFrameRateManager() {
  return new FrameRateManagerClass();
}
