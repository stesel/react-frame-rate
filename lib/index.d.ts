import * as React from "react";
export interface BaseUpdateProps {
    readonly isAnimating: boolean;
}
export interface Options<Params> {
    readonly updateState: (state: Params) => Params;
    readonly frameRate: number;
}
export declare const withReactFrameRate: <UpdateProps extends BaseUpdateProps>(options: Options<UpdateProps>) => (Component: React.ComponentType<UpdateProps>) => React.FC<UpdateProps>;
export default withReactFrameRate;
