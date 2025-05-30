import { Rect } from "react-konva";
import { useShapeGeneratorStore } from "../../stores/ShapeGeneratorStore";
import { useCallback, useEffect } from "react";
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
  const { updateShape, animateShape } = useShapeGeneratorStore(
    (state) => state
  );

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

  useEffect(
    () =>
      animateShape({
        shapeId,
      }),
    []
  );

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
