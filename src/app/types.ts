// types.ts (or within recipeDisplay.tsx if you prefer)

export interface Recipe {
  name: string;
  style: string;
  batch_size_liters: number;
  ingredients: {
    grains: Array<{
      name: string;
      amount_kg: number;
      description?: string;
    }>;
    hops: Array<{
      name: string;
      amount_g: number;
      time_minutes: number;
      usage: "Boil" | "Dry Hop" | "Whirlpool";
    }>;
    yeast: {
      name: string;
      amount_packages: number;
      temperature_celsius: number;
      notes?: string;
    };
    water: {
      strike_water_liters: number;
      sparge_water_liters: number;
    };
    additional?: Array<{
      name: string;
      amount: number;
      unit: string;
      notes?: string;
    }>;
  };
  equipment: {
    mash_tun: boolean;
    boil_kettle: boolean;
    fermenter: string;
    wort_chiller: boolean;
    airlock: boolean;
  };
  process: {
    mash: {
      temperature_celsius: number;
      time_minutes: number;
    };
    sparge: {
      temperature_celsius: number;
      time_minutes: number;
    };
    boil: {
      duration_minutes: number;
      notes?: string;
    };
    cooling: {
      method: string;
      target_temperature_celsius: number;
    };
    fermentation: {
      primary: {
        duration_days: number;
        temperature_celsius: number;
      };
      diacetyl_rest?: {
        duration_days: number;
        temperature_celsius: number;
      };
      lagering?: {
        duration_weeks: number;
        temperature_celsius: number;
      };
    };
    bottling: {
      priming_sugar_g: number;
      bottle_conditioning_days: number;
      target_co2_volumes: number;
    };
  };
  notes?: string[];
}
