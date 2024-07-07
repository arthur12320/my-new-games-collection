"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import { DatePicker } from "@/components/ui/datePicker";
import { Input } from "@/components/ui/input";
import Image from "next/image";

function GameCreationForm() {
  const [bought, setBought] = useState("false");
  const [image, setImage] = useState("");
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">
          Title
        </Label>
        <Input name="title" id="title" className="col-span-3" />
      </div>
      <div className="grid justify-center gap-4">
        <Image
          src={image ? image : "/noImage.png"}
          width={200}
          height={200}
          alt="game Image"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="mainImage" className="text-right">
          Image
        </Label>
        <Input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          name="mainImage"
          id="mainImage"
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right" htmlFor="bought">
          Bought
        </Label>
        <Switch
          value={bought}
          onCheckedChange={(c) => setBought(c.toString())}
          name="bought"
          className="col-span-3"
          id="bought"
        />
      </div>
      {bought === "true" && (
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right" htmlFor="bougt-date">
            Bought Date
          </Label>
          <DatePicker name="bought-date" />
        </div>
      )}

      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right" htmlFor="platform">
          platform
        </Label>
        <Input name="platform" id="platform" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right" htmlFor="beaten">
          Beaten
        </Label>
        <Switch name="beaten" className="col-span-3" id="beaten" />
      </div>
    </div>
  );
}

export default GameCreationForm;
