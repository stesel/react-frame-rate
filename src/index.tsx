import * as React from "react";
import { useFrameRateManager } from "./frameRateManager/useFrameRateManager";

export interface BaseUpdateProps {
    readonly isAnimating: boolean;
}

export interface Options<Params> {
    readonly updateState: (state: Params) => Params;
    readonly frameRate: number;
}

export function withReactFrameRate<UpdateProps extends BaseUpdateProps>(options: Options<UpdateProps>) {
    return (Component: React.ComponentType<UpdateProps>): React.FC<UpdateProps> => {
        const FrameRate: React.FC<UpdateProps> = (props) => {
            const {
                updateState,
                frameRate,
            } = options;

            const {
                isAnimating,
            } = props;

            const { updateCallback, updateFrameRate, updateAnimation } = useFrameRateManager();

            const [updateProps, setUpdateProps] = React.useState<UpdateProps>(props);

            React.useEffect(() => {
                updateCallback(() => {
                    setUpdateProps(state => updateState(state));
                });
            }, [updateCallback, updateState]);

            React.useEffect(() => {
                updateFrameRate(frameRate);
            }, [updateFrameRate, frameRate]);

            React.useEffect(() => {
                updateAnimation(isAnimating);
                return () => {
                    updateAnimation(false);
                };
            }, [isAnimating]);

            return <Component {...updateProps} />;
        };

        FrameRate.displayName = "FrameRateComponent";
        return FrameRate;
    };
}

export default withReactFrameRate;
