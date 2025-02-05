let player = (name, board) => {
  //this is a temporary function for testing
  function placeShipsOnBoard(ship, coordinatesArray) {
    //as many ships with the given sizes below are places depending on how long the coordinates array is
    //makes it easier to test the game
    let length = [5, 4, 3, 3, 2];
    for (let i = 0; i < coordinatesArray.length; i++) {
      board.placeShip(coordinatesArray[i], ship(length[i]));
    }
  }
  return {
    get name() {
      return name;
    },
    get board() {
      return board;
    },
    placeShipsOnBoard,
  };
};

export { player };
