import { player } from "./player";
import { gameBoard } from "./gameBoard";
import { DOMHandler } from "./DOMHandler";
import { ship } from "./ship";

//could these container be passed into gameMaster?
const p1Cont = document.querySelector(".human-board");
const p2Cont = document.querySelector(".computer-board");
let gameMaster = (() => {
  let player1,
    player2,
    playerTurn = true;
  function init(name1 = "Gobi", name2 = "Broccoli") {
    player1 = player(name1, gameBoard());
    player2 = player(name2, gameBoard());
    player1.placeShipsOnBoard(ship, [
      [0, 0],
      [5, 6],
    ]);
    player2.placeShipsOnBoard(ship, [
      [0, 9],
      [3, 2],
    ]);
    DOMHandler.renderBoard(player1.board.tileSet, p1Cont, true);
    DOMHandler.renderBoard(player2.board.tileSet, p2Cont, false);
  }
  function properPlayerTurn(e) {
    if (e.currentTarget.className === "human-board") {
      if (!playerTurn) {
        player1.board.recieveAttack(DOMHandler.getCoordinates(e.target));
        playerTurn = !playerTurn;
        DOMHandler.renderBoard(player1.board.tileSet, p1Cont, true);
      } else {
        throw Error("not your turn");
      }
    } else {
      if (playerTurn) {
        player2.board.recieveAttack(DOMHandler.getCoordinates(e.target));
        playerTurn = !playerTurn;
        DOMHandler.renderBoard(player2.board.tileSet, p2Cont, false);
      } else {
        throw Error("not your turn");
      }
    }
  }

  return { init, properPlayerTurn };
})();

export { gameMaster };
