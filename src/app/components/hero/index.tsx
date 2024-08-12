"use client";
import Image from "next/image";
import { useEffect } from "react";
import { ThreeCircles } from "react-loader-spinner";

import Card from "@/app/components/card";
import { colors } from "@/app/constants/colors";
import useNotes from "@/app/hooks/notes";

export default function Hero() {
  const { notes, totalFavorites, loading } = useNotes();

  useEffect(() => {}, [notes]);

  return (
    <div className="w-full max-w-[1318px] mx-auto mt-6 px-3 md:px-10">
      <div className="flex w-full items-center justify-center">
        <Card colors={colors} />
      </div>
      {!notes.length && (
        <div className="flex mt-10 w-full items-center justify-center">
          <Image
            src="/empty-state.png"
            alt="Empty notes"
            width={350}
            height={350}
            className="opacity-10"
          />
        </div>
      )}
      {!!notes.length && (
        <>
          <div className="mt-10">
            {!loading && totalFavorites > 0 && (
              <h4 className="text-sm font-normal text-primary dark:text-white">
                Favoritos
              </h4>
            )}
            <div className="flex w-full flex-wrap gap-[34px] mt-1.5">
              {notes
                .filter((item) => item.favorite)
                .map((note) => (
                  <Card key={note.id} note={note} colors={colors} />
                ))}
            </div>
          </div>
          <div className="mt-8">
            {!loading && notes.length > totalFavorites && (
              <h4 className="text-sm font-normal text-primary dark:text-white">
                Outros
              </h4>
            )}
            <div className="flex w-full flex-wrap gap-[34px] mt-1.5">
              {notes
                .filter((item) => !item.favorite)
                .map((note) => (
                  <Card key={note.id} note={note} colors={colors} />
                ))}
            </div>
          </div>
          {loading && (
            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm">
              <div className="flex items-center justify-center w-full h-full">
                <ThreeCircles
                  visible={true}
                  height="100"
                  width="100"
                  color="#FFA000"
                  ariaLabel="three-circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
