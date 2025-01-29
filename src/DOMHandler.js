/* 
everything that leads to DOM changes must happen here 
as little to no logic as possible to keep DOM seperate from the rest 

renderBoard
    needs the tileset
*/
const DOMHandler = () => {
  function renderBoard(tileSet, boardCont, visibility) {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let tile = document.createElement("div");
        tile.setAttribute("class", "tile");
        tile.dataset.x = i;
        tile.dataset.y = j;

        if (tileSet[i][j].shipContained !== null) {
          if (tileSet[i][j].shipContained.isSunk() === true) {
            tile.classList.add("sunkTile");
          }
          if (visibility) {
            tile.classList.add("shipTile");
          }
        }

        if (tileSet[i][j].isHit === false) {
          tile.classList.add("missTile");
        }
        if (tileSet[i][j].isHit === true) {
          tile.classList.add("hitTile");
        }

        boardCont.appendChild(tile);
      }
    }
  }
  return { renderBoard };
};

export default DOMHandler;
