let ship = (length) => {
  let hitsTaken = 0;
  let state = true;
  function hit() {
    hitsTaken++;
  }
  function isSunk() {
    if (hitsTaken >= length) state = false;
  }
  return {
    get length() {
      return length;
    },
    get hitsTaken() {
      return hitsTaken;
    },
    get state() {
      return state;
    },
    hit,
    isSunk,
  };
  //do we really need state and isSunk both? isnt isSunk enough
  //making state redundant?
};

export default ship;
