import { useVideoConfig } from "remotion";

export const useScale = () => {
  const { width, height } = useVideoConfig();
  
  // Base design height is 1080px (standard HD)
  // We use height as the primary scale factor for the "desktop" feel
  const baseHeight = 1080;
  
  const s = (value: number) => {
    return (value / baseHeight) * height;
  };

  // Check if it's a vertical layout (9:16)
  const isVertical = height > width;

  return { s, isVertical, width, height };
};
