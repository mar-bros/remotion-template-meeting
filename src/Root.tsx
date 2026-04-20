import "./index.css";
import { Composition, getInputProps, staticFile } from "remotion";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { KaiCore, Scene } from "./KaiCore";
import { sampleScript } from "./data/sampleScript";

export const RemotionRoot: React.FC = () => {
  const inputProps = getInputProps();
  const rawScenes = inputProps.scenes || sampleScript;
  const title = inputProps.title || "数字永生协议会审";
  const fps = 30;

  return (
    <>
      <Composition
        id="KaiPodcast"
        component={KaiCore}
        durationInFrames={1} // Placeholder, overridden by calculateMetadata
        fps={fps}
        width={1280}
        height={820}
        schema={null}
        calculateMetadata={async ({ props }) => {
          const resolvedScenes: Scene[] = [];
          let totalDuration = 0;

          for (const rawScene of (props.scenes as any[])) {
            let sceneDuration = 0;
            const resolvedSegments = [];

            for (const segment of rawScene.segments) {
              let duration = segment.durationInFrames;

              if (!duration) {
                if (segment.audioUrl) {
                  try {
                    const seconds = await getAudioDurationInSeconds(staticFile(segment.audioUrl));
                    duration = Math.ceil(seconds * fps);
                  } catch (e) {
                    console.warn(`Failed to get duration for ${segment.audioUrl}`, e);
                    duration = 90; // Fallback 3s
                  }
                } else {
                  duration = 90; // Default 3s if no audio
                }
              }

              resolvedSegments.push({
                ...segment,
                durationInFrames: duration,
              });
              sceneDuration += duration;
            }

            resolvedScenes.push({
              ...rawScene,
              segments: resolvedSegments,
              durationInFrames: sceneDuration,
            });
            totalDuration += sceneDuration;
          }

          return {
            durationInFrames: Math.max(1, totalDuration),
            props: {
              ...props,
              scenes: resolvedScenes,
            },
          };
        }}
        defaultProps={{
          scenes: rawScenes,
          title
        }}
      />
    </>
  );
};
