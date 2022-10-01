import * as React from "react";
export interface BaseUpdateProps {
    readonly isAnimating: boolean;
}
export interface Options<Params> {
    readonly updateState: (state: Params) => Params;
    readonly frameRate: number;
}
export declare function withReactFrameRate<UpdateProps extends BaseUpdateProps>(options: Options<UpdateProps>): (Component: React.ComponentType<UpdateProps>) => React.FC<UpdateProps>;
export { useFrameRateManager } from "./frameRateManager/useFrameRateManager";
export default withReactFrameRate;
