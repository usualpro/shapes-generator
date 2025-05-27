import { create } from "zustand";
import {
  type ShapeGeneratorState,
  type RandomShapeType,
  type Color,
} from "../types/shapesgenerator";
import { canvasSizeRelativeToParent, shuffleArray, randomize } from "../utils";
import { ShapesArraySchema } from "../schemas/shapesgenerator";
import { colors } from "../consts/shapesgenerator";

export const useShapeGeneratorStore = create<ShapeGeneratorState>()(
  (set, get) => ({
    stageSize: {
      width: 0,
      height: 0,
    },
    shapes: [],
    stageContainer: undefined,
    addShape: () =>
      set((state) => {
        const {
          stageSize: { width: stageWidth, height: stageHeight },
          shapes,
        } = state;
        const padding = 20;
        const id = shapes.length;
        const x = randomize() * stageWidth - padding;
        const y = randomize() * stageHeight - padding;
        const width = randomize() * 100 + padding;
        const height = randomize() * 100 + padding;
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
    exportShapes: () => {
      const { shapes } = get();
      if (shapes.length > 0) {
        const jsonString = JSON.stringify(shapes, null, 2);
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
          const validationResult = ShapesArraySchema.safeParse(jsonData);
          if (!validationResult.success) {
            console.error("Validation failed:", validationResult.error);
            return;
          }
          set({
            shapes: [...jsonData],
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
  })
);
