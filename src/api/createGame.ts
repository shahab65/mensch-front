import Axios from "./Axios";
import { useUser } from "store/user";

type CreateGameResponse = {
  _id: string;
};

function createGame(playerCount: string): Promise<CreateGameResponse> {
  return Axios.post("/create-game", {
    playerCount,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export default createGame;
