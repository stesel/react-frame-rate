"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFrameRateManager = void 0;
var react_1 = require("react");
var FrameRateManager_1 = require("./FrameRateManager");
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
function useFrameRateManager() {
    return (0, react_1.useRef)((0, FrameRateManager_1.createFrameRateManager)()).current;
}
exports.useFrameRateManager = useFrameRateManager;
//# sourceMappingURL=useFrameRateManager.js.map