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
var React = require("react");
var FrameRateManager_1 = require("./frameRateManager/FrameRateManager");
exports.withReactFrameRate = function (options) {
    return function (Component) {
        var FrameRate = function (props) {
            var updateState = options.updateState, frameRate = options.frameRate;
            var isAnimating = props.isAnimating;
            var _a = React.useState(props), updateProps = _a[0], setUpdateProps = _a[1];
            var frameRateRef = React.useRef();
            React.useEffect(function () {
                frameRateRef.current = new FrameRateManager_1.FrameRateManager();
            }, []);
            React.useEffect(function () {
                if (frameRateRef.current) {
                    frameRateRef.current.updateCallback(function () {
                        setUpdateProps(function (state) { return updateState(state); });
                    });
                }
            }, [updateState]);
            React.useEffect(function () {
                if (frameRateRef.current) {
                    frameRateRef.current.updateFrameRate(frameRate);
                }
            }, [frameRate]);
            React.useEffect(function () {
                if (frameRateRef.current) {
                    frameRateRef.current.updateAnimation(isAnimating);
                }
                return function () {
                    if (frameRateRef.current) {
                        frameRateRef.current.updateAnimation(false);
                    }
                };
            }, [isAnimating]);
            return React.createElement(Component, __assign({}, updateProps));
        };
        FrameRate.displayName = "FrameRateComponent";
        return FrameRate;
    };
};
exports.default = exports.withReactFrameRate;
//# sourceMappingURL=index.js.map