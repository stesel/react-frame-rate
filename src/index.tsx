import * as React from "react";

export type BaseUpdateProps = Readonly<{
    isAnimating: boolean;
}>;

export type Options<Params> = Readonly<{
    updateState: (state: Params) => Params;
    frameRate: number;
}>;

export const withReactFrameRate = <UpdateProps extends BaseUpdateProps>(options: Options<UpdateProps>) => {
    return (Component: React.ComponentType<UpdateProps>): React.ComponentClass<UpdateProps> => {
        return class ReactFrameRate extends React.Component<UpdateProps, UpdateProps> {

            private static metricsFrameCount = 10;
            private isReactMounted: boolean;
            private frameId: number;
            private metricsFrames = 0;
            private metricsFramesTime = Date.now();
            private maxFPS = 0;
            private animationFrames = 0;

            constructor(props: UpdateProps) {
                super(props);
                this.state = props;
            }

            public render() {
                return <Component {...this.state} />;
            }

            public componentDidMount() {
                this.isReactMounted = true;
                this.checkAnimation(this.props);
            }

            public componentWillUnmount() {
                this.isReactMounted = false;
                this.checkAnimation(this.props);
            }

            public componentWillReceiveProps(nextProps: UpdateProps) {
                this.checkAnimation(nextProps);
            }

            private checkAnimation = (props: UpdateProps) => {
                if (this.isReactMounted && props.isAnimating) {
                    this.playAnimation();
                } else {
                    this.stopAnimation();
                }
            }

            private playAnimation = () => {
                this.checkFPS();
                this.update();
                this.frameId = window.requestAnimationFrame(this.playAnimation);
            }

            private stopAnimation = () => {
                if (this.frameId) {
                    window.cancelAnimationFrame(this.frameId);
                }
                this.maxFPS = 0;
            }

            private checkFPS = () => {
                if (this.metricsFrames >= ReactFrameRate.metricsFrameCount) {
                    const now = Date.now();
                    this.maxFPS = 1000 * ReactFrameRate.metricsFrameCount
                        / (now - this.metricsFramesTime);
                    this.metricsFrames = 0;
                    this.metricsFramesTime = now;
                }
                this.metricsFrames++;
            }

            private update = () => {
                if (this.maxFPS > options.frameRate) {
                    this.animationFrames++;
                    if (this.animationFrames >= Math.round(this.maxFPS / options.frameRate)) {
                        this.setState(options.updateState(this.state));
                        this.animationFrames = 0;
                    }
                } else {
                    this.setState(options.updateState(this.state));
                }
            }
        };
    };
};

export default withReactFrameRate;
