/**
 * @jest-environment jsdom
 */
import { ship } from "../ship";
import { gameBoard } from "../gameBoard";
//cant i just use dependency injection
import { gameMaster } from "../gameMaster";
jest.mock("../gameBoard", () => {
  return {
    __esModule: true,
    gameBoard: jest.fn(),
  };
});
import { player } from "../player";
jest.mock("../player", () => {
  return {
    __esModule: true,
    player: jest.fn(() => {
      return {
        board: () => {
          return { tileSet: "tileset" };
        },
        placeShipsOnBoard: jest.fn((ship, array) => {
          return { ship, array };
        }),
      };
    }),
  };
});
import { DOMHandler } from "../DOMHandler";
// jest.mock("../DOMHandler", () => {
//   return {
//     __esModule: true,
//     DOMHandler: jest.fn(),
//   };
// });

describe("game master tests", () => {
  //why do i feel like init shouldnt be tested as it only
  //modifies internal variables
  test("init exists", () => {
    expect(Object.hasOwn(gameMaster, "init")).toBe(true);
  });
  test("init works", () => {
    const render = jest.spyOn(DOMHandler, "renderBoard");
    render.mockImplementation((tileSet, cont, visib) => {
      return "sup";
    });
    gameMaster.init();

    //why should i be testing the below one? it has no effect externally, it just initializes a board inside the gamemaster object
    expect(player).toHaveBeenNthCalledWith(1, "Gobi", gameBoard());
    expect(player).toHaveBeenNthCalledWith(2, "Broccoli", gameBoard());
    const player1 = player.mock.results[0].value;
    const player2 = player.mock.results[1].value;
    expect(player1.placeShipsOnBoard).toHaveBeenNthCalledWith(1, ship, [
      [0, 0],
      [5, 6],
    ]);
    expect(player2.placeShipsOnBoard).toHaveBeenNthCalledWith(1, ship, [
      [0, 9],
      [3, 2],
    ]);
    expect(render).toHaveBeenCalledTimes(2);
  });
});
