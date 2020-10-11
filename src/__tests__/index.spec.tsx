import * as React from "react";
import { act } from "react-dom/test-utils";
import { shallow, mount } from "enzyme";
import {
    withReactFrameRate,
    BaseUpdateProps,
    Options,
} from "../index";

interface UpdateProps extends BaseUpdateProps {
    counter: 0;
}

class TestComponent extends React.Component<UpdateProps> {
    public render() {
        return (
            <div className="testComponent" />
        );
    }
}

const options: Options<UpdateProps> = {
    updateState: jest.fn((state: UpdateProps): UpdateProps => ({ ...state })),
    frameRate: 60,
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
            counter: 0,
            isAnimating: false,
        };
        const Animated = withReactFrameRate<UpdateProps>(options)(TestComponent);
        const wrapper = shallow(<Animated {...props} />);
        expect(wrapper.contains(<TestComponent {...props} />)).toBeTruthy();
    });

    it("should start animation", () => {
        const props: UpdateProps = {
            counter: 0,
            isAnimating: true,
        };
        const runAnimationSpy = jest.spyOn(window, "requestAnimationFrame");
        const Animated = withReactFrameRate<UpdateProps>(options)(TestComponent);
        mount(<Animated {...props} />);
        expect(runAnimationSpy).toHaveBeenCalled();
        expect(props.isAnimating).toBe(true);
    });

    it("should stop animation", () => {
        const props: UpdateProps = {
            counter: 0,
            isAnimating: true,
        };
        const stopAnimationSpy = jest.spyOn(window, "cancelAnimationFrame");
        const Animated = withReactFrameRate<UpdateProps>(options)(TestComponent);
        const wrapper = mount(<Animated {...props} />);
        wrapper.setProps({
            ...props,
            isAnimating: false,
        });
        expect(stopAnimationSpy).toHaveBeenCalled();
    });

    it("should update state on animation play", () => {
        jest.useFakeTimers();
        const props: UpdateProps = {
            counter: 0,
            isAnimating: true,
        };
        const Animated = withReactFrameRate<UpdateProps>(options)(TestComponent);
        mount(<Animated {...props} />);
        act(() => {
            jest.runTimersToTime(1000);
        });
        jest.useRealTimers();
        expect(options.updateState).toHaveBeenCalledWith({ "counter": 0, "isAnimating": true });
    });

});
