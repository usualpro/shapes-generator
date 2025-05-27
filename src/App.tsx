import { ShapeGeneratorPanel } from "./components/shapesgenerator/ShapeGeneratorPanel";
import { ShapeGeneratorStage } from "./components/shapesgenerator/ShapeGeneratorStage";

export const App = () => (
  <div className="grid grid-cols-12 h-screen ">
    <div className="col-span-12 md:col-span-9 h-[50vh] md:h-full">
      <ShapeGeneratorStage />
    </div>
    <div className="col-span-12 md:col-span-3 h-[50vh] md:h-full">
      <ShapeGeneratorPanel />
    </div>
  </div>
);
