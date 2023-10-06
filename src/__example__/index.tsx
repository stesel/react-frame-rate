import * as React from "react";
import { createRoot } from "react-dom/client";
import withReactFrameRate, { BaseUpdateProps } from "../index";

type CircleProps = Readonly<{
  deg: number;
}> &
  BaseUpdateProps;

class Circle extends React.PureComponent<CircleProps> {
  private static radius = 100;

  public render() {
    const rad = ((this.props.deg - 90) / 180) * Math.PI;
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
  const updateState = React.useCallback<(state: CircleProps) => CircleProps>(
    (state: CircleProps) => {
      const newDeg = state.deg + 6;
      if (newDeg >= 270) {
        setIsAnimating(false);
      }
      return {
        ...state,
        deg: newDeg,
      };
    },
    []
  );

  const options = {
    updateState,
    frameRate,
  };

  const WithAnimation = React.useMemo(
    () => withReactFrameRate<CircleProps>(options)(Circle),
    []
  );

  return <WithAnimation deg={initialDeg} isAnimating={isAnimating} />;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById("app")!);

root.render(<App />);
