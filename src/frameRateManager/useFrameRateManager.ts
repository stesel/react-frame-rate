import { useRef } from "react";
import { createFrameRateManager } from "./FrameRateManager";
import type { FrameRateManager } from "./FrameRateManager";

/**
 * Allows to use react frame rate as react hook without hoc.
 * 
 * @example
 * ```
 * import * as React;
 * import withReactFrameRate from "react-frame-rate";
 * 
 * const Animation = () => {
 *  const [counter, setCounter] = React.useState(0);
 *  const { updateCallback, updateFrameRate, updateAnimation } = useFrameRateManager();
 * 
 *  React.useEffect(() => {
 *      updateCallback(() => setCounter((value) => value + 1));
 *  }, [updateCallback, setCounter])
 * 
 *  React.useEffect(() => {
 *      updateFrameRate(30);
 *  }, []);
 * 
 *  React.useEffect(() => {
 *      updateAnimation(true);
 *      return () => {
 *          updateAnimation(false);
 *      };
 *  }, []);
 *  
 *  return <div>{counter}</div>;
 * };
 * ```
 * 
 * @returns Frame Rate Manager instance which is stored in reference react hook.
 */
export function useFrameRateManager(): FrameRateManager {
    return useRef<FrameRateManager>(createFrameRateManager()).current;
}
