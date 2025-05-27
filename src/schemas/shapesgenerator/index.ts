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

// Define the array schema for validation
export const ShapesArraySchema = z.array(RandomShapeSchema);
