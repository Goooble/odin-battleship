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
    player1.placeShipsOnBoard(
      ship,
      [
        [0, 0],
        [5, 6],
      ],
      ["ver", "hor"],
    );
    player2.placeShipsRandomly(ship);
    DOMHandler.renderBoard(player1.board.tileSet, p1Cont, true);
    DOMHandler.renderBoard(player2.board.tileSet, p2Cont, true);
  }

  function properPlayerTurn(tile, player) {
    if (!gameOver) {
      if (turn === player.name) {
        let coord = DOMHandler.getCoordinates(tile);
        try {
          //to catch already hit error
          if (!player.board.recieveAttack(coord)) {
            //no hit

            setTurn();
          } else {
            if (player.board.AreAllShipsSunk()) {
              gameOver = true;
            }
          }
        } catch (e) {
          console.log(e);
          playComp; //for the computer to play again if it hits its own square
        }
        DOMHandler.renderBoard(player1.board.tileSet, p1Cont, true);
        DOMHandler.renderBoard(player2.board.tileSet, p2Cont, true);
      } else {
        throw new Error(`not ${player.name}\'s turn`);
      }
    } else {
      throw new Error("Game's over you dumbass");
    }
    playComp();
  }
  function playComp() {
    if (isComp === true && turn === player1.name) {
      let [x, y] = generateTile();
      properPlayerTurn({ dataset: { x, y } }, player1);
    }
  }

  function generateTile() {
    function random() {
      return Math.floor(Math.random() * 10);
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
