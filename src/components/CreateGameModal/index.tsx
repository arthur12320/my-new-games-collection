import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import prisma from "../../../lib/prisma";
import { DatePicker } from "../ui/datePicker";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import GameCreationForm from "../GameCreationForm";

async function CreateGameModal() {
  const session = await getServerSession(authOptions);

  async function handleSubmit(formData: FormData) {
    "use server";
    let title = formData.get("title")?.toString();
    let mainImage = formData.get("mainImage")?.toString();
    let bought = formData.get("bought") === "true" ? true : false;
    let beaten = formData.get("beaten") === "true" ? true : false;
    let boughtDate = formData.get("bought-date")?.toString();
    let platform = formData.get("platform")?.toString();
    if (title && mainImage && platform && session) {
      let newGame = await prisma.games.create({
        data: {
          title,
          mainImage,
          bought,
          boughtDate,
          platform,
          beaten,
          user: session?.user?.email,
        },
      });
      revalidatePath("/");
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger>Create Game</DialogTrigger>
        <DialogContent>
          <form action={handleSubmit}>
            <DialogHeader>
              <DialogTitle>New Game</DialogTitle>
            </DialogHeader>
            <GameCreationForm />
            <DialogFooter>
              <DialogTrigger>
                <Button type="submit">Save changes</Button>
              </DialogTrigger>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateGameModal;
