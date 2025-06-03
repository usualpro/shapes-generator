import type Konva from "konva";
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
  isAnimated: boolean;
  animationsDuration: number;
  numberOfRevolutions: number;
  stageSize: {
    width: number;
    height: number;
  };
  stageContainer: HTMLDivElement | undefined;
  stage: Konva.Stage | undefined;
  shapes: RandomShapeType[];
  playAnimations: () => void;
  addShape: () => void;
  updateShape: (shape: { shapeId: number }) => void;
  animateShape: (shape: { shapeId: number }) => void;
  exportShapes: () => void;
  importShapes: () => void;
  setStageContainer: (stageContainer: HTMLDivElement) => void;
  setAnimationsDuration: (animationsDuration: number) => void;
  setNumberOfRevolutions: (numberOfRevolutions: number) => void;
  setStage: (stage: Konva.Stage) => void;
  updateStageSize: () => void;
};
