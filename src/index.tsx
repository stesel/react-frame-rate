import * as React from "react";
import { FrameRateManager } from "./frameRateManager/FrameRateManager";

export interface BaseUpdateProps {
    readonly isAnimating: boolean;
}

export interface Options<Params> {
    readonly updateState: (state: Params) => Params;
    readonly frameRate: number;
}

export const withReactFrameRate = <UpdateProps extends BaseUpdateProps>(options: Options<UpdateProps>) => {
    return (Component: React.ComponentType<UpdateProps>): React.FC<UpdateProps> => {
        const FrameRate: React.FC<UpdateProps> = (props) => {
            const {
                updateState,
                frameRate,
            } = options;

            const {
                isAnimating,
            } = props;

            const frameRateRef = React.useRef<FrameRateManager>(new FrameRateManager());

            const [updateProps, setUpdateProps] = React.useState<UpdateProps>(props);

            React.useEffect(() => {
                frameRateRef.current.updateCallback(() => {
                    setUpdateProps(state => updateState(state));
                });
            }, [updateState]);

            React.useEffect(() => {
                frameRateRef.current.updateFrameRate(frameRate);
            }, [frameRate]);

            React.useEffect(() => {
                frameRateRef.current.updateAnimation(isAnimating);
                return () => {
                    frameRateRef.current.updateAnimation(false);
                };
            }, [isAnimating]);

            return <Component {...updateProps} />;
        };

        FrameRate.displayName = "FrameRateComponent";
        return FrameRate;
    };
};

export default withReactFrameRate;
