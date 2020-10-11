"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFrameRateManager = void 0;
var FrameRateManagerClass = /** @class */ (function () {
    function FrameRateManagerClass() {
        var _this = this;
        this.frameId = 0;
        this.frameDuration = FrameRateManagerClass.oneSec / FrameRateManagerClass.defaultFrameRate;
        this.lastFrameTime = 0;
        this.updateCallback = function (callback) {
            _this.callback = callback;
        };
        this.updateFrameRate = function (frameRate) {
            _this.frameDuration = FrameRateManagerClass.oneSec / frameRate;
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
                _this.frameId = 0;
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
    FrameRateManagerClass.oneSec = 1000;
    FrameRateManagerClass.defaultFrameRate = 60;
    return FrameRateManagerClass;
}());
function createFrameRateManager() {
    return new FrameRateManagerClass();
}
exports.createFrameRateManager = createFrameRateManager;
//# sourceMappingURL=FrameRateManager.js.map