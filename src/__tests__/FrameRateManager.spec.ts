import { createFrameRateManager, FrameRateManager } from "../frameRateManager/FrameRateManager";

describe("FrameRateManager", () => {

    const defaultFrameDuration = 1000 / 60;

    const requestAnimationFrameSpy = jest.spyOn(
        window,
        "requestAnimationFrame",
    );

    const cancelAnimationFrameSpy = jest.spyOn(
        window,
        "cancelAnimationFrame",
    );

    let frameRateManager: FrameRateManager;

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    beforeEach(() => {
        requestAnimationFrameSpy.mockClear();
        cancelAnimationFrameSpy.mockClear();
        frameRateManager = createFrameRateManager();
    });

    it("should update callback", () => {
        const callbackSpy = jest.fn();

        frameRateManager.updateCallback(callbackSpy);
        frameRateManager.updateAnimation(true);

        jest.runTimersToTime(defaultFrameDuration);

        expect(callbackSpy).toHaveBeenCalled();
    });

    it("should update frameRate", () => {
        const frameRate = 60;
        const callbackSpy = jest.fn();

        frameRateManager.updateCallback(callbackSpy);
        frameRateManager.updateFrameRate(frameRate);
        frameRateManager.updateAnimation(true);

        jest.runTimersToTime(1000 / frameRate);

        expect(callbackSpy).toHaveBeenCalledTimes(1);
    });

    it("should start animation", () => {
        const frameRate = 60;
        const callbackSpy = jest.fn();

        frameRateManager.updateCallback(callbackSpy);
        frameRateManager.updateAnimation(true);

        jest.runTimersToTime(1000 / frameRate);

        expect(requestAnimationFrameSpy).toHaveBeenCalled();
        expect(callbackSpy).toHaveBeenCalledTimes(1);
    });

    it("should stop animation", () => {
        frameRateManager.updateAnimation(true);
        frameRateManager.updateAnimation(false);

        expect(cancelAnimationFrameSpy).toHaveBeenCalled();

        frameRateManager.updateAnimation(false);

        expect(cancelAnimationFrameSpy).toHaveBeenCalledTimes(1);
    });

    it("should not stop not started animation", () => {
        const frameRate = 60;
        const callbackSpy = jest.fn();

        frameRateManager.updateCallback(callbackSpy);
        frameRateManager.updateAnimation(false);

        jest.runTimersToTime(1000 / frameRate);

        expect(callbackSpy).not.toHaveBeenCalled();
        expect(cancelAnimationFrameSpy).not.toHaveBeenCalled();
    });

});
