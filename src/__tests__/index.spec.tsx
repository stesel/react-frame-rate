import type { FrameRateManager } from "../frameRateManager/FrameRateManager";

const updateCallbackMock = jest.fn();
const updateFrameRateMock = jest.fn();
const updateAnimationMock = jest.fn();

const createFrameRateManagerMock = jest.fn(
  (): FrameRateManager => ({
    updateCallback: updateCallbackMock,
    updateFrameRate: updateFrameRateMock,
    updateAnimation: updateAnimationMock,
  })
);

jest.mock("../frameRateManager/FrameRateManager", () => ({
  ...jest.requireActual<typeof import("../frameRateManager/FrameRateManager")>(
    "../frameRateManager/FrameRateManager"
  ),
  createFrameRateManager: createFrameRateManagerMock,
}));

import * as React from "react";
import { render } from "@testing-library/react";
import {
  withReactFrameRate,
  useFrameRateManager,
  BaseUpdateProps,
  Options,
} from "../index";

interface UpdateProps extends BaseUpdateProps {
  counter: number;
}

const testId = "testComponent";

class TestComponent extends React.Component<UpdateProps> {
  public render() {
    return <div data-testid={testId}>{this.props.counter}</div>;
  }
}

const options: Options<UpdateProps> = {
  updateState: jest.fn((state: UpdateProps): UpdateProps => ({ ...state })),
  frameRate: 1,
};

describe("react-frame-rate", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return valid component", () => {
    const Animated = withReactFrameRate<UpdateProps>(options)(TestComponent);
    expect(Animated).toBeDefined();
    expect(Animated.displayName).toBe("FrameRateComponent");
  });

  it("should render child component with original properties", () => {
    const props: UpdateProps = {
      counter: 15,
      isAnimating: false,
    };
    const Animated = withReactFrameRate<UpdateProps>(options)(TestComponent);
    const { getByTestId, getByText } = render(<Animated {...props} />);
    expect(createFrameRateManagerMock).toBeCalledTimes(1);
    expect(updateCallbackMock).toBeCalledTimes(1);
    expect(updateFrameRateMock).toBeCalledWith(options.frameRate);
    expect(updateAnimationMock).toBeCalledWith(props.isAnimating);
    expect(getByTestId(testId)).toBeDefined();
    expect(getByText(String(props.counter))).toBeDefined();
  });

  it("should start animation", async () => {
    const props: UpdateProps = {
      counter: 0,
      isAnimating: true,
    };
    const nextProps: UpdateProps = {
      ...props,
      counter: props.counter + 1,
    };
    updateAnimationMock.mockImplementationOnce((isAnimating: boolean) => {
      if (isAnimating) {
        options.updateState(nextProps);
      }
    });
    const Animated = withReactFrameRate<UpdateProps>(options)(TestComponent);
    render(<Animated {...props} />);
    expect(updateAnimationMock).toBeCalledTimes(1);
    expect(updateAnimationMock).toBeCalledWith(props.isAnimating);
    expect(options.updateState).toBeCalledWith(nextProps);
  });

  it("should call update callback", () => {
    const props: UpdateProps = {
      counter: 0,
      isAnimating: false,
    };
    updateCallbackMock.mockImplementationOnce((callback: () => void) => {
      callback();
    });
    const Animated = withReactFrameRate<UpdateProps>(options)(TestComponent);
    render(<Animated {...props} />);
    expect(updateCallbackMock).toBeCalledTimes(1);
    expect(options.updateState).toBeCalledWith(props);
  });

  it("should stop animation", () => {
    const props: UpdateProps = {
      counter: 0,
      isAnimating: true,
    };
    const Animated = withReactFrameRate<UpdateProps>(options)(TestComponent);
    const { rerender } = render(<Animated {...props} />);
    expect(updateAnimationMock).toBeCalledWith(props.isAnimating);

    const nextProps: UpdateProps = {
      counter: 0,
      isAnimating: false,
    };
    rerender(<Animated {...nextProps} />);
    expect(updateAnimationMock).toBeCalledWith(nextProps.isAnimating);
  });

  it("should re-export useFrameRateManager", () => {
    expect(useFrameRateManager).toBeDefined();
  });
});
