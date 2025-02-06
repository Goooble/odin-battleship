import "./reset.css";
import "./styles.css";
import { gameMaster } from "./gameMaster";

const p1Cont = document.querySelector(".human-board");
const p2Cont = document.querySelector(".computer-board");
gameMaster.init();
p1Cont.addEventListener("click", gameMaster.properPlayerTurn);
p2Cont.addEventListener("click", gameMaster.properPlayerTurn);
