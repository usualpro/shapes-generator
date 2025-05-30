import { create } from "zustand";
import { gsap } from "gsap";
import type {
  ShapeGeneratorState,
  RandomShapeType,
  Color,
} from "../types/shapesgenerator";
import { canvasSizeRelativeToParent, shuffleArray, randomize } from "../utils";
import {
  ExportedRandomShapesSchema,
  AnimationDurationSchema,
} from "../schemas/shapesgenerator";
import { colors, easings } from "../consts/shapesgenerator";
import type Konva from "konva";

export const useShapeGeneratorStore = create<ShapeGeneratorState>()(
  (set, get) => ({
    animationsDuration: 1,
    stageSize: {
      width: 0,
      height: 0,
    },
    shapes: [],
    stage: undefined,
    stageContainer: undefined,
    playAnimations: () => {
      const { stage, animationsDuration: duration } = get();
      const shapes = stage?.getChildren();
      const ease = easings[Math.floor(randomize() * easings.length)];
      const numRotations = Math.floor(randomize() * easings.length) + 1;
      if (shapes) {
        const { children } = shapes[0];
        for (let n = 0; n < children.length; n++) {
          const shape = children[n] as Konva.Rect;
          const rotation = "+=" + numRotations * 360;
          /*If we only need a single revolution animation:
          const rotation = `+=360`;*/
          gsap.to(shape, {
            rotation,
            duration,
            ease,
          });
        }
      }
    },
    addShape: () =>
      set((state) => {
        const {
          stageSize: { width: stageWidth, height: stageHeight },
          shapes,
        } = state;
        const padding = 20;
        const id = shapes.length;
        const width = randomize() * 200 + padding;
        const height = randomize() * 200 + padding;
        const boundSize = Math.sqrt(width * width + height * height);
        const maxX = stageWidth - boundSize / 2;
        const minX = boundSize / 2;
        const maxY = stageHeight - boundSize / 2;
        const minY = boundSize / 2;
        const x = minX + randomize() * (maxX - minX);
        const y = minY + randomize() * (maxY - minY);
        const shuffledColors = shuffleArray(colors);
        const fill: Color =
          shuffledColors[Math.floor(randomize() * colors.length)];
        const rotation = randomize() * 360;
        const newShape: RandomShapeType = {
          id,
          x,
          y,
          width,
          height,
          fill,
          rotation,
        };
        return { shapes: [...shapes, newShape] };
      }),
    updateShape: ({ shapeId }) =>
      set((state) => {
        const { shapes } = state;
        const updatedShapes = [...shapes];
        const shuffledColors = shuffleArray(colors);
        const fill: Color =
          shuffledColors[Math.floor(randomize() * colors.length)];
        updatedShapes[shapeId].fill = fill;
        return { shapes: [...updatedShapes] };
      }),
    updateStageSize: () => {
      const { stageContainer } = get();
      if (stageContainer) {
        const { width, height } = canvasSizeRelativeToParent(stageContainer);
        const stageSize = {
          width,
          height,
        };
        set(() => ({
          stageSize,
        }));
      }
    },
    exportShapes: () => {
      const { shapes, animationsDuration } = get();
      if (shapes.length > 0) {
        const exportContent = {
          animationsDuration,
          shapes,
        };
        const jsonString = JSON.stringify(exportContent, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const timestamp = new Date()
          .toISOString()
          .replace(/[-:T]/g, "")
          .split(".")[0];
        const defaultFileName = `shapes_${timestamp}.json`;
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = defaultFileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      }
    },
    importShapes: () => {
      const { updateStageSize } = get();
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json";
      input.addEventListener("change", async (event) => {
        const target = event.target as HTMLInputElement;
        if (!target || !target.files || target.files.length === 0) return;
        const file = target.files[0];
        if (!file) return;
        try {
          const text = await file.text();
          const jsonData = JSON.parse(text);
          const validationResult =
            ExportedRandomShapesSchema.safeParse(jsonData);
          if (!validationResult.success) {
            console.error("Validation failed:", validationResult.error);
            return;
          }
          set({
            animationsDuration: jsonData.animationsDuration,
            shapes: [...jsonData.shapes],
          });
          updateStageSize();
        } catch (error) {
          console.error("Error reading or parsing JSON file:", error);
        }
      });
      input.click();
    },
    setStageContainer: (stageContainer) =>
      set(() => ({
        stageContainer,
      })),
    setAnimationsDuration: (animationsDuration) => {
      const validationResult =
        AnimationDurationSchema.safeParse(animationsDuration);
      if (!validationResult.success) {
        console.error("Validation failed:", validationResult.error);
        return;
      }
      set(() => ({
        animationsDuration,
      }));
    },
    setStage: (stage) => set(() => ({ stage })),
  })
);
