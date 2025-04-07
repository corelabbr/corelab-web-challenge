"use client";
import { ChangeEvent, ComponentProps, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { dataColor } from "@/constants/dataColor";
import { useRouter } from "next/navigation";

export function ColorFilter() {
  const router = useRouter();

  // lidar com a mudança de valor do Select
  const handleChange = (value: string) => {
    if (value === "all" || value === "") {
      router.push("/");
    } else {
      let encodedColor = encodeURIComponent(value);
      router.push(`/?color=${encodedColor}`);
    }
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-full  focus-visible:border-none focus-visible:ring-[none] sm:w-[280px] bg-white text-black py-6">
        <SelectValue placeholder="Filtre por cor" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Cores</SelectLabel>
          <SelectItem value="all">Qualquer</SelectItem>
          {dataColor.map((color) => (
            <SelectItem key={color} value={color}>
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: `#${color}` }}
              />
              {`#${color}`}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
