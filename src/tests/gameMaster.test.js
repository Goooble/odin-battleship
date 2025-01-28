import gameMaster from "../gameMaster";

describe("game master tests", () => {
  test("new game exists", () => {
    expect(gameMaster().newGame()).toBeDefined();
  });
});
