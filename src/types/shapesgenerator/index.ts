import type { colors } from "../../consts/shapesgenerator";

export type Color = (typeof colors)[number];

export type RandomShapeType = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: Color;
  rotation: number;
};

export type ShapeGeneratorState = {
  stageSize: {
    width: number;
    height: number;
  };
  stageContainer: HTMLDivElement | undefined;
  shapes: RandomShapeType[];
  addShape: () => void;
  updateShape: (shape: { shapeId: number }) => void;
  exportShapes: () => void;
  importShapes: () => void;
  setStageContainer: (stageContainer: HTMLDivElement) => void;
  updateStageSize: () => void;
};
