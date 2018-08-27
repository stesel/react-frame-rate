import * as React from "react";
import { shallow } from "enzyme";
import {
    withReactFrameRate,
    BaseUpdateProps,
    Options,
} from "../index";

type TestComponentProps = BaseUpdateProps;

class TestComponent extends React.Component<TestComponentProps> {
    public render() {
        return (
            <div className="testComponent" />
        );
    }
}

const options: Options<TestComponentProps> = {
    updateState: (state: TestComponentProps): TestComponentProps => ({
        ...state,
    }),
    frameRate: 60,
};

describe("react-frame-rate", () => {

    it("should render child component with original properties", () => {
        const props = {
            counter: 0,
            isAnimating: false,
        };
        const Animated = withReactFrameRate<TestComponentProps>(options)(TestComponent);
        const wrapper = shallow(<Animated {...props} />);
        expect(wrapper.contains(<TestComponent {...props} />)).toBeTruthy();
    });

    it("should start animation", () => {
        const props = {
            counter: 0,
            isAnimating: true,
        };
        const runAnimationSpy = jest.spyOn(window, "requestAnimationFrame");
        const Animated = withReactFrameRate<TestComponentProps>(options)(TestComponent);
        shallow(<Animated {...props} />);
        expect(runAnimationSpy).toHaveBeenCalled();
    });

    it("should stop animation", () => {
        const props = {
            counter: 0,
            isAnimating: true,
        };
        const stopAnimationSpy = jest.spyOn(window, "cancelAnimationFrame");
        const Animated = withReactFrameRate<TestComponentProps>(options)(TestComponent);
        const wrapper = shallow(<Animated {...props} />);
        wrapper.setProps({
            ...props,
            isAnimating: false,
        });
        expect(stopAnimationSpy).toHaveBeenCalled();
    });

    it("should update state on animation play", () => {
        const props = {
            counter: 0,
            isAnimating: true,
        };
        const updateSpyState = jest.spyOn(options, "updateState");
        const Animated = withReactFrameRate<TestComponentProps>(options)(TestComponent);
        shallow(<Animated {...props} />);
        expect(updateSpyState).toHaveBeenCalled();
    });

    it("should checkFPS on animation play", () => {
        const props = {
            counter: 0,
            isAnimating: true,
        };
        const Animated = withReactFrameRate<TestComponentProps>(options)(TestComponent);
        const wrapper = shallow(<Animated {...props} />);
        wrapper.instance().checkFPS();
        expect(wrapper.instance().metricsFrames).toBeGreaterThan(0);
    });

    it("should metricsFrames be 1 after gets metricsFrameCount", () => {
        const props = {
            counter: 0,
            isAnimating: true,
        };
        const Animated = withReactFrameRate<TestComponentProps>(options)(TestComponent);
        const wrapper = shallow(<Animated {...props} />);
        wrapper.instance().checkFPS();
        for (let i = 0; i < Animated.metricsFrameCount - 1; i++) {
            wrapper.instance().checkFPS();
        }
        expect(wrapper.instance().metricsFrames).toBe(1);
    });

    it("should metricsFrames not be greater than metricsFrameCount", () => {
        const props = {
            counter: 0,
            isAnimating: true,
        };
        const Animated = withReactFrameRate<TestComponentProps>(options)(TestComponent);
        const wrapper = shallow(<Animated {...props} />);
        wrapper.instance().checkFPS();
        for (let i = 0; i < 1000; i++) {
            wrapper.instance().checkFPS();
        }
        expect(wrapper.instance().metricsFrames).not.toBeGreaterThan(Animated.metricsFrameCount);
    });

    it("should be Infinity for max possible FPS", () => {
        const props = {
            counter: 0,
            isAnimating: true,
        };
        const Animated = withReactFrameRate<TestComponentProps>(options)(TestComponent);
        const wrapper = shallow(<Animated {...props} />);

        for (let i = 0; i < 1000; i++) {
            wrapper.instance().checkFPS();
        }
        expect(wrapper.instance().maxFPS).toBe(Infinity);
    });

});
