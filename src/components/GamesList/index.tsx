import React from "react";
import prisma from "../../../lib/prisma";
import Card from "../Card";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function GamesList() {
  const count = await prisma.games.count();
  const session = await getServerSession(authOptions);
  const games = session?.user
    ? await prisma.games.findMany({
        where: {
          user: {
            equals: session?.user?.email,
          },
        },
        orderBy: [
          {
            boughtDate: "asc",
          },
        ],
      })
    : [];
  return (
    <div>
      <p>count = {count}</p>

      <div className="flex flex-wrap">
        {games.map((game) => (
          <Card key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

export default GamesList;
