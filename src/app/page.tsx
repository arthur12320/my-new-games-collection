import Image from "next/image";
import prisma from "../../lib/prisma";
import Card from "../../components/Card";

export default async function Home() {
  const count = await prisma.games.count({
    where: { platform: { equals: "xbox360" } },
  });
  const games = await prisma.games.findMany({
    where: { platform: { equals: "xbox360" } },
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>count = {count}</p>
      <div className="flex flex-wrap">
        {games.map((game) => (
          <Card key={game.id} game={game} />
        ))}
      </div>
    </main>
  );
}
