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
});
