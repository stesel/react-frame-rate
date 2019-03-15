"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.withReactFrameRate = function (options) {
    return function (Component) {
        var _a;
        return _a = /** @class */ (function (_super) {
                __extends(ReactFrameRate, _super);
                function ReactFrameRate(props) {
                    var _this = _super.call(this, props) || this;
                    _this.isReactMounted = false;
                    _this.frameId = 0;
                    _this.metricsFrames = 0;
                    _this.metricsFramesTime = Date.now();
                    _this.maxFPS = 0;
                    _this.animationFrames = 0;
                    _this.checkAnimation = function (props) {
                        if (_this.isReactMounted && props.isAnimating) {
                            _this.playAnimation();
                        }
                        else {
                            _this.stopAnimation();
                        }
                    };
                    _this.playAnimation = function () {
                        _this.checkFPS();
                        _this.update();
                        _this.frameId = window.requestAnimationFrame(_this.playAnimation);
                    };
                    _this.stopAnimation = function () {
                        if (_this.frameId) {
                            window.cancelAnimationFrame(_this.frameId);
                        }
                        _this.maxFPS = 0;
                    };
                    _this.checkFPS = function () {
                        if (_this.metricsFrames >= ReactFrameRate.metricsFrameCount) {
                            var now = Date.now();
                            _this.maxFPS = 1000 * ReactFrameRate.metricsFrameCount
                                / (now - _this.metricsFramesTime);
                            _this.metricsFrames = 0;
                            _this.metricsFramesTime = now;
                        }
                        _this.metricsFrames++;
                    };
                    _this.update = function () {
                        if (_this.maxFPS > options.frameRate) {
                            _this.animationFrames++;
                            if (_this.animationFrames >= Math.round(_this.maxFPS / options.frameRate)) {
                                _this.setState(options.updateState(_this.state));
                                _this.animationFrames = 0;
                            }
                        }
                        else {
                            _this.setState(options.updateState(_this.state));
                        }
                    };
                    _this.state = props;
                    return _this;
                }
                ReactFrameRate.prototype.render = function () {
                    return React.createElement(Component, __assign({}, this.state));
                };
                ReactFrameRate.prototype.componentDidMount = function () {
                    this.isReactMounted = true;
                    this.checkAnimation(this.props);
                };
                ReactFrameRate.prototype.componentWillUnmount = function () {
                    this.isReactMounted = false;
                    this.checkAnimation(this.props);
                };
                ReactFrameRate.prototype.componentWillReceiveProps = function (nextProps) {
                    this.checkAnimation(nextProps);
                };
                return ReactFrameRate;
            }(React.Component)),
            _a.metricsFrameCount = 10,
            _a;
    };
};
exports.default = exports.withReactFrameRate;
//# sourceMappingURL=index.js.map