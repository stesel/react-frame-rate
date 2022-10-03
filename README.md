# react-frame-rate [![Coverage](https://github.com/stesel/react-frame-rate/actions/workflows/coverage.yml/badge.svg)](https://github.com/stesel/react-frame-rate/actions/workflows/coverage.yml) [![Build](https://github.com/stesel/react-frame-rate/actions/workflows/build.yml/badge.svg)](https://github.com/stesel/react-frame-rate/actions/workflows/build.yml) [![npm](https://img.shields.io/npm/v/react-frame-rate.svg)](https://www.npmjs.com/package/react-frame-rate)
Create smooth animation in React components with ~60FPS.

![Demo](https://raw.githubusercontent.com/stesel/react-frame-rate/master/demo.gif)

## Usage

`npm install react-frame-rate --save`
or
`yarn add react-frame-rate`

### ◦ React hook `useFrameRateManager`:
```typescript
import * as React from "react";

import { useFrameRateManager } from "react-frame-rate";

export function Counter() {
  const [counter, setCounter] = React.useState(0);

  const {
    updateCallback,
    updateFrameRate,
    updateAnimation
  } = useFrameRateManager();

  React.useEffect(() => {
    updateCallback(() => setCounter((value) => value + 1));
  }, [updateCallback, setCounter]);

  React.useEffect(() => {
    updateFrameRate(30);
  }, [updateFrameRate]);

  React.useEffect(() => {
    updateAnimation(true);
    return () => {
      updateAnimation(false);
    };
  }, [updateAnimation]);

  return <div>{counter}</div>;
}
```
#### Props:
- `updateCallback` - set callback which is called on each frame.
- `updateFrameRate` - set desired frame rate value, optimal values `60/30/20/15/10/6/5/3/1`.
- `updateAnimation`- set start/stop animation with boolean flag.

### ◦ React HOC `withReactFrameRate`:
```typescript
import * as React from "react";

import withReactFrameRate, { BaseUpdateProps } from "react-frame-rate";

type Props = Readonly<{
  counter: number;
}> &
  BaseUpdateProps;

export function Counter() {
  const [isAnimating, setIsAnimation] = React.useState(true);

  const updateState = React.useCallback<(state: Props) => Props>(
    (state: Props) => {
      const newCounter = state.counter + 1;
      if (newCounter >= 100) {
        setIsAnimation(false);
      }
      return { ...state, counter: newCounter };
    },
    [setIsAnimation]
  );

  const options = React.useMemo(
    () => ({
      updateState,
      frameRate: 30
    }),
    [updateState]
  );

  const WithAnimation = React.useMemo(
    () =>
      withReactFrameRate<Props>(options)((props: Props) => (
        <>{props.counter}</>
      )),
    [options]
  );

  return <WithAnimation counter={0} isAnimating={isAnimating} />;
}
```

#### Options:

- `updateState` - refresh state on each frame.
- `frameRate` - current frame rate for updateState.
For efficient animation use frameRate - `60/30/20/15/10/6/5/3/1`.

### [◦ Codesandbox](https://codesandbox.io/s/21zko1o25j)

### [◦ Demo](https://github.com/stesel/react-frame-rate-demo)

## Contributing

Contributing are Welcome 🎉
Please check out the [Contributing guide](CONTRIBUTING.md).

### LICENSE

[MIT License](LICENSE.md)

### Keywords

`requestAnimatioFrame` `react` `smooth animation`
