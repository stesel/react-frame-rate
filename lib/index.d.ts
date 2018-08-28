import * as React from "react";
export declare type BaseUpdateProps = Readonly<{
    isAnimating: boolean;
}>;
export declare type Options<Params> = Readonly<{
    updateState: (state: Params) => Params;
    frameRate: number;
}>;
export declare const withReactFrameRate: <UpdateProps extends Readonly<{
    isAnimating: boolean;
}>>(options: Readonly<{
    updateState: (state: UpdateProps) => UpdateProps;
    frameRate: number;
}>) => (Component: React.ComponentType<UpdateProps>) => React.ComponentClass<UpdateProps>;
export default withReactFrameRate;
