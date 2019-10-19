import * as React from "react";
import { FrameRateManager } from "./frameRateManager/FrameRateManager";

export type BaseUpdateProps = Readonly<{
    isAnimating: boolean;
}>;

export type Options<Params> = Readonly<{
    updateState: (state: Params) => Params;
    frameRate: number;
}>;

export const withReactFrameRate = <UpdateProps extends BaseUpdateProps>(options: Options<UpdateProps>) => {
    return (Component: React.ComponentType<UpdateProps>): React.FC<UpdateProps> => {
        return (props) => {
            const {
                updateState,
                frameRate,
            } = options;

            const {
                isAnimating,
            } = props;

            const [updateProps, setUpdateProps] = React.useState<UpdateProps>(props);

            const frameRateRef = React.useRef<FrameRateManager>();
            React.useEffect(() => {
                frameRateRef.current = new FrameRateManager();
            },              []);

            React.useEffect(() => {
                if (frameRateRef.current) {
                    frameRateRef.current.updateCallback(() => {
                        setUpdateProps( state => updateState(state));
                    });
                }
            },              [updateState]);

            React.useEffect(() => {
                if (frameRateRef.current) {
                    frameRateRef.current.updateFrameRate(frameRate);
                }
            },              [frameRate]);

            React.useEffect(() => {
                if (frameRateRef.current) {
                    frameRateRef.current.updateAnimation(isAnimating);
                }
                return () => {
                    if (frameRateRef.current) {
                        frameRateRef.current.updateAnimation(false);
                    }
                };
            },              [isAnimating]);

            return <Component {...updateProps} />;
        };
    };
};

export default withReactFrameRate;
