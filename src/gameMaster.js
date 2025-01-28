import gameBoard from "./gameBoard";
import ship from "./ship";

/*Will contain all the game logic */
export default gameMaster = () => {
  function newGame() {
    let player = gameBoard(10);
    let computer = gameBoard(10);
    player.placeShip([0, 0], ship(3));
    player.placeShip([0, 3], ship(2), "hor");
    computer.placeShip([5, 5], ship(3));
    computer.placeShip([6, 5], ship(2), "hor");
    return [player, computer];
  }
  return { newGame };
};
