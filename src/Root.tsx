import "./index.css";
import { Composition } from "remotion";
import { KaiCore } from "./KaiCore";
import { sampleScript, calculateTotalDuration } from "./data/sampleScript";

export const RemotionRoot: React.FC = () => {
  const durationInFrames = calculateTotalDuration(sampleScript);

  return (
    <>
      <Composition
        id="KaiPodcast"
        component={() => <KaiCore scenes={sampleScript} />}
        durationInFrames={durationInFrames}
        fps={30}
        width={1280}
        height={720}
      />

      {/* 竖屏版本测试 */}
      <Composition
        id="KaiPodcastVertical"
        component={() => <KaiCore scenes={sampleScript} />}
        durationInFrames={durationInFrames}
        fps={30}
        width={720}
        height={1280}
      />
    </>
  );
};
