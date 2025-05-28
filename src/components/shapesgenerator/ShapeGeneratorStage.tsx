import { useEffect, useRef } from "react";
import { Stage, Layer } from "react-konva";
import { useShapeGeneratorStore } from "../../stores/ShapeGeneratorStore";
import { ShapeItem } from "./ShapeItem";
import type Konva from "konva";

export const ShapeGeneratorStage = () => {
  const stageContainerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);

  const { shapes, updateStageSize, stageSize, setStageContainer, setStage } =
    useShapeGeneratorStore((state) => state);

  useEffect(() => {
    if (stageContainerRef.current && stageRef.current) {
      setStageContainer(stageContainerRef.current);
      setStage(stageRef.current);
      updateStageSize();
      window.addEventListener("resize", () => updateStageSize());
      return () => {
        window.removeEventListener("resize", updateStageSize);
      };
    }
  }, []);

  return (
    <div className="w-full h-full bg-base-300" ref={stageContainerRef}>
      <Stage
        ref={stageRef}
        width={stageSize.width}
        height={stageSize.height}
        className="h-full"
        draggable={false}
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
