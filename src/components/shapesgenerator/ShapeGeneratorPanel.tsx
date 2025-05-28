import { useCallback, type ChangeEvent } from "react";
import { useShapeGeneratorStore } from "../../stores/ShapeGeneratorStore";
import { ShapeGeneratorThemeToggle } from "./ShapeGeneratorThemeToggle";

export const ShapeGeneratorPanel = () => {
  const {
    shapes,
    animationsDuration,
    addShape,
    exportShapes,
    importShapes,
    setAnimationsDuration,
    playAnimations,
  } = useShapeGeneratorStore((state) => state);

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setAnimationsDuration(parseFloat(event.target.value) || 1),
    []
  );

  const hasShapes = shapes.length === 0;

  return (
    <div className="p-4 bg-base-200 h-full flex flex-col gap-3 justify-center">
      <button className="btn btn-primary w-full " onClick={addShape}>
        Add rectangle
      </button>
      <div className="divider"></div>
      <div className="flex flex-col gap-2 ">
        <label className="input  w-full">
          Duration:
          <input
            type="number"
            value={animationsDuration}
            onChange={handleOnChange}
            className="grow input-primary"
            placeholder="1"
          />
          <span className="badge badge-neutral badge-xs">
            second{animationsDuration > 1 ? "s" : ""}
          </span>
        </label>
        <button
          disabled={hasShapes}
          className="btn btn-primary w-full"
          onClick={playAnimations}
        >
          Play
        </button>
      </div>

      <div className="divider"></div>
      <div className="flex flex-col gap-2">
        <button className="btn btn-primary w-full" onClick={importShapes}>
          Import project
        </button>
        <button
          disabled={hasShapes}
          className="btn btn-primary w-full"
          onClick={exportShapes}
        >
          Download project
        </button>
      </div>

      <div className="flex justify-end">
        <ShapeGeneratorThemeToggle />
      </div>
    </div>
  );
};
