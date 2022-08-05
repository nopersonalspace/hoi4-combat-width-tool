import React, { useMemo, useState, useEffect } from "react";
import BPromise from "bluebird";

import { DirectionWeights, Terrain, Weights } from "./constants";

export interface CalculateSingleModifierInput {
  /** The combat width to test */
  combatWidth: number;
  /** All terrain weights */
  terrainWeights?: Record<Terrain, number>;
  /** How many directions of attack */
  flankingDirections: number;
}

const defaultTerrainWeights: Record<Terrain, number> = {
  [Terrain.Desert]: Weights[Terrain.Desert].weight,
  [Terrain.Forest]: Weights[Terrain.Forest].weight,
  [Terrain.Hills]: Weights[Terrain.Hills].weight,
  [Terrain.Jungle]: Weights[Terrain.Jungle].weight,
  [Terrain.Marsh]: Weights[Terrain.Marsh].weight,
  [Terrain.Mountain]: Weights[Terrain.Mountain].weight,
  [Terrain.Plains]: Weights[Terrain.Plains].weight,
  [Terrain.Urban]: Weights[Terrain.Urban].weight,
};

export const calculateSingleModifier = ({
  combatWidth,
  terrainWeights = defaultTerrainWeights,
  flankingDirections,
}: CalculateSingleModifierInput): number => {
  console.log(`Starting Calculations for CW: ${combatWidth}`);
  let currentModifier = 0;
  const testNumber = 0;

  Object.keys(terrainWeights).forEach((terrainKey) => {
    const currentTerrainWeight = terrainWeights[terrainKey as Terrain];

    console.log("line 38");
    Array.from(Array(flankingDirections).keys()).forEach(() => {
      let currentWidth = 0;
      const battleWidth =
        Weights[terrainKey as Terrain].base +
        Weights[terrainKey as Terrain].increase * flankingDirections;
      let divisionsUsed = 0;

      const currentWeight =
        DirectionWeights[flankingDirections] * currentTerrainWeight;

      // Calculates how many divisions are used in the combat
      let maxWhile = 0;
      while (
        (currentWidth + combatWidth < battleWidth * 1.22 &&
          !(currentWidth > battleWidth)) ||
        maxWhile > 10000
      ) {
        currentWidth += combatWidth;
        divisionsUsed += 1;
      }
      console.log(`maxWhile: ${maxWhile}`);
      maxWhile += 1;
      // creates modifier penalty used in the final calculation to find modifier/effectiveness
      let modifierPenalty = 0;

      // calculates penalty for any overstacked divisions
      if (divisionsUsed > 8 + 4 * flankingDirections) {
        const overstackedDivisions = 0;
        if (overstackedDivisions * 0.02 < 0.99) {
          modifierPenalty = overstackedDivisions * 0.02;
        } else {
          modifierPenalty = 0.99;
        }
      }
      console.log("line 73");

      // if it doesnt fit perfect, then calculate all penalties to the total modifier
      if (battleWidth % combatWidth !== 0) {
        if (currentWidth > battleWidth) {
          const overstackedWidth = currentWidth - battleWidth;
          modifierPenalty += overstackedWidth * 0.015;
        } else if (currentWidth < battleWidth) {
          modifierPenalty += (battleWidth - currentWidth) * 0.01;
        }
      }
      console.log("line 84");

      // actual calculation for adding the modifier for this cycle into the average
      currentModifier =
        (currentModifier * testNumber + (1 - modifierPenalty) * currentWeight) /
        (testNumber + currentWeight);
    });
  });

  console.log("returning");
  return currentModifier;
};

export const calculateAllModifiers = async ({
  terrainWeights = defaultTerrainWeights,
  flankingDirections,
}: Omit<CalculateSingleModifierInput, "combatWidth">): Promise<number[]> => {
  return BPromise.map(
    Array.from(Array(50).keys()).map((key) => key + 1),
    async (combatWidth: number) => {
      return await calculateSingleModifier({
        combatWidth,
        terrainWeights,
        flankingDirections,
      });
    },
    { concurrency: 5 }
  );
};

export const useModifierTableData = ({
  terrainWeights = defaultTerrainWeights,
  flankingDirections,
}: Omit<CalculateSingleModifierInput, "combatWidth">): [number[], boolean] => {
  const [data, setData] = useState([] as number[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    calculateAllModifiers({
      terrainWeights,
      flankingDirections,
    }).then((result) => {
      setData(result);
      setLoading(false);
    });
  }, [terrainWeights, flankingDirections]);

  return [data, loading];
};
