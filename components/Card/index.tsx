import { games } from "@prisma/client";
import React from "react";
import Image from "next/image";

type CardProps = {
  game: games;
};

function Card(props: CardProps) {
  const { game } = props;
  return (
    <div>
      <Image src={game.mainImage} width={300} height={420} alt={game.title} />
      <p>{game.title}</p>
    </div>
  );
}

export default Card;
