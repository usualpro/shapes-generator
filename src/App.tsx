//import { z } from "zod/v4-mini";
import { ShapeGeneratorPanel } from "./ShapeGeneratorPanel";
import { ShapeGeneratorStage } from "./ShapeGeneratorStage";

export const App = () => {
  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-12 md:col-span-9">
        <ShapeGeneratorStage />
      </div>
      <div className="col-span-12 md:col-span-3">
        <ShapeGeneratorPanel />
      </div>
    </div>
  );
};

/*
const Player = z.object({
  username: z.string(),
  xp: z.number(),
});
const vp = {
  username: " z.string()",
  xp: 2,
};
const results = Player.safeParse(vp);
if (!results.success) {
  console.log(results.error);
} else {
  console.log(results.data);
}
*/
