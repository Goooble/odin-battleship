import "./reset.css";
import "./styles.css";
import gameBoard from "./gameBoard";
import ship from "./ship";
import DOMHandler from "./DOMHandler";
let player, computer;
newGame();
function newGame() {
  player = gameBoard();
  computer = gameBoard();
  player.placeShip([0, 0], ship(3));
  player.placeShip([0, 3], ship(2), "hor");
  computer.placeShip([5, 5], ship(3));
  computer.placeShip([6, 5], ship(2), "hor");
}
