import { toFrameDuration } from "../frameRateManager/toFrameDuration";

describe("toFrameDuration", () => {
  it("return frame duration", () => {
    expect(toFrameDuration(60)).toBe(1000 / 60);
  });
});
