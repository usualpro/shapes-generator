import { useEffect, useRef } from "react";
import { Stage, Layer } from "react-konva";
import { useShapeGeneratorStore } from "./ShapeGeneratorStore";
import { ShapeItem } from "./ShapeItem";

export const ShapeGeneratorStage = () => {
  const stageContainerRef = useRef<HTMLDivElement>(null);

  const { shapes, updateStageSize, stageSize } = useShapeGeneratorStore(
    (state) => state
  );

  useEffect(() => {
    if (stageContainerRef?.current) {
      updateStageSize(stageContainerRef.current);
      window.addEventListener("resize", () =>
        updateStageSize(stageContainerRef.current as HTMLDivElement)
      );
    }
  }, []);

  return (
    <div className="w-full h-full bg-[purple]" ref={stageContainerRef}>
      <Stage
        width={stageSize.width}
        height={stageSize.height}
        className="h-full"
      >
        <Layer>
          {shapes.map((shape, index) => {
            const { x, y, width, height, fill, rotation } = shape;
            return (
              <ShapeItem
                key={`ShapeGeneratorRect-${index}`}
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
