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
    gameOver = false,
    isComp = false;
  let turn;
  function setTurn() {
    if (turn === player1.name) {
      turn = player2.name;
    } else {
      turn = player1.name;
    }
  }
  function init(computer = false, name1 = "Gobi", name2 = "Broccoli") {
    gameOver = false;
    isComp = computer; //if its a computer player
    player1 = player(name1, gameBoard());
    player2 = player(name2, gameBoard());
    turn = player2.name; //dont be confused, turn is WHO is getting hit
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

  function properPlayerTurn(tile, player) {
    if (!gameOver) {
      if (turn === player.name) {
        let coord = DOMHandler.getCoordinates(tile);
        if (!player.board.recieveAttack(coord)) {
          //no hit

          setTurn();
        } else {
          if (player.board.AreAllShipsSunk()) {
            gameOver = true;
          }
        }
        DOMHandler.renderBoard(player1.board.tileSet, p1Cont, true);
        DOMHandler.renderBoard(player2.board.tileSet, p2Cont, false);
      } else {
        throw new Error(`not ${player.name}\'s turn`);
      }
    } else {
      throw new Error("Game's over you dumbass");
    }
    // if (!gameOver) {
    //   //if the game is over or not
    //   if (e.currentTarget.className === "human-board") {
    //     //this is the computers move
    //     //check who is playing the move
    //     if (!playerTurn) {
    //       //check if its the right players move
    //       let coord;
    //       if (isComp) {
    //         coord = generateCompMoves();
    //       } else {
    //         coord = DOMHandler.getCoordinates(e.target);
    //       }
    //       if (!player1.board.recieveAttack(coord)) {
    //         //check if it was not a hit to switch player turn
    //         playerTurn = !playerTurn;
    //       } else {
    //         if (player1.board.AreAllShipsSunk()) {
    //           //if game over after a hit
    //           gameOver = true;
    //         }
    //         if (isComp) {
    //           properPlayerTurn({
    //             currentTarget: { className: "human-board" },
    //           });
    //         }
    //       }
    //       DOMHandler.renderBoard(player1.board.tileSet, p1Cont, true);
    //     } else {
    //       throw Error("not your turn");
    //     }
    //   } else {
    //     if (playerTurn) {
    //       let coord = DOMHandler.getCoordinates(e.target);

    //       if (!player2.board.recieveAttack(coord)) {
    //         playerTurn = !playerTurn;
    //       } else {
    //         if (player2.board.AreAllShipsSunk()) {
    //           gameOver = true;
    //         }
    //       }
    //       DOMHandler.renderBoard(player2.board.tileSet, p2Cont, false);
    //       if (isComp) {
    //         properPlayerTurn({
    //           currentTarget: { className: "human-board" },
    //         });
    //       }
    //     } else {
    //       throw Error("not your turn");
    //     }
    //   }
    // } else {
    //   throw new Error("game over");
    // }
  }

  function generateCompMoves() {
    function random() {
      return Math.floor(Math.random() * 10) + 1;
    }
    return [random(), random()];
  }
  return {
    init,
    properPlayerTurn,
    get player1() {
      return player1;
    },
    get player2() {
      return player2;
    },
  };
})();

export { gameMaster };
