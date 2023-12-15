import { useEffect } from "react";
import Mohre from "components/Mohre";
import { board } from "constants/board";

const ShowPieces = (props: any) => {
  const {
    places,
    color,
    defaultPlaces,
    onMove,
    reservedHouses,
    isMyTurn,
    diceValue,
    startHomeId,
    isDiceValueFresh,
    onNoPlaceToGoAfterRollingDice,
    lastWhiteHomeId,
    firstTargetHomeId,
    socket,
    myColor,
  } = props;
  const isMyColor = color === myColor;
  const getNextPlace = (homeId: number) => {
    if (homeId === lastWhiteHomeId) return firstTargetHomeId;
    if (homeId === firstTargetHomeId + 3) return -1;
    //@ts-ignore
    return board[homeId].next;
  };

  const findNextTarget = (currentHomeId: number, step: number) => {
    if (Object.values(defaultPlaces).includes(currentHomeId)) {
      step = 1;
    }
    let ans = currentHomeId;
    for (let i = 1; i <= step; i++) {
      ans = getNextPlace(ans);
      if (ans === -1) return null;
    }
    return ans;
  };

  const isAllowedToGo = (wishedPlace: number) => {
    // if another piece is not there
    if (Object.values(places).includes(wishedPlace)) return false;
    // if it's not reserved house
    if (reservedHouses.includes(wishedPlace)) return false;
    // only 6 when on default houses
    if (wishedPlace === startHomeId && diceValue !== 6) return false;
    return true;
  };
  const onMohreClick = (mohreKey: string) => {
    if (isMyTurn && isDiceValueFresh) {
      //@ts-ignore
      const targetPlace = findNextTarget(places[mohreKey], diceValue);
      if (targetPlace !== null && isAllowedToGo(targetPlace)) {
        socket.emit("piece_move", { mohreKey, targetPlace, diceValue });
        onMove(mohreKey, targetPlace);
      }
    }
  };

  useEffect(() => {
    if (isMyColor && isMyTurn && isDiceValueFresh) {
      const placesThatCanGo: number[] = [];
      Object.values(places).forEach((placeId) => {
        //@ts-ignore
        const targetPlace = findNextTarget(placeId, diceValue);
        if (targetPlace !== null && isAllowedToGo(targetPlace)) {
          placesThatCanGo.push(targetPlace);
        }
      });
      if (placesThatCanGo.length === 0) {
        onNoPlaceToGoAfterRollingDice();
      }
    }
  }, [isDiceValueFresh, diceValue]);

  return (
    <div>
      {Object.keys(places).map((mohreKey) => {
        return (
          <Mohre
            key={mohreKey}
            //@ts-ignore
            homeId={places[mohreKey]}
            onClick={() => {
              onMohreClick(mohreKey);
            }}
            color={color}
          />
        );
      })}
    </div>
  );
};

export default ShowPieces;
