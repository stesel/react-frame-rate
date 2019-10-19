"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FrameRateManager = /** @class */ (function () {
    function FrameRateManager() {
        var _this = this;
        this.frameId = 0;
        this.frameDuration = FrameRateManager.oneSec / FrameRateManager.defaultFrameRate;
        this.lastFrameTime = 0;
        this.updateCallback = function (callback) {
            _this.callback = callback;
        };
        this.updateFrameRate = function (frameRate) {
            _this.frameDuration = FrameRateManager.oneSec / frameRate;
        };
        this.updateAnimation = function (isAnimating) {
            if (isAnimating) {
                _this.startAnimation();
            }
            else {
                _this.stopAnimation();
            }
        };
        this.startAnimation = function () {
            _this.lastFrameTime = 0;
            _this.frameId = window.requestAnimationFrame(_this.playAnimation);
        };
        this.playAnimation = function (time) {
            _this.update(time);
            _this.frameId = window.requestAnimationFrame(_this.playAnimation);
        };
        this.stopAnimation = function () {
            if (_this.frameId) {
                window.cancelAnimationFrame(_this.frameId);
            }
        };
        this.tick = function () {
            if (_this.callback) {
                _this.callback();
            }
        };
        this.update = function (time) {
            if (time - _this.lastFrameTime >= _this.frameDuration) {
                _this.tick();
                _this.lastFrameTime = time;
            }
        };
    }
    FrameRateManager.oneSec = 1000;
    FrameRateManager.defaultFrameRate = 60;
    return FrameRateManager;
}());
exports.FrameRateManager = FrameRateManager;
//# sourceMappingURL=FrameRateManager.js.map