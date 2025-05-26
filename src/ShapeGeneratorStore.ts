import { create } from "zustand";

//consts
const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "cyan",
  "purple",
] as const;

//types
type Color = (typeof colors)[number];

export type RandomShapeType = {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: Color;
  rotation: number;
};

type ShapeGeneratorState = {
  stageSize: {
    width: number;
    height: number;
  };
  shapes: RandomShapeType[];
  add: () => void;
  updateStageSize: (parent: HTMLElement) => void;
};

//utils
const canvasSizeRelativeToParent = (
  parent: HTMLElement
): { width: number; height: number } => {
  return {
    width: parent.offsetWidth,
    height: parent.offsetHeight,
  };
};

const randomize = (): number => Math.random();

const shuffleArray = <T>(array: readonly T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useShapeGeneratorStore = create<ShapeGeneratorState>()((set) => ({
  stageSize: {
    width: 0,
    height: 0,
  },
  shapes: [],
  updateStageSize: (parent) => {
    const { width, height } = canvasSizeRelativeToParent(parent);
    const stageSize = {
      width,
      height,
    };
    set(() => ({
      stageSize,
    }));
  },
  add: () =>
    set((state) => {
      const {
        stageSize: { width: stageWidth, height: stageHeight },
        shapes,
      } = state;
      const x = randomize() * stageWidth - 20;
      const y = randomize() * stageHeight - 20;
      const width = randomize() * 100 + 20;
      const height = randomize() * 100 + 20;
      const shuffledColors = shuffleArray(colors);
      const fill: Color =
        shuffledColors[Math.floor(randomize() * colors.length)];
      const rotation = randomize() * 360;
      const newShape: RandomShapeType = {
        x,
        y,
        width,
        height,
        fill,
        rotation,
      };
      return { shapes: [...shapes, newShape] };
    }),
}));
