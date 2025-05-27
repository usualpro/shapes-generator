export const canvasSizeRelativeToParent = (
  parent: HTMLElement
): { width: number; height: number } => {
  return {
    width: parent.offsetWidth,
    height: parent.offsetHeight,
  };
};

export const randomize = (): number => Math.random();

export const shuffleArray = <T>(array: readonly T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
