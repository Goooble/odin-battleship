let player = (name, board) => {
  return {
    get name() {
      return name;
    },
    get board() {
      return board;
    },
  };
};

export { player };
