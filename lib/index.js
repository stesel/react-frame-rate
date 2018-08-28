"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
exports.withReactFrameRate = (options) => {
    return (Component) => {
        var _a;
        return _a = class ReactFrameRate extends React.Component {
                constructor(props) {
                    super(props);
                    this.isReactMounted = false;
                    this.frameId = 0;
                    this.metricsFrames = 0;
                    this.metricsFramesTime = Date.now();
                    this.maxFPS = 0;
                    this.animationFrames = 0;
                    this.checkAnimation = (props) => {
                        if (this.isReactMounted && props.isAnimating) {
                            this.playAnimation();
                        }
                        else {
                            this.stopAnimation();
                        }
                    };
                    this.playAnimation = () => {
                        this.checkFPS();
                        this.update();
                        this.frameId = window.requestAnimationFrame(this.playAnimation);
                    };
                    this.stopAnimation = () => {
                        if (this.frameId) {
                            window.cancelAnimationFrame(this.frameId);
                        }
                        this.maxFPS = 0;
                    };
                    this.checkFPS = () => {
                        if (this.metricsFrames >= ReactFrameRate.metricsFrameCount) {
                            const now = Date.now();
                            this.maxFPS = 1000 * ReactFrameRate.metricsFrameCount
                                / (now - this.metricsFramesTime);
                            this.metricsFrames = 0;
                            this.metricsFramesTime = now;
                        }
                        this.metricsFrames++;
                    };
                    this.update = () => {
                        if (this.maxFPS > options.frameRate) {
                            this.animationFrames++;
                            if (this.animationFrames >= Math.round(this.maxFPS / options.frameRate)) {
                                this.setState(options.updateState(this.state));
                                this.animationFrames = 0;
                            }
                        }
                        else {
                            this.setState(options.updateState(this.state));
                        }
                    };
                    this.state = props;
                }
                render() {
                    return React.createElement(Component, Object.assign({}, this.state));
                }
                componentDidMount() {
                    this.isReactMounted = true;
                    this.checkAnimation(this.props);
                }
                componentWillUnmount() {
                    this.isReactMounted = false;
                    this.checkAnimation(this.props);
                }
                componentWillReceiveProps(nextProps) {
                    this.checkAnimation(nextProps);
                }
            },
            _a.metricsFrameCount = 10,
            _a;
    };
};
exports.default = exports.withReactFrameRate;
//# sourceMappingURL=index.js.map