import { Rect } from "react-konva";
import { useShapeGeneratorStore } from "../../stores/ShapeGeneratorStore";
import { useCallback } from "react";
import type { RandomShapeType } from "../../types/shapesgenerator";

export const ShapeItem = ({
  id: shapeId,
  x,
  y,
  width,
  height,
  fill,
  rotation,
}: RandomShapeType) => {
  const { updateShape } = useShapeGeneratorStore((state) => state);

  const handleOnClick = useCallback(
    () =>
      updateShape({
        shapeId,
      }),
    []
  );

  const offset = {
    x: width / 2,
    y: height / 2,
  };

  return (
    <Rect
      onClick={handleOnClick}
      {...{ x }}
      {...{ y }}
      {...{ width }}
      {...{ height }}
      {...{ fill }}
      {...{ rotation }}
      {...{ offset }}
    />
  );
};
