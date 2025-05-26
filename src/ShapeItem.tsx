import { Rect } from "react-konva";
import type { RandomShapeType } from "./ShapeGeneratorStore";

export const ShapeItem = ({
  x,
  y,
  width,
  height,
  fill,
  rotation,
}: RandomShapeType) => (
  <Rect
    {...{ x }}
    {...{ y }}
    {...{ width }}
    {...{ height }}
    {...{ fill }}
    {...{ rotation }}
    draggable
    shadowBlur={10}
  />
);
