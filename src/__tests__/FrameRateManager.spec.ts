import {
  createFrameRateManager,
  FrameRateManager,
} from "../frameRateManager/FrameRateManager";
import { toFrameDuration } from "../frameRateManager/toFrameDuration";

describe("FrameRateManager", () => {
  const defaultFrameDuration = toFrameDuration(60);

  let frameRateManager: FrameRateManager;

  const originalRequestAnimationFrame = global.requestAnimationFrame;
  const originalCancelAnimationFrame = global.cancelAnimationFrame;

  const nowMock = jest.fn<number, []>();

  const requestAnimationFrameMock = jest.fn(
    (callback: (time: number) => void) => {
      const now = nowMock();
      return window.setTimeout(callback, 1, now);
    }
  );

  const cancelAnimationFrameMock = jest.fn((id: number) => {
    window.clearTimeout(id);
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.resetAllMocks();
    jest.useRealTimers();
  });

  beforeEach(() => {
    global.requestAnimationFrame = requestAnimationFrameMock;
    global.cancelAnimationFrame = cancelAnimationFrameMock;
    nowMock.mockReturnValue(defaultFrameDuration);
    frameRateManager = createFrameRateManager();
  });

  afterEach(() => {
    global.requestAnimationFrame = originalRequestAnimationFrame;
    global.cancelAnimationFrame = originalCancelAnimationFrame;
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("should update callback with time", () => {
    const callbackSpy = jest.fn();

    nowMock.mockReturnValue(defaultFrameDuration);

    frameRateManager.updateCallback(callbackSpy);

    frameRateManager.updateAnimation(true);

    jest.advanceTimersByTime(defaultFrameDuration);

    expect(callbackSpy).toHaveBeenNthCalledWith(1, defaultFrameDuration);

    nowMock.mockReturnValue(defaultFrameDuration * 2);

    jest.advanceTimersByTime(defaultFrameDuration);

    expect(callbackSpy).toHaveBeenNthCalledWith(2, defaultFrameDuration * 2);
  });

  it("should update frameRate", () => {
    const frameRate = 30;
    const callbackSpy = jest.fn();

    const duration = toFrameDuration(frameRate);
    nowMock.mockReturnValue(duration);

    frameRateManager.updateCallback(callbackSpy);
    frameRateManager.updateFrameRate(frameRate);
    frameRateManager.updateAnimation(true);

    jest.advanceTimersByTime(duration);

    expect(callbackSpy).toHaveBeenCalledTimes(1);
  });

  it("should start animation", () => {
    const callbackSpy = jest.fn();

    frameRateManager.updateCallback(callbackSpy);
    frameRateManager.updateAnimation(true);

    jest.advanceTimersByTime(defaultFrameDuration);

    expect(callbackSpy).toHaveBeenCalledTimes(1);
  });

  it("should stop animation", () => {
    const callbackSpy = jest.fn();

    frameRateManager.updateCallback(callbackSpy);
    frameRateManager.updateAnimation(true);
    frameRateManager.updateAnimation(false);

    jest.advanceTimersByTime(defaultFrameDuration);

    expect(callbackSpy).not.toHaveBeenCalled();
  });

  it("should not stop not started animation", () => {
    const callbackSpy = jest.fn();

    frameRateManager.updateCallback(callbackSpy);
    frameRateManager.updateAnimation(false);

    jest.advanceTimersByTime(defaultFrameDuration);

    expect(callbackSpy).not.toHaveBeenCalled();
  });
});
