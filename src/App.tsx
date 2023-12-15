import Dice from "react-dice-roll";
import diceRollingSound from "./assets/sounds/dice-roll-on-wood.mp3";
import { getRandomNumber } from "./utils/getRandomNumber";
import Circle from "components/Circle";
import Board from "components/Board";
import { usePlayers } from "./store/players";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Timer from "components/Timer";
import PlayerInfo from "./components/PlayerInfo";
import Routes from "pages/Routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <Routes />
      <ToastContainer />
    </div>
  );
}

export default App;
