import CreateGameModal from "@/components/CreateGameModal";
import GamesList from "@/components/GamesList";
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import NavBar from "@/components/NavBar";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NavBar/>
      <GamesList/>
      <CreateGameModal/>
    </main>
  );
}
