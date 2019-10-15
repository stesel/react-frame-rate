import * as React from "react";
import { render } from "react-dom";
import withReactFrameRate, { BaseUpdateProps } from "../index";

type CircleProps = Readonly<{
    deg: number;
    isAnimating: boolean;
}> & BaseUpdateProps;

class Circle extends React.PureComponent<CircleProps> {

    private static radius = 100;

    public render() {
        const rad = (this.props.deg - 90) / 180 * Math.PI;
        return (
            <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                preserveAspectRatio="none"
            >
                <circle
                    cx={Circle.radius}
                    cy={Circle.radius}
                    r="99"
                    stroke="black"
                    strokeWidth="1"
                    fill="yellow"
                />
                <line
                    x1={Circle.radius}
                    y1={Circle.radius}
                    x2={Circle.radius + Circle.radius * Math.cos(rad)}
                    y2={Circle.radius + Circle.radius * Math.sin(rad)}
                    strokeWidth="1"
                    stroke="red"
                />
            </svg>
        );
    }

}

const frameRate = 60;

const initialState = {
    deg: 0,
    isAnimating: true,
};

const updateState = (state: CircleProps) => {
    const newDeg = (state.deg + 360 / frameRate) % 360;
    return {
        ...state,
        deg: newDeg,
    };
};

const options = {
    updateState,
    frameRate,
};

const WithAnimation = withReactFrameRate<CircleProps>(options)(Circle);

const App = () => (<WithAnimation  {...initialState}/>);

render(<App />, document.getElementById("app"));
