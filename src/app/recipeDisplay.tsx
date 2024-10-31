import React from 'react';
import { Recipe } from './types'; // Adjust the path if your Recipe type is in a separate file

interface RecipeDisplayProps {
  recipe: Recipe | null;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe }) => {
  if (!recipe) return null;

  return (
    <div className="recipe-display space-y-6">
      {/* Basic Information */}
      <h1 className="text-3xl font-bold">{recipe.name}</h1>
      <p className="text-lg italic">Style: {recipe.style}</p>
      <p>Batch Size: {recipe.batch_size_liters} L</p>

      {/* Ingredients Section */}
      <h2 className="text-2xl font-semibold mt-10">Ingredients</h2>

      {/* Grains */}
      {recipe.ingredients.grains && (
        <div>
          <h3 className="text-xl font-semibold mt-6">Grains</h3>
          <ul className="list-disc ml-6">
            {recipe.ingredients.grains.map((grain, index) => (
              <li key={index}>
                {grain.name} - {grain.amount_kg} kg
                {grain.description && <p className="ml-4 text-sm italic">{grain.description}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Hops */}
      {recipe.ingredients.hops && (
        <div>
          <h3 className="text-xl font-semibold mt-6">Hops</h3>
          <ul className="list-disc ml-6">
            {recipe.ingredients.hops.map((hop, index) => (
              <li key={index}>
                {hop.name} - {hop.amount_g} g ({hop.usage}, {hop.time_minutes} min)
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Yeast */}
      {recipe.ingredients.yeast && (
        <div>
          <h3 className="text-xl font-semibold mt-6">Yeast</h3>
          <p>{recipe.ingredients.yeast.name} - {recipe.ingredients.yeast.amount_packages} package(s)</p>
          <p>Fermentation Temp: {recipe.ingredients.yeast.temperature_celsius} °C</p>
          {recipe.ingredients.yeast.notes && <p className="ml-4 text-sm italic">{recipe.ingredients.yeast.notes}</p>}
        </div>
      )}

      {/* Water */}
      {recipe.ingredients.water && (
        <div>
          <h3 className="text-xl font-semibold mt-6">Water</h3>
          <ul className="list-disc ml-6">
            <li>Strike Water: {recipe.ingredients.water.strike_water_liters} L</li>
            <li>Sparge Water: {recipe.ingredients.water.sparge_water_liters} L</li>
          </ul>
        </div>
      )}

      {/* Additional Ingredients */}
      {recipe.ingredients.additional && recipe.ingredients.additional.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mt-6">Additional Ingredients</h3>
          <ul className="list-disc ml-6">
            {recipe.ingredients.additional.map((item, index) => (
              <li key={index}>
                {item.name} - {item.amount} {item.unit}
                {item.notes && <p className="ml-4 text-sm italic">{item.notes}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Equipment Section */}
      <h2 className="text-2xl font-semibold mt-10">Equipment</h2>
      <ul className="list-disc ml-6">
        <li>Mash Tun: {recipe.equipment.mash_tun ? "Yes" : "No"}</li>
        <li>Boil Kettle: {recipe.equipment.boil_kettle ? "Yes" : "No"}</li>
        <li>Fermenter: {recipe.equipment.fermenter}</li>
        <li>Wort Chiller: {recipe.equipment.wort_chiller ? "Yes" : "No"}</li>
        <li>Airlock: {recipe.equipment.airlock ? "Yes" : "No"}</li>
      </ul>

      {/* Process Section */}
      <h2 className="text-2xl font-semibold mt-10">Process</h2>

      <div>
        <h3 className="text-xl font-semibold mt-6">Mash</h3>
        <p>Temperature: {recipe.process.mash.temperature_celsius} °C, Time: {recipe.process.mash.time_minutes} minutes</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mt-6">Sparge</h3>
        <p>Temperature: {recipe.process.sparge.temperature_celsius} °C, Time: {recipe.process.sparge.time_minutes} minutes</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mt-6">Boil</h3>
        <p>Duration: {recipe.process.boil.duration_minutes} minutes</p>
        {recipe.process.boil.notes && <p className="ml-4 text-sm italic">{recipe.process.boil.notes}</p>}
      </div>

      <div>
        <h3 className="text-xl font-semibold mt-6">Cooling</h3>
        <p>Method: {recipe.process.cooling.method}</p>
        <p>Target Temperature: {recipe.process.cooling.target_temperature_celsius} °C</p>
      </div>

      {/* Fermentation */}
      <div>
        <h3 className="text-xl font-semibold mt-6">Fermentation</h3>
        <ul className="list-disc ml-6">
          <li>Primary: {recipe.process.fermentation.primary.duration_days} days at {recipe.process.fermentation.primary.temperature_celsius} °C</li>
          {recipe.process.fermentation.diacetyl_rest && (
            <li>Diacetyl Rest: {recipe.process.fermentation.diacetyl_rest.duration_days} days at {recipe.process.fermentation.diacetyl_rest.temperature_celsius} °C</li>
          )}
          {recipe.process.fermentation.lagering && (
            <li>Lagering: {recipe.process.fermentation.lagering.duration_weeks} weeks at {recipe.process.fermentation.lagering.temperature_celsius} °C</li>
          )}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mt-6">Bottling</h3>
        <p>Priming Sugar: {recipe.process.bottling.priming_sugar_g} g</p>
        <p>Conditioning: {recipe.process.bottling.bottle_conditioning_days} days</p>
        <p>Target CO₂: {recipe.process.bottling.target_co2_volumes} volumes</p>
      </div>

      {/* Notes Section */}
      {recipe.notes && recipe.notes.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mt-10">Notes</h2>
          <ul className="list-disc ml-6">
            {recipe.notes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecipeDisplay;
