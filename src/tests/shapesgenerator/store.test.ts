import { expect, test, beforeEach } from "vitest";
import { useShapeGeneratorStore } from "../../stores/ShapeGeneratorStore";
import { colors } from "../../consts/shapesgenerator";

const mockColors = [...colors];

beforeEach(() => {
  useShapeGeneratorStore.setState({
    animationsDuration: 1,
    numberOfRevolutions: 1,
    stageSize: { width: 0, height: 0 },
    shapes: [],
    stage: undefined,
    stageContainer: undefined,
  });
});

test("Check if initials setting is default", () => {
  const { shapes, animationsDuration, numberOfRevolutions } =
    useShapeGeneratorStore.getState();
  expect(shapes.length).toBe(0);
  expect(animationsDuration).toBe(1);
  expect(numberOfRevolutions).toBe(1);
});

test("Check if we can add a new shape", () => {
  const { shapes: initialShapes, addShape } = useShapeGeneratorStore.getState();
  expect(initialShapes.length).toBe(0);
  addShape();
  const { shapes: updatedShapes } = useShapeGeneratorStore.getState();
  expect(updatedShapes.length).toBe(1);
  expect(updatedShapes[0]).toHaveProperty("id", 0);
  expect(mockColors).toContain(updatedShapes[0].fill);
});

test("Check if we can update the animation duration", () => {
  const {
    animationsDuration: initialAnimationDuration,
    setAnimationsDuration,
  } = useShapeGeneratorStore.getState();
  const newDuration = 10;
  expect(initialAnimationDuration).toBe(1);
  setAnimationsDuration(newDuration);
  const { animationsDuration: updatedAnimationDuration } =
    useShapeGeneratorStore.getState();
  expect(updatedAnimationDuration).toBe(newDuration);
});

test("Check if we can update the revolution number", () => {
  const {
    numberOfRevolutions: initialNumberOfRevolutions,
    setNumberOfRevolutions,
  } = useShapeGeneratorStore.getState();
  const newNumberOfRevolutions = 10;
  expect(initialNumberOfRevolutions).toBe(1);
  setNumberOfRevolutions(newNumberOfRevolutions);
  const { numberOfRevolutions: updatedNumberOfRevolutions } =
    useShapeGeneratorStore.getState();
  expect(updatedNumberOfRevolutions).toBe(newNumberOfRevolutions);
});

test("should update a shape's color", () => {
  const { addShape, updateShape } = useShapeGeneratorStore.getState();
  addShape();
  const { shapes } = useShapeGeneratorStore.getState();
  const initialColor = shapes[0].fill;
  updateShape({ shapeId: 0 });
  const updatedState = useShapeGeneratorStore.getState();
  expect(updatedState.shapes.length).toBe(1);
  expect(updatedState.shapes[0].fill).not.toBe(initialColor);
  expect(mockColors).toContain(updatedState.shapes[0].fill);
});
