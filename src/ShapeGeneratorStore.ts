import { create } from "zustand";

interface ShapeGeneratorState {
  shapes: {}[];
  add: (shape: {}) => void;
}

export const useShapeGeneratorStore = create<ShapeGeneratorState>()((set) => ({
  shapes: [],
  add: (shape) => set((state) => ({ shapes: [shape, ...state.shapes] })),
}));
