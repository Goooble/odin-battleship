/*Will contain all the game logic */
import DOMHandler from "./DOMHandler";
import { gameBoard } from "./gameBoard";
import ship from "./ship";

let human, computer;
const gameMaster = () => {
  function createPlayers() {
    human = gameBoard(10);
    computer = gameBoard(10);
  }
  function placeShipsOnBoard(player, ship, coordinatesArray) {
    //as many ships with the given sizes below are places depending on how long the coordinates array is
    //makes it easier to test the game
    let length = [5, 4, 3, 3, 2];
    for (let i = 0; i < coordinatesArray.length; i++) {
      player.placeShip(coordinatesArray[i], ship(length[i]));
    }
  }
  function newGame() {
    createPlayers();
    placeShipsOnBoard(human, ship, [
      [0, 0],
      [1, 2],
    ]);
    placeShipsOnBoard(computer, ship, [
      [7, 0],
      [3, 2],
    ]);
    const humanBoardCont = document.querySelector(".human-board");
    const computerBoardCont = document.querySelector(".computer-board");

    human.recieveAttack([9, 0]);
    human.recieveAttack([0, 0]);
    human.recieveAttack([0, 1]);
    human.recieveAttack([0, 2]);
    human.recieveAttack([0, 3]);
    human.recieveAttack([0, 4]);
    human.recieveAttack([1, 4]);
    computer.recieveAttack([9, 0]);
    computer.recieveAttack([7, 0]);
    computer.recieveAttack([7, 1]);
    computer.recieveAttack([7, 2]);
    computer.recieveAttack([7, 3]);
    computer.recieveAttack([7, 4]);
    computer.recieveAttack([7, 5]);
    computer.recieveAttack([3, 2]);
    DOMHandler().renderBoard(human.tileSet, humanBoardCont, true);
    DOMHandler().renderBoard(computer.tileSet, computerBoardCont, false);
  }
  return { createPlayers, placeShipsOnBoard, newGame };
};

export { gameMaster };
