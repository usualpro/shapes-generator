import { useShapeGeneratorStore } from "./ShapeGeneratorStore";

export const ShapeGeneratorPanel = () => {
  const { add: addShape } = useShapeGeneratorStore((state) => state);
  return (
    <div className="p-4 bg-[green] h-full">
      <button className="btn w-full" onClick={addShape}>
        ADD A SHAPE
      </button>
    </div>
  );
};
