/*Will contain all the game logic */
export default gameMaster = () => {
  function createPlayers(gameBoard) {
    return [gameBoard(), gameBoard()];
  }
  function placeShipsOnBoard(player, ship, coordinatesArray) {
    //as many ships with the given sizes below are places depending on how long the coordinates array is
    //makes it easier to test the game
    let length = [5, 4, 3, 3, 2];
    for (let i = 0; i < coordinatesArray.length; i++) {
      player.placeShip(coordinatesArray[i], ship(length[i]));
    }
  }
  return { createPlayers, placeShipsOnBoard };
};
