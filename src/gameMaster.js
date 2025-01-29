/*Will contain all the game logic */
import DOMHandler from "./DOMHandler";
import { gameBoard } from "./gameBoard";
import { ship } from "./ship";

let human, computer;
let turn = true;
const gameMaster = () => {
  function createPlayers() {
    human = gameBoard(10);
    computer = gameBoard(10);
  }

  function newGame() {
    createPlayers();
    human.placeShipsOnBoard(ship, [
      [0, 0],
      [1, 2],
    ]);
    computer.placeShipsOnBoard(ship, [
      [7, 0],
      [3, 2],
    ]);
    const humanBoardCont = document.querySelector(".human-board");
    const computerBoardCont = document.querySelector(".computer-board");

    // human.recieveAttack([9, 0]);
    // human.recieveAttack([0, 0]);
    // human.recieveAttack([0, 1]);
    // human.recieveAttack([0, 2]);
    // human.recieveAttack([0, 3]);
    // human.recieveAttack([0, 4]);
    // human.recieveAttack([1, 4]);
    // computer.recieveAttack([9, 0]);
    // computer.recieveAttack([7, 0]);
    // computer.recieveAttack([7, 1]);
    // computer.recieveAttack([7, 2]);
    // computer.recieveAttack([7, 3]);
    // computer.recieveAttack([7, 4]);
    // computer.recieveAttack([7, 5]);
    // computer.recieveAttack([3, 2]);
    DOMHandler().renderBoard(human.tileSet, humanBoardCont, true);
    DOMHandler().renderBoard(computer.tileSet, computerBoardCont, true);
  }
  return { createPlayers, newGame };
};

export { gameMaster };
