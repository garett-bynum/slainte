'use client'

import { IoBeerOutline } from "react-icons/io5";
import { useState, useTransition } from 'react';
import { sendChat } from './actions';
import Markdown from 'react-markdown';

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();
  const [description, setDescription] = useState("");
  const [recipe, setRecipe] = useState<string | null>("");

  // test description: Very juicy New England style IPA with strong grapefruit flavor, but I don't want to use actual grapefruit in the recipe. The grapefruit notes should come from the hops or yeast.
  const handleSubmit = async () => {
    console.log("Is Pending: ", isPending);
    startTransition(async () => {
      const result = await sendChat(description);
      setRecipe(result);
    });
  };
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start"> */}
        {/* <p className="text-2xl">sl<b>ai</b>nte</p> */}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-screen-md w-full">
        <p className="text-5xl text-center sm:text-left">sl<b>ai</b>nte</p>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li>Describe your desired beverage.</li>
          <li>Get the recipe.</li>
          <li>Brew.</li>
          <li>Drink.</li>
          <li>Sláinte!</li>
        </ol>

        <textarea
          className="bg-gray-900 p-4 w-full min-h-[200px] flex-grow placeholder-gray-600"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="I want a beer that is..."
        ></textarea>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            rel="noopener noreferrer"
            onClick={handleSubmit}
          >
            <IoBeerOutline />
            Get recip
          </button>
        </div>
        <div className="text-center sm:text-left">
          
          <p className="text-3xl ">{recipe ? "Recipe:" : ""}</p>
          <Markdown className="text-sm sm:text-base">{recipe}</Markdown>
        </div>
      </main>
    </div>
  );
}
