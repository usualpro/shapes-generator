import { useShapeGeneratorStore } from "../../stores/ShapeGeneratorStore";

export const ShapeGeneratorPanel = () => {
  const { addShape, exportShapes, importShapes } = useShapeGeneratorStore(
    (state) => state
  );

  return (
    <div className="p-4 bg-[green] h-full flex flex-col gap-4">
      <button className="btn w-full" onClick={addShape}>
        Add rectangle
      </button>
      <button className="btn w-full" onClick={importShapes}>
        Import project
      </button>
      <button className="btn w-full" onClick={exportShapes}>
        Download project
      </button>
    </div>
  );
};
