import "./index.css";
import { Composition, getInputProps } from "remotion";
import { KaiCore } from "./KaiCore";
import { sampleScript, calculateTotalDuration } from "./data/sampleScript";

export const RemotionRoot: React.FC = () => {
  // Get dynamic props from CLI/API via --props
  const inputProps = getInputProps();
  const scenes = inputProps.scenes || sampleScript;
  const title = inputProps.title || "数字永生协议会审";

  // Dynamically calculate duration based on current scripted total
  const durationInFrames = calculateTotalDuration(scenes);

  return (
    <>
      <Composition
        id="KaiPodcast"
        component={KaiCore}
        durationInFrames={durationInFrames}
        fps={30}
        width={1280}
        height={820}
        defaultProps={{
          scenes,
          title
        }}
      />
    </>
  );
};
