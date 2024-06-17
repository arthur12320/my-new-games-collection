
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '../ui/button'
import { Switch } from '../ui/switch'
import prisma from '../../../lib/prisma';
import { DatePicker } from '../ui/datePicker'
import { revalidatePath } from 'next/cache'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

async function CreateGameModal() {
  const session = await getServerSession(authOptions)

  async function handleSubmit(formData: FormData) {
    "use server"
    let title = formData.get("title")?.toString();
    let mainImage = formData.get("mainImage")?.toString();
    let bought = formData.get("bought") === 'true' ? true : false;
    let beaten = formData.get("beaten") === 'true' ? true : false;
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
          user: session.user?.email
        }
      })
      console.log("got here")
      revalidatePath("/")
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

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  name='title'
                  id="title"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="mainImage" className="text-right">
                  Image
                </Label>
                <Input
                  name='mainImage'
                  id="mainImage"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="bought">Bought</Label>
                <Switch
                  name='bought'
                  className="col-span-3" id="bought"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="bougt-date">Bought Date</Label>
                <DatePicker name="bought-date" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="platform">platform</Label>
                <Input
                  name='platform'
                  id="platform"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="beaten">Beaten</Label>
                <Switch
                  name='beaten'
                  className="col-span-3"
                  id="beaten"
                />
              </div>
            </div>
            <DialogFooter>
              <Button>Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div >
  )
}

export default CreateGameModal