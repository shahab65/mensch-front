import Axios from "./Axios";
import { useUser } from "store/user";

type GetGameResponse = {
  _id: string;
};

function getGame(gameId: string): Promise<GetGameResponse> {
  return Axios.post("/get-game", {
    gameId,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export default getGame;
