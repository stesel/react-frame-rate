import { createFrameRateManager, FrameRateManager } from "../frameRateManager/FrameRateManager";

describe("FrameRateManager", () => {
    const defaultFrameDuration = 1000 / 60;

    let frameRateManager: FrameRateManager;

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    beforeEach(() => {
        frameRateManager = createFrameRateManager();
    });

    it("should update callback", () => {
        const callbackSpy = jest.fn();

        frameRateManager.updateCallback(callbackSpy);
        frameRateManager.updateAnimation(true);

        jest.advanceTimersByTime(defaultFrameDuration);

        expect(callbackSpy).toBeCalled();
    });

    it("should update frameRate", () => {
        const frameRate = 60;
        const callbackSpy = jest.fn();

        frameRateManager.updateCallback(callbackSpy);
        frameRateManager.updateFrameRate(frameRate);
        frameRateManager.updateAnimation(true);

        jest.advanceTimersByTime(1000 / frameRate);

        expect(callbackSpy).toBeCalledTimes(1);
    });

    it("should start animation", () => {
        const frameRate = 60;
        const callbackSpy = jest.fn();

        frameRateManager.updateCallback(callbackSpy);
        frameRateManager.updateAnimation(true);

        jest.advanceTimersByTime(1000 / frameRate);

        expect(callbackSpy).toBeCalledTimes(1);
    });

    it( "should stop animation", () => {
        const frameRate = 60;
        const callbackSpy = jest.fn();

        frameRateManager.updateCallback(callbackSpy);
        frameRateManager.updateAnimation(true);
        frameRateManager.updateAnimation( false );
        
        jest.advanceTimersByTime(1000 / frameRate);

        expect(callbackSpy).not.toBeCalled();
    });

    it("should not stop not started animation", () => {
        const frameRate = 60;
        const callbackSpy = jest.fn();

        frameRateManager.updateCallback(callbackSpy);
        frameRateManager.updateAnimation(false);

        jest.advanceTimersByTime(1000 / frameRate);

        expect(callbackSpy).not.toBeCalled();
    });

});
