## Introduction

As I asked for permission, I created this as a full stack project, backend and frontend together using the latest NextJS 14, this allowed me to set up a fully end-to-end type-safe app with Server Actions.

For initial load Next.js will run both the Server Components and the Client Components on the server to produce HTML.

Server Components (RSC) execute in a separate module system from the Client Components to avoid accidentally exposing information between the two modules.

## Result

![1](https://i.ibb.co/bQZHt6m/desafio-Core-Note-Print3.png)
![2](https://i.ibb.co/PCkT4QQ/desafio-Core-Note-Print4.png)

## Example

This is the component that runs on the server and fetchs the notes using the server action,as you can see, when no "use server" or "use client" are used at the top of the file, NextJS automatically uses "use server" as default

```
import { NoteType } from "@/app/lib/definitions";
import TaskBox from "../noteBox/noteBox";
import { getFilteredNotes } from "@/app/lib/actions";

type Props = {
  query: string;
  color: string;
};

export default async function NotesWrapper({ query, color }: Props) {
  const notes = await getFilteredNotes(query, color);
  const nonFavoriteNotes = notes.filter(
    (note: NoteType) => note.favorited === false
  );
  const favoriteNotes = notes.filter(
    (note: NoteType) => note.favorited === true
  );

  return (
    <>
      {" "}
      {notes.length === 0 && (
        <>
          <div className="mt-10 flex flex-col items-center gap-10 ">
            <h1 className="text-center text-xl font-bold text-zinc-300">
              Nenhum nota encontrada =(
            </h1>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="250px"
                height="250px"
                viewBox="0 0 14 14"
                className="rounded-full bg-zinc-300 text-zinc-300"
                fill={`rgb(212 212 216 / var(--tw-text-opacity))`}
              >
                <g fill-rule="evenodd">
                  <path d="M0 7a7 7 0 1 1 14 0A7 7 0 0 1 0 7z" />

                  <path d="M13 7A6 6 0 1 0 1 7a6 6 0 0 0 12 0z" fill="#FFF" />

                  <path d="M6 3.5c0-.3.2-.5.5-.5h1c.3 0 .5.2.5.5v4c0 .3-.2.5-.5.5h-1c-.3 0-.5-.2-.5-.5v-4m0 6c0-.3.2-.5.5-.5h1c.3 0 .5.2.5.5v1c0 .3-.2.5-.5.5h-1c-.3 0-.5-.2-.5-.5v-1" />
                </g>
              </svg>
            </div>
          </div>
        </>
      )}
      {notes.length > 0 && (
        <>
          {favoriteNotes.length > 0 && (
            <>
              <h1 className="mt-10 pl-6 text-base text-zinc-700 sm:mx-12 md:mx-12 lg:mx-24">
                Favoritas
              </h1>
              <div className="mt-2 grid h-full gap-10 sm:mx-12 sm:grid-cols-1 md:grid-cols-2 lg:mx-24 lg:grid-cols-3">
                {favoriteNotes.map((note: NoteType) => {
                  return <TaskBox key={note._id} note={note} />;
                })}
              </div>
            </>
          )}
          {nonFavoriteNotes.length > 0 && (
            <>
              <h1 className="mt-10 pl-6 text-base text-zinc-700 sm:mx-12 lg:mx-24">
                Outras
              </h1>
              <div className="mt-2 grid gap-10 sm:mx-12 sm:grid-cols-1 md:grid-cols-2 lg:mx-24 lg:grid-cols-3">
                {nonFavoriteNotes.map((note: NoteType) => {
                  return <TaskBox key={note._id} note={note} />;
                })}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

```

The server action that provides the notes:

```
"use server";

export async function getFilteredNotes(query: string, color: string) {
  try {
    let response;
    await setupMongoDb();

    //Checks if there is a normal query or a color query
    if (query || color) {
      if (color) {
        response = await Note.find({
          title: { $regex: query, $options: "i" },
          color: color,
        });
      } else {
        response = await Note.find({
          title: { $regex: query, $options: "i" },
        });
      }
    } else {
      response = await Note.find({});
    }
    const data = JSON.parse(JSON.stringify(response));
    return data.map((note: NoteType) => note);
  } catch (error) {
    console.log(error);
    return { messsage: "Database error: Failed to create note" };
  }
}

```

## Note

You cannot use any interactivity on server components, like onClick, because it's pre-rendered and served as a static HTML to client, this leads to a fast blazing performance

## More infos and screenshots

https://github.com/WagDevX/to-do-fullstack-next14/blob/f90aa20557da20b08b02f5c65d3ea9407df2b53a/README.md
