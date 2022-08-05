/**
 * All terrain types
 */
export enum Terrain {
  Desert = "DESERT",
  Forest = "FOREST",
  Hills = "HILLS",
  Jungle = "JUNGLE",
  Marsh = "MARSH",
  Mountain = "MOUNTAIN",
  Plains = "PLAINS",
  Urban = "URBAN",
}
/**
 *
 */
type TerrainKeys = keyof typeof Terrain;

/**
 * Weights for different directions
 */
export const DirectionWeights = {
  1: 1,
  2: 2,
  3: 1,
};
const TOTAL_PROVINCES = 2667;

export interface Weight {
  /** The base value */
  base: number;
  /** The increase */
  increase: number;
  /** The weight */
  weight: number;
}
export const Weights: Record<Terrain, Weight> = {
  [Terrain.Desert]: {
    base: 90,
    increase: 45,
    weight: 1094 / 2 / TOTAL_PROVINCES,
  },
  [Terrain.Forest]: {
    base: 84,
    increase: 42,
    weight: 703 / 2 / TOTAL_PROVINCES,
  },
  [Terrain.Hills]: {
    base: 80,
    increase: 40,
    weight: 401 / TOTAL_PROVINCES,
  },
  [Terrain.Jungle]: {
    base: 84,
    increase: 42,
    weight: 703 / 2 / TOTAL_PROVINCES,
  },
  [Terrain.Marsh]: {
    base: 78,
    increase: 26,
    weight: 51 / TOTAL_PROVINCES,
  },
  [Terrain.Mountain]: {
    base: 75,
    increase: 25,
    weight: 297 / TOTAL_PROVINCES,
  },
  [Terrain.Plains]: {
    base: 90,
    increase: 45,
    weight: 1094 / 2 / TOTAL_PROVINCES,
  },
  [Terrain.Urban]: {
    base: 96,
    increase: 32,
    weight: 121 / TOTAL_PROVINCES,
  },
};

export const TerrainWeights: number[] = Object.keys(Weights).map(
  (key) => Weights[key as Terrain].weight
);
export const TerrainBase: number[] = Object.keys(Weights).map(
  (key) => Weights[key as Terrain].base
);
export const TerrainIncrease: number[] = Object.keys(Weights).map(
  (key) => Weights[key as Terrain].increase
);
