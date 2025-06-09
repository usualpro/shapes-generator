import { create } from "zustand";
import { gsap } from "gsap";
import type {
  ShapeGeneratorState,
  RandomShapeType,
} from "../types/shapesgenerator";
import { canvasSizeRelativeToParent, randomize } from "../utils";
import {
  ExportedRandomShapesSchema,
  AnimationDurationSchema,
  NumberOfRevolutionsSchema,
} from "../schemas/shapesgenerator";
import { colors, easings } from "../consts/shapesgenerator";

export const useShapeGeneratorStore = create<ShapeGeneratorState>(
  (set, get) => {
    // Utility function to get stage children safely
    const getStageChildren = () => {
      const { stage } = get();
      return stage?.getChildren()?.[0]?.children;
    };

    // Utility to update stage size
    const updateStageSize = (stageContainer?: HTMLElement) => {
      if (!stageContainer) return;
      const { width, height } = canvasSizeRelativeToParent(stageContainer);
      set({ stageSize: { width, height } });
    };

    return {
      animationsDuration: 1,
      numberOfRevolutions: 1,
      isAnimated: false,
      stageSize: { width: 0, height: 0 },
      shapes: [],
      stage: undefined,
      stageContainer: undefined,
      tl: undefined,
      animateShape: ({ shapeId }) => {
        const { tl, numberOfRevolutions, animationsDuration, isAnimated } =
          get();
        const children = getStageChildren();
        const animatedShape = children?.[shapeId];
        if (!animatedShape) return;
        if (!isAnimated) {
          const entranceAnimation = gsap.from(animatedShape, {
            scaleX: 2,
            scaleY: 2,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            immediateRender: false,
          });
          entranceAnimation.play();
        } else if (tl) {
          const tln = gsap.timeline();
          tln.to(animatedShape, {
            rotation: `+=${numberOfRevolutions * 360}`,
            duration: animationsDuration,
            ease: gsap.utils.random([...easings]),
            immediateRender: false,
          });
          tln.progress(tl.progress());
        }
      },
      playAnimations: () => {
        const { animationsDuration, numberOfRevolutions } = get();
        const children = getStageChildren();
        if (!children) return;
        const tl = gsap.timeline();
        tl.to(children, {
          rotation: `+=${numberOfRevolutions * 360}`,
          duration: animationsDuration,
          ease: gsap.utils.random([...easings]),
          onStart: () => set({ isAnimated: true }),
          onComplete: () => set({ isAnimated: false }),
          immediateRender: false,
        });
        set({
          tl,
        });
        tl.play();
      },
      addShape: () => {
        set(
          ({
            stageSize: { width: stageWidth, height: stageHeight },
            shapes,
          }) => {
            const padding = 20;
            const width = randomize() * 200 + padding;
            const height = randomize() * 200 + padding;
            const boundSize = Math.sqrt(width * width + height * height);
            const maxX = stageWidth - boundSize / 2;
            const minX = boundSize / 2;
            const maxY = stageHeight - boundSize / 2;
            const minY = boundSize / 2;

            const newShape: RandomShapeType = {
              id: shapes.length,
              x: minX + randomize() * (maxX - minX),
              y: minY + randomize() * (maxY - minY),
              width,
              height,
              fill: gsap.utils.random([...colors]),
              rotation: randomize() * 360,
            };

            return { shapes: [...shapes, newShape] };
          }
        );
      },

      updateShape: ({ shapeId }) => {
        set(({ shapes }) => {
          if (!shapes[shapeId]) return { shapes };
          const availableColors = colors.filter(
            (color) => color !== shapes[shapeId].fill
          );
          if (!availableColors.length) return { shapes };

          const updatedShapes = [...shapes];
          updatedShapes[shapeId] = {
            ...updatedShapes[shapeId],
            fill: gsap.utils.random(availableColors),
          };

          return { shapes: updatedShapes };
        });
      },

      updateStageSize: () => updateStageSize(get().stageContainer),

      exportShapes: () => {
        const { shapes, animationsDuration, numberOfRevolutions } = get();
        if (!shapes.length) return;

        const exportContent = {
          animationsDuration,
          numberOfRevolutions,
          shapes,
        };
        const blob = new Blob([JSON.stringify(exportContent, null, 2)], {
          type: "application/json",
        });
        const timestamp = new Date()
          .toISOString()
          .replace(/[-:T]/g, "")
          .split(".")[0];
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `shapes_${timestamp}.json`;
        link.click();
        URL.revokeObjectURL(link.href);
        link.remove();
      },

      importShapes: () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";
        input.onchange = async (event) => {
          const file = (event.target as HTMLInputElement)?.files?.[0];
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
              numberOfRevolutions: jsonData.numberOfRevolutions,
              shapes: jsonData.shapes,
            });
            updateStageSize(get().stageContainer);
          } catch (error) {
            console.error("Error reading or parsing JSON file:", error);
          }
        };
        input.click();
      },

      setStageContainer: (stageContainer) => {
        set({ stageContainer });
        updateStageSize(stageContainer);
      },

      setAnimationsDuration: (animationsDuration) => {
        if (!AnimationDurationSchema.safeParse(animationsDuration).success) {
          console.error("Invalid animation duration");
          return;
        }
        set({ animationsDuration });
      },

      setNumberOfRevolutions: (numberOfRevolutions) => {
        if (!NumberOfRevolutionsSchema.safeParse(numberOfRevolutions).success) {
          console.error("Invalid number of revolutions");
          return;
        }
        set({ numberOfRevolutions });
      },

      setStage: (stage) => set({ stage }),
    };
  }
);
