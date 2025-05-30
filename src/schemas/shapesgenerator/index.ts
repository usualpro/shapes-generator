import { z } from "zod";

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

export const AnimationDurationSchema = z.number().min(1);

export const NumberOfRevolutionsSchema = z.number().min(1);

export const ExportedRandomShapesSchema = z.object({
  animationsDuration: AnimationDurationSchema,
  numberOfRevolutions: NumberOfRevolutionsSchema,
  shapes: ShapesArraySchema,
});
