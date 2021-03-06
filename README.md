# react-frame-rate [![Coverage Status](https://coveralls.io/repos/github/stesel/react-frame-rate/badge.svg?branch=master)](https://coveralls.io/github/stesel/react-frame-rate?branch=master) [![Build Status](https://travis-ci.org/stesel/react-frame-rate.svg?branch=master)](https://travis-ci.org/stesel/react-frame-rate) [![npm](https://img.shields.io/npm/v/react-frame-rate.svg)](https://www.npmjs.com/package/react-frame-rate)
Create smooth animation in React components with ~60FPS.

![Demo](https://raw.githubusercontent.com/stesel/react-frame-rate/master/demo.gif)

## Usage

`npm install react-frame-rate --save`
or
`yarn add react-frame-rate`

```typescript
import * as React from "react";
import { render } from "react-dom";
import withReactFrameRate, { BaseUpdateProps } from "../index";

type CircleProps = Readonly<{
    deg: number;
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
const initialDeg = -30;

const App = () => {
    const [isAnimating, setIsAnimating] = React.useState<boolean>(true);
    const updateState = React.useCallback<(state: CircleProps) => CircleProps>((state: CircleProps) => {
        const newDeg = state.deg + 6;
        if (newDeg >= 270) {
            setIsAnimating(false);
        }
        return {
            ...state,
            deg: newDeg,
        };
    }, []);

    const options = {
        updateState,
        frameRate,
    };

    const WithAnimation = React.useMemo(() => withReactFrameRate<CircleProps>(options)(Circle), []);

    return (
        <WithAnimation deg={initialDeg} isAnimating={isAnimating} />
    );
};

render(<App />, document.getElementById("app"));
```

### Options

`updateState` - refresh state on each frame.
`frameRate` - current frame rate for updateState.
For efficient animation use frameRate - `60/30/20/15/10/6/5/3/1`.

### Codesandbox

`https://codesandbox.io/s/21zko1o25j`

### Demo

`https://github.com/stesel/react-frame-rate-demo`

## Contributing

Contributing are Welcome 🎉
Please check out the [Contributing guide](CONTRIBUTING.md).

### LICENSE

[MIT License](LICENSE.md)

### Keywords

`requestAnimatioFrame` `react` `smooth animation`
