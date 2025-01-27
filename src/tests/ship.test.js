import ship from "../ship.js";

describe("ship tester", () => {
  test("returns object", () => {
    expect(ship()).toEqual({});
  });
});
