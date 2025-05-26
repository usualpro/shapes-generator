import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Circle, Text } from "react-konva";
import { useShapeGeneratorStore } from "./ShapeGeneratorStore";

export const ShapeGeneratorStage = () => {
  const stageContainerRef = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });

  const { shapes } = useShapeGeneratorStore((state) => state);

  useEffect(() => {
    const updateSize = () => {
      if (stageContainerRef.current) {
        const width = stageContainerRef.current.clientWidth;
        const height = stageContainerRef.current.clientHeight;
        setStageSize({ width, height });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="w-full h-full bg-[purple]" ref={stageContainerRef}>
      <Stage
        width={stageSize.width}
        height={stageSize.height}
        className="h-full"
      >
        <Layer>
          {/*<Text text="Try to drag shapes" fontSize={15} x={100} y={100} />*/}
          {shapes.map((_shape, index) => (
            <Rect
              key={`ShapeGeneratorRect-${index}`}
              x={20}
              y={50}
              width={100}
              height={100}
              fill="red"
              shadowBlur={10}
              draggable
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};
