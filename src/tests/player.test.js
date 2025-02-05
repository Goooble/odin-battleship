import { player } from "../player";
import { gameBoard } from "../gameBoard";

describe("player tests", () => {
  let testBoard = gameBoard();
  let testPlayer = player("Gobi", testBoard);
  test("get name returns name", () => {
    expect(testPlayer.name).toBe("Gobi");
  });
  test("board has been initialized", () => {
    expect(testPlayer.board).toEqual(testBoard);
  });
  //placing ships
  test("PlaceShipsOnBoard exist", () => {
    expect(testPlayer.hasOwnProperty("placeShipsOnBoard")).toBe(true);
  });
  test("two ships of 5 and 4 are placed", () => {
    const placeShip = jest.spyOn(testPlayer.board, "placeShip");
    const ship = jest.fn((x) => {
      return { length: x };
    });
    testPlayer.placeShipsOnBoard(ship, [
      [0, 0],
      [1, 2],
    ]);
    expect(placeShip).toHaveBeenNthCalledWith(1, [0, 0], ship(5));
    expect(placeShip).toHaveBeenNthCalledWith(2, [1, 2], ship(4));
    expect(ship).toHaveBeenNthCalledWith(1, 5);
    expect(ship).toHaveBeenNthCalledWith(2, 4);
    expect(placeShip).toHaveBeenCalledTimes(2);
  });
});
