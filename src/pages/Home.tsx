import createGame from "api/createGame";
import PlayerCountInput from "components/PlayerCountInput";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser, useUser } from "store/user";
import PacmanLoader from "react-spinners/PacmanLoader";
import copyTextToClipboard from "utils/copyTextToClipboard";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import Header from "components/Header";

const Home = () => {
  const navigate = useNavigate();
  const { token } = useUser((state) => state);
  const user = getUser(token);
  const [gameId, setGameId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [playerCount, setPlayerCount] = useState("2");
  const { clearToken } = useUser();
  const { t, i18n } = useTranslation();

  const onLogOut = () => {
    clearToken();
  };

  const onCreateGame = () => {
    setIsLoading(true);
    createGame(playerCount)
      .then((res) => setGameId(res._id))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const gameAddress = window.location.href + "game/" + gameId;

  useEffect(() => {
    if (gameId) {
      copyTextToClipboard(gameAddress);
      toast(t("linkCopied"));
      navigate("/game/" + gameId);
    }
  }, [gameId]);

  return (
    <div className="p-16 rtl text-align-center">
      <div
        className="flex-b-s mb-12"
        style={{ borderBottom: "1px dashed grey" }}
      >
        <Header />

        <div className="mb-12">
          <img
            src={user.picture}
            alt={user.name}
            className="border-radius-50"
            width={96}
            height={96}
          />
          <p className=" fs-14">{user.name}</p>
        </div>
        <button className="button mb-8" onClick={onLogOut}>
          <Trans i18nKey="logout" />
        </button>
      </div>
      <p className="mb-12">
        <Trans i18nKey="welcome" />
      </p>
      <p className="mb-12">
        <Trans i18nKey="specifyPlayerNumbers" />
      </p>

      <PlayerCountInput
        value={playerCount}
        onChange={(value: string) => setPlayerCount(value)}
      />
      {isLoading ? (
        <div className="flex-c-c">
          <PacmanLoader color="#6bd3e0" />
        </div>
      ) : (
        <div className="mb-12">
          <button className="button" onClick={onCreateGame}>
            <Trans i18nKey={"createNewGame"} />
          </button>
        </div>
      )}

      {gameId && (
        <div className="mb-12">
          <p className="mb-8">
            لینک بازی با موفقیت ساخته شد. این لینک را با دوستان خود به اشتراک
            بگذارید و با کلیک بر روی ان وارد بازی شوید{" "}
          </p>
          <Link to={gameAddress}>{gameAddress}</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
