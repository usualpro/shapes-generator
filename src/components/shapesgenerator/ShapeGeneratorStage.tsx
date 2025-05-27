import { useEffect, useRef } from "react";
import { Stage, Layer } from "react-konva";
import { useShapeGeneratorStore } from "../../stores/ShapeGeneratorStore";
import { ShapeItem } from "./ShapeItem";

export const ShapeGeneratorStage = () => {
  const stageContainerRef = useRef<HTMLDivElement>(null);

  const { shapes, updateStageSize, stageSize, setStageContainer } =
    useShapeGeneratorStore((state) => state);

  useEffect(() => {
    if (stageContainerRef?.current) {
      setStageContainer(stageContainerRef?.current);
      updateStageSize();
      window.addEventListener("resize", () => updateStageSize());
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          updateStageSize();
        }
      });
      return () => {
        window.removeEventListener("resize", updateStageSize);
        document.removeEventListener("visibilitychange", updateStageSize);
      };
    }
  }, []);

  return (
    <div className="w-full h-full bg-[purple]" ref={stageContainerRef}>
      <Stage
        width={stageSize.width}
        height={stageSize.height}
        className="h-full"
        draggable
      >
        <Layer>
          {shapes.map((shape, index) => {
            const { id, x, y, width, height, fill, rotation } = shape;
            return (
              <ShapeItem
                key={`ShapeGeneratorRect-${index}`}
                {...{ id }}
                {...{ x }}
                {...{ y }}
                {...{ width }}
                {...{ height }}
                {...{ fill }}
                {...{ rotation }}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};
