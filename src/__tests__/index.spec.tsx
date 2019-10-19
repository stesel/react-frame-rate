import * as React from "react";
import { act } from "react-dom/test-utils";
import { shallow, mount } from "enzyme";
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
        mount(<Animated {...props} />);
        expect(runAnimationSpy).toHaveBeenCalled();
    });

    it("should stop animation", () => {
        const props = {
            counter: 0,
            isAnimating: true,
        };
        const stopAnimationSpy = jest.spyOn(window, "cancelAnimationFrame");
        const Animated = withReactFrameRate<TestComponentProps>(options)(TestComponent);
        const wrapper = mount(<Animated {...props} />);
        wrapper.setProps({
            ...props,
            isAnimating: false,
        });
        expect(stopAnimationSpy).toHaveBeenCalled();
    });

    it("should update state on animation play", () => {
        jest.useFakeTimers();
        const props = {
            counter: 0,
            isAnimating: true,
        };
        const updateSpyState = jest.spyOn(options, "updateState");
        const Animated = withReactFrameRate<TestComponentProps>(options)(TestComponent);
        mount(<Animated {...props} />);
        act(() => {
            jest.runTimersToTime(1000);
        });
        jest.useRealTimers();
        expect(updateSpyState).toHaveBeenCalled();
    });

});
