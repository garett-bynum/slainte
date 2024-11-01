'use client'

import { IoBeerOutline } from "react-icons/io5";
import { GiHops } from "react-icons/gi";
import { useState, useTransition, useEffect, useRef } from 'react';
import { sendChat } from './actions';
import RecipeDisplay from './recipeDisplay';
import { Recipe } from './types'; // Adjust the path if necessary

// Brewing steps for the loading message
const brewingSteps = [
  "gathering ingredients",
  "milling",
  "heating the mash tun",
  "adding grains",
  "mashing",
  "sparging",
  "boiling",
  "adding hops",
  "cooling",
  "pitching the yeast",
  "fermenting",
  "bottling",
];

export default function Home() {
  const [isPending, startTransition] = useTransition();
  const [description, setDescription] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null); // Updated recipe type
  const [loadingStep, setLoadingStep] = useState(0); // Current brewing step index

  // Create a reference for smooth scrolling to the recipe section
  const recipeRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async () => {
    startTransition(async () => {
      const result = await sendChat(description);
      
      if (result) {
        try {
          // Remove any Markdown code block markers (e.g., ```json and ```)
          const cleanedResult = result.replace(/```(?:json)?\n?|\n?```/g, '');
          
          const parsedRecipe: Recipe = JSON.parse(cleanedResult); // Parse the cleaned result
          setRecipe(parsedRecipe);
        } catch (error) {
          console.error("Failed to parse recipe:", error);
          setRecipe(null);
        }
      } else {
        console.error("No recipe data received");
        setRecipe(null);
      }
    });
  };
  

  // Smooth scroll to the recipe section when a new recipe is loaded
  useEffect(() => {
    if (recipe && recipeRef.current) {
      recipeRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [recipe]);

  // Cycle through brewing steps every 2 seconds while loading
  useEffect(() => {
    let stepInterval: NodeJS.Timeout | undefined;

    if (isPending) {
      stepInterval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % brewingSteps.length);
      }, 2000);
    } else {
      // Reset step to 0 when loading completes
      setLoadingStep(0);
    }

    // Cleanup interval on unmount or when loading completes
    return () => {
      if (stepInterval) clearInterval(stepInterval);
    };
  }, [isPending]);

  return (
    <div className="min-h-screen flex flex-col items-center p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 w-full max-w-screen-md">
      <p className="text-5xl text-center sm:text-left flex items-baseline">
        sl<b>ái</b>nte
        <span className="text-sm text-gray-500 ml-4">(slawn-che)</span>
      </p>

        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li>Describe your desired beverage.</li>
          <li>Get the recipe.</li>
          <li>Brew.</li>
          <li>Drink.</li>
          <li>Sláinte!</li>
        </ol>

        {/* Form Section with added spacing */}
        <div className="flex flex-col gap-6">
          <textarea
            className="bg-gray-900 p-4 w-full max-w-lg min-h-[200px] placeholder-gray-600"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="I want a beer that is..."
          ></textarea>

          <div className="flex gap-4 items-center">
            <button
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              onClick={handleSubmit}
            >
              <IoBeerOutline />
              Get recipe
            </button>
          </div>
        </div>

        {/* Recipe content with extra top margin */}
        <div className="w-full max-w-lg min-h-[200px] mt-10 pt-10" ref={recipeRef}>
          {recipe && (
            <p className="text-4xl font-bold text-teal-500 mb-6">Recipe:</p>
          )}
          {recipe && <RecipeDisplay recipe={recipe} />}
        </div>
      </main>

      {/* Full-page loading spinner with brewing steps */}
      {isPending && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/50 z-50">
          <GiHops className="h-16 w-16 animate-spin" />
          <p className="mt-4 text-white text-lg">
            {brewingSteps[loadingStep]}
          </p>
        </div>
      )}
    </div>
  );
}
