"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFrameRateManager = exports.withReactFrameRate = void 0;
var React = require("react");
var useFrameRateManager_1 = require("./frameRateManager/useFrameRateManager");
function withReactFrameRate(options) {
    return function (Component) {
        var FrameRate = function (props) {
            var updateState = options.updateState, frameRate = options.frameRate;
            var isAnimating = props.isAnimating;
            var _a = (0, useFrameRateManager_1.useFrameRateManager)(), updateCallback = _a.updateCallback, updateFrameRate = _a.updateFrameRate, updateAnimation = _a.updateAnimation;
            var _b = React.useState(props), updateProps = _b[0], setUpdateProps = _b[1];
            React.useEffect(function () {
                updateCallback(function () {
                    setUpdateProps(function (state) { return updateState(state); });
                });
            }, [updateCallback, updateState]);
            React.useEffect(function () {
                updateFrameRate(frameRate);
            }, [updateFrameRate, frameRate]);
            React.useEffect(function () {
                updateAnimation(isAnimating);
                return function () {
                    updateAnimation(false);
                };
            }, [isAnimating]);
            return React.createElement(Component, __assign({}, updateProps));
        };
        FrameRate.displayName = "FrameRateComponent";
        return FrameRate;
    };
}
exports.withReactFrameRate = withReactFrameRate;
var useFrameRateManager_2 = require("./frameRateManager/useFrameRateManager");
Object.defineProperty(exports, "useFrameRateManager", { enumerable: true, get: function () { return useFrameRateManager_2.useFrameRateManager; } });
exports.default = withReactFrameRate;
//# sourceMappingURL=index.js.map