import { useCallback } from "react";
import { useShapeGeneratorStore } from "./ShapeGeneratorStore";

export const ShapeGeneratorPanel = () => {
  const { add: addShape } = useShapeGeneratorStore((state) => state);
  const handleCLick = useCallback(() => addShape({}), []);
  return (
    <div className="p-4 bg-[green] h-full">
      <button className="btn w-full" onClick={handleCLick}>
        ADD A SHAPE
      </button>
    </div>
  );
};
