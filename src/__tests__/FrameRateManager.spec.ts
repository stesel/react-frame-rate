import { FrameRateManager } from "../frameRateManager/FrameRateManager";

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
        requestAnimationFrameSpy.mockClear();
        cancelAnimationFrameSpy.mockClear();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    beforeEach(() => {
        frameRateManager = new FrameRateManager();
    });

    it("should update callback", () => {
        const callbackSpy = jest.fn();

        frameRateManager.updateCallback(callbackSpy);
        frameRateManager.updateAnimation(true);

        jest.runTimersToTime(defaultFrameDuration);

        expect(callbackSpy).toHaveBeenCalled();
    });

    it("should update frameRate", () => {
        const frameRate = 15;
        const callbackSpy = jest.fn();

        frameRateManager.updateCallback(callbackSpy);
        frameRateManager.updateFrameRate(frameRate);
        frameRateManager.updateAnimation(true);

        jest.runTimersToTime(1000 / frameRate);

        expect(callbackSpy).toHaveBeenCalledTimes(1);
    });

    it("should start animation", () => {
        frameRateManager.updateAnimation(true);

        expect(requestAnimationFrameSpy).toHaveBeenCalled();
    });

    it("should stop animation", () => {
        frameRateManager.updateAnimation(true);
        frameRateManager.updateAnimation(false);

        expect(cancelAnimationFrameSpy).toHaveBeenCalled();
    });

});
