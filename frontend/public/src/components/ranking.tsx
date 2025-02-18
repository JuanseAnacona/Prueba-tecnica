import { useState, useEffect } from "react";
import socket from "../services/socket";

interface UserRanking {
  email: string;
  score: number;
}

export default function Ranking() {
  const [ranking, setRanking] = useState<UserRanking[]>([]);

  useEffect(() => {
    const handleRankingUpdate = (data: UserRanking[]) => {
      setRanking(data);
    };

    socket.on("rankingUpdated", handleRankingUpdate);

    return () => {
      socket.off("rankingUpdated", handleRankingUpdate);
    };
  }, []);

  return (
    <div>
      <h1>Ranking en Tiempo Real</h1>
      <ul>
        {ranking.map((user) => (
          <li key={user.email}>
            {user.email}: {user.score} puntos
          </li>
        ))}
      </ul>
    </div>
  );
}
