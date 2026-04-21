import "./index.css";
import { Composition, getInputProps, staticFile } from "remotion";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { KaiCore } from "./KaiCore";
import { sampleScript } from "./data/sampleScript";
import type { SceneInput, DialogueSegment, Scene } from "./types";
import { KaiCoreSchema } from "./types";

export const RemotionRoot: React.FC = () => {
  const inputProps = getInputProps();
  const rawScenes = (inputProps.scenes as SceneInput[] | undefined) || sampleScript;
  const title = (inputProps.title as string) || "数字永生协议会审";
  const fps = 30;

  return (
    <>
      <Composition
        id="KaiPodcast"
        component={KaiCore as unknown as React.FC<Record<string, unknown>>}
        durationInFrames={1} // Placeholder, overridden by calculateMetadata
        fps={fps}
        width={1280}
        height={820}
        schema={KaiCoreSchema}
        calculateMetadata={async ({ props }) => {
          const scenes = props.scenes as SceneInput[];
          const resolvedScenes: Scene[] = [];
          let totalDuration = 0;

          // Parallel: resolve all audio durations at once
          const allSegmentDurations: Promise<number>[] = [];
          const segmentMap: { sceneIdx: number; segIdx: number }[] = [];

          for (let si = 0; si < scenes.length; si++) {
            const rawScene = scenes[si];
            for (let sgi = 0; sgi < rawScene.segments.length; sgi++) {
              const segment = rawScene.segments[sgi];
              if (segment.durationInFrames) {
                allSegmentDurations.push(
                  Promise.resolve(segment.durationInFrames),
                );
              } else if (segment.audioUrl) {
                allSegmentDurations.push(
                  getAudioDurationInSeconds(staticFile(segment.audioUrl))
                    .then((seconds) => Math.ceil(seconds * fps))
                    .catch((e) => {
                      console.warn(
                        `Failed to get duration for ${segment.audioUrl}`,
                        e,
                      );
                      return 90; // Fallback 3s
                    }),
                );
              } else {
                allSegmentDurations.push(Promise.resolve(90)); // Default 3s
              }
              segmentMap.push({ sceneIdx: si, segIdx: sgi });
            }
          }

          const durations = await Promise.all(allSegmentDurations);

          // Rebuild scenes with resolved durations
          const durationByScene: Map<number, DialogueSegment[]> = new Map();
          for (let i = 0; i < segmentMap.length; i++) {
            const { sceneIdx, segIdx } = segmentMap[i];
            if (!durationByScene.has(sceneIdx)) {
              durationByScene.set(sceneIdx, []);
            }
            const rawSegment = scenes[sceneIdx].segments[segIdx];
            durationByScene.get(sceneIdx)!.push({
              ...rawSegment,
              durationInFrames: durations[i],
            });
          }

          for (let si = 0; si < scenes.length; si++) {
            const rawScene = scenes[si];
            const resolvedSegments = durationByScene.get(si) || [];
            const sceneDuration = resolvedSegments.reduce(
              (sum, seg) => sum + seg.durationInFrames,
              0,
            );
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
          scenes: rawScenes as unknown as Scene[], // Schema handles validation at boundary
          title,
        }}
      />
    </>
  );
};
