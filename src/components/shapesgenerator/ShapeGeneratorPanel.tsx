import { useCallback, type ChangeEvent } from "react";
import { useShapeGeneratorStore } from "../../stores/ShapeGeneratorStore";

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
    <div className="p-4 bg-[green] h-full flex flex-col gap-4 justify-center">
      <button className="btn w-full" onClick={addShape}>
        Add rectangle
      </button>
      <div className="divider"></div>
      <label className="input  w-full">
        Duration
        <input
          type="number"
          value={animationsDuration}
          onChange={handleOnChange}
          className="grow"
          placeholder="1"
        />
        <span className="badge badge-neutral badge-xs">seconds</span>
      </label>
      <button
        disabled={hasShapes}
        className="btn w-full"
        onClick={playAnimations}
      >
        Play
      </button>
      <div className="divider"></div>
      <button className="btn w-full" onClick={importShapes}>
        Import project
      </button>
      <button
        disabled={hasShapes}
        className="btn w-full"
        onClick={exportShapes}
      >
        Download project
      </button>
    </div>
  );
};
