import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Socket } from "socket.io-client";
import { useParams } from "react-router-dom";
import { useUser } from "store/user";
import { SOCKET_ENDPOINT } from "../config/index";
import GameSocket from "./GameSocket";

function MyComponent() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { id } = useParams<string>();
  const { token } = useUser();

  useEffect(() => {
    const newSocket: Socket = io(SOCKET_ENDPOINT as string, {
      query: { token: token, gameId: id },
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <div className="p-16 rtl text-align-center">
      {socket && id ? (
        <div className="ltr">
          <GameSocket socket={socket} gameId={id} />
        </div>
      ) : null}
    </div>
  );
}

export default MyComponent;
