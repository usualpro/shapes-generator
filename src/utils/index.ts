export const canvasSizeRelativeToParent = (
  parent: HTMLElement
): { width: number; height: number } => {
  return {
    width: parent.offsetWidth,
    height: parent.offsetHeight,
  };
};

export const randomize = (): number => Math.random();
