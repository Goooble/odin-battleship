import gameMaster from "../gameMaster";
describe("game master tests", () => {
  test("createPlayer exists", () => {
    expect(gameMaster().hasOwnProperty("createPlayers")).toBe(true);
  });
  test("creates two gameboards", () => {
    const mockBoard = jest.fn();
    mockBoard.mockReturnValue("gameBoard");
    expect(gameMaster().createPlayers(mockBoard)).toEqual([
      "gameBoard",
      "gameBoard",
    ]);
  });
  //placing ships
  const testMaster = gameMaster();
  test("PlaceShips exist", () => {
    expect(gameMaster().hasOwnProperty("placeShipsOnBoard")).toBe(true);
  });
  const placeShip = jest.fn();
  const ship = jest.fn((x) => {});
  let player = { placeShip };
  testMaster.placeShipsOnBoard(player, ship, [
    [0, 0],
    [1, 2],
  ]);
  test("two ships of 5 and 4 are placed", () => {
    expect(placeShip).toHaveBeenNthCalledWith(1, [0, 0], ship());
    expect(placeShip).toHaveBeenNthCalledWith(2, [1, 2], ship());
    expect(ship).toHaveBeenNthCalledWith(1, 5);
    expect(ship).toHaveBeenNthCalledWith(2, 4);
    expect(placeShip).toHaveBeenCalledTimes(2);
  });
});
