import "./reset.css";
import "./styles.css";
import { gameMaster } from "./gameMaster";

const p1Cont = document.querySelector(".human-board");
const p2Cont = document.querySelector(".computer-board");
gameMaster.init(true);
p1Cont.addEventListener("click", (e) => {
  gameMaster.properPlayerTurn(e.target, gameMaster.player1);
});
p2Cont.addEventListener("click", (e) => {
  gameMaster.properPlayerTurn(e.target, gameMaster.player2);
});

const reset = document.querySelector(".reset-but");
console.log(reset);
reset.addEventListener("click", () => {
  gameMaster.init(true);
});
