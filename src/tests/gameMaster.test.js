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
        board: {
          tileSet: "tileset",
          recieveAttack: jest.fn(),
          AreAllShipsSunk: jest.fn(),
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
  const render = jest.spyOn(DOMHandler, "renderBoard");
  render.mockImplementation((tileSet, cont, visib) => {
    return "sup";
  });

  gameMaster.init();
  const player1 = player.mock.results[0].value;
  const player2 = player.mock.results[1].value;
  //why do i feel like init shouldnt be tested as it only
  //modifies internal variables, but not internally of the funciton, so it should be
  test("init exists", () => {
    expect(Object.hasOwn(gameMaster, "init")).toBe(true);
  });
  test("init works", () => {
    //why should i be testing the below one? it has no effect externally, it just initializes a board inside the gamemaster object
    //yeah but the function is doing something outside of it
    expect(player).toHaveBeenNthCalledWith(1, "Gobi", gameBoard());
    expect(player).toHaveBeenNthCalledWith(2, "Broccoli", gameBoard());

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
  const getCoord = jest.spyOn(DOMHandler, "getCoordinates");
  getCoord.mockImplementation((coord) => coord);
  test("properPlayerTurn exists", () => {
    expect(Object.hasOwn(gameMaster, "properPlayerTurn")).toBe(true);
  });
  test("properPlayerTurn works for correct turn on player1", () => {
    let e = {
      target: [0, 0],
      currentTarget: { className: "computer-board" },
    };
    gameMaster.properPlayerTurn(e);
    expect(player2.board.recieveAttack).toHaveBeenCalledWith([0, 0]);
  });
  test("properPlayerTurn works for correct turn on player2 ensures turn switching", () => {
    let e = {
      target: [5, 8],
      currentTarget: { className: "human-board" },
    };
    gameMaster.properPlayerTurn(e);
    expect(player1.board.recieveAttack).toHaveBeenCalledWith([5, 8]);
  });
  test("properPlayerTurn works for wrong turn", () => {
    let e = {
      target: [0, 0],
      currentTarget: { className: "human-board" },
    };

    expect(() => {
      gameMaster.properPlayerTurn(e);
    }).toThrow();
  });
  test("properPlayerTurn works for correct turn on player1 again", () => {
    let e = {
      target: [4, 3],
      currentTarget: { className: "computer-board" },
    };
    gameMaster.properPlayerTurn(e);
    expect(player2.board.recieveAttack).toHaveBeenNthCalledWith(2, [4, 3]);
  });
  test("render called properly", () => {
    expect(render).toHaveBeenCalledTimes(5);
  });
  test("if hit, another turn", () => {
    player1.board.recieveAttack.mockReturnValueOnce(true);
    let e = {
      target: [6, 3],
      currentTarget: { className: "human-board" },
    };
    gameMaster.properPlayerTurn(e);
    expect(player1.board.recieveAttack).toHaveBeenNthCalledWith(2, [6, 3]);

    e = {
      target: [8, 3],
      currentTarget: { className: "human-board" },
    };
    gameMaster.properPlayerTurn(e);
    expect(player1.board.recieveAttack).toHaveBeenNthCalledWith(3, [8, 3]);
  });
  test("if all ships sunk on computer board, stop game", () => {
    player2.board.recieveAttack.mockReturnValueOnce(true);
    player2.board.AreAllShipsSunk.mockReturnValueOnce(true);
    let e = {
      target: [9, 3],
      currentTarget: { className: "computer-board" },
    };
    gameMaster.properPlayerTurn(e);
    expect(player2.board.recieveAttack).toHaveBeenNthCalledWith(3, [9, 3]);

    e = {
      target: [8, 3],
      currentTarget: { className: "computer-board" },
    };
    expect(() => {
      gameMaster.properPlayerTurn(e);
    }).toThrow();
  });
});
