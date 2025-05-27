import { z } from "zod/v4-mini";

const RandomShapeSchema = z.object({
  id: z.number(),
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
  fill: z.string(),
  rotation: z.number(),
});

const ShapesArraySchema = z.array(RandomShapeSchema);

export const ExportedRandomShapesSchema = z.object({
  animationsDuration: z.number(),
  shapes: ShapesArraySchema,
});
