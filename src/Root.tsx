import "./index.css";
import React from "react";
import { Composition, getInputProps, staticFile } from "remotion";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { KaiCore } from "./KaiCore";
import {
  sampleScript,
  sampleIntro,
  sampleDetailedIntro,
  sampleOutro,
  sampleAiDisclaimer
} from "./data/sampleScript";
import type { SceneInput, DialogueSegment, Scene, DetailedIntroProps } from "./types";
import { KaiCoreSchema } from "./types";

export const RemotionRoot: React.FC = () => {
  const inputProps = getInputProps();
  const rawScenes = (inputProps.scenes as SceneInput[] | undefined) || sampleScript;
  const intro = inputProps.intro || sampleIntro;
  const title = (inputProps.title as string) || intro?.title || "会审记录";
  const detailedIntro = inputProps.detailedIntro || sampleDetailedIntro;
  const outro = inputProps.outro || sampleOutro;
  const aiDisclaimer = inputProps.aiDisclaimer as string || sampleAiDisclaimer;

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

          // 1. Calculate Intro Duration
          let introDuration = 0;
          if (props.intro) {
            introDuration = props.intro.durationInFrames || 6; // 0.2s default
          }
          totalDuration += introDuration;

          // 2. Calculate Detailed Intro Duration
          let detailedIntroDuration = 0;
          if (props.detailedIntro) {
            const di = props.detailedIntro as DetailedIntroProps;
            if (di.durationInFrames) {
              detailedIntroDuration = di.durationInFrames;
            } else if (di.audioUrl) {
              try {
                const seconds = await getAudioDurationInSeconds(staticFile(di.audioUrl));
                detailedIntroDuration = Math.ceil(seconds * fps);
              } catch (e) {
                detailedIntroDuration = 150; // Fallback 5s
              }
            } else {
              // Estimate based on text length + punctuation rhythm
              const text = di.text || "";
              const punctuationCount = (text.match(/[，。！？；]/g) || []).length;
              const baseSpeed = 2; // Increased speed (2 frames per char instead of 4)
              const typingDuration = (text.length * baseSpeed) + (punctuationCount * 5);
              const postWait = di.postWaitDurationInFrames ?? 60; // Default 2s (60 frames)
              detailedIntroDuration = Math.min(300, typingDuration + postWait); // Capped at 10s (300 frames)
            }
          }
          totalDuration += detailedIntroDuration;

          // 3. Main Scenes Duration
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

          // 4. Outro Duration
          let outroDuration = 0;
          if (props.outro) {
            outroDuration = props.outro.durationInFrames || 150; // 5s default
          }
          totalDuration += outroDuration;

          return {
            durationInFrames: Math.max(1, totalDuration),
            props: {
              ...props,
              scenes: resolvedScenes,
              // Pass down resolved durations
              intro: props.intro ? { ...props.intro, durationInFrames: introDuration } : undefined,
              detailedIntro: props.detailedIntro ? { ...props.detailedIntro, durationInFrames: detailedIntroDuration } : undefined,
              outro: props.outro ? { ...props.outro, durationInFrames: outroDuration } : undefined,
            },
          };
        }}
        defaultProps={{
          scenes: rawScenes as unknown as Scene[], // Schema handles validation at boundary
          title,
          intro,
          detailedIntro,
          outro,
          aiDisclaimer,
        }}
      />
    </>
  );
};
