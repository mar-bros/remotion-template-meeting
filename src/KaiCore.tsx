import React from "react";
import { staticFile } from "remotion";
import { AbsoluteFill, Img, Sequence, Series, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { THEME, PROTOCOL_KEYS } from "./tokens";
import type { KaiCoreProps, LayoutProps } from "./types";
import { CouncilLayout } from "./components/CouncilLayout";
import { PresentationLayout } from "./components/PresentationLayout";
import { Subtitles } from "./components/Subtitles";
import { useScale } from "./hooks/useScale";

// ─── Layout Registry ──────────────────────────────────────────────────────────

const LAYOUTS: Record<string, React.FC<LayoutProps>> = {
  council: CouncilLayout,
  presentation: PresentationLayout,
};

// ─── Main Composition ─────────────────────────────────────────────────────────

export const KaiCore: React.FC<KaiCoreProps> = ({
  scenes,
  title = "会审记录",
}) => {
  const { width, height } = useVideoConfig();
  const { s } = useScale();
  const isVertical = height > width;

  // Pre-calculate cumulative frames spoken by each protocol before each scene
  const { sceneStats, offlineStatus } = React.useMemo(() => {
    const cumulative: Record<string, number>[] = [];
    const activeSpeakers = new Set(scenes.map((sc) => sc.speaker));

    const offlineStatus: Record<string, boolean> = {};
    PROTOCOL_KEYS.forEach((p) => (offlineStatus[p] = !activeSpeakers.has(p)));

    const currentTotals: Record<string, number> = {};
    PROTOCOL_KEYS.forEach((p) => (currentTotals[p] = 0));

    scenes.forEach((scene) => {
      // Record status at start of scene
      cumulative.push({ ...currentTotals });

      // Update totals for next scene
      if (scene.speaker) {
        currentTotals[scene.speaker] += scene.durationInFrames;
      }
    });

    return { sceneStats: cumulative, offlineStatus };
  }, [scenes]);

  // Pre-calculate video start times for asset continuity
  const videoStartTimes = React.useMemo(() => {
    return scenes.map((scene, index) => {
      if (!scene.contentUrl || scene.contentType !== "video") return 0;

      let startTime = 0;
      // Accumulate durations of ALL preceding scenes with the same contentUrl
      for (let i = 0; i < index; i++) {
        if (scenes[i].contentUrl === scene.contentUrl) {
          startTime += scenes[i].durationInFrames;
        }
      }
      return startTime;
    });
  }, [scenes]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: THEME.background,
        paddingBottom: isVertical ? "15%" : 0, // Safe area for Shorts/TikTok
      }}
    >
      {/* Background Desktop */}
      <AbsoluteFill>
        <Img
          src={THEME.desktopBg}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.6,
          }}
        />
      </AbsoluteFill>

      {/* Main Orchestrator: Space-balanced layout */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Series>
          {scenes.map((scene, index) => {
            const LayoutComponent = LAYOUTS[scene.mode];
            if (!LayoutComponent) {
              console.warn(`Unknown layout mode: ${scene.mode}`);
              return null;
            }

            return (
              <Series.Sequence
                key={index}
                durationInFrames={scene.durationInFrames}
              >
                {/* Audio sequencing: only render sequences for segments with audio */}
                {(() => {
                  let offset = 0;
                  return scene.segments.map((segment, sIndex) => {
                    const currentOffset = offset;
                    offset += segment.durationInFrames;
                    if (!segment.audioUrl) return null;
                    return (
                      <Sequence
                        key={`audio-${sIndex}`}
                        from={currentOffset}
                        durationInFrames={segment.durationInFrames}
                        layout="none"
                      >
                        <Audio src={staticFile(segment.audioUrl)} />
                      </Sequence>
                    );
                  });
                })()}

                {/* Subtitle Area — independent layer with stable z-index */}
                <AbsoluteFill style={{ zIndex: 100, pointerEvents: "none" }}>
                  <Series>
                    {scene.segments.map((segment, sIndex) => (
                      <Series.Sequence
                        key={sIndex}
                        durationInFrames={segment.durationInFrames}
                      >
                        <Subtitles text={segment.text} speaker={scene.speaker} />
                      </Series.Sequence>
                    ))}
                  </Series>
                </AbsoluteFill>

                {/* Window Area (Top 92%) - Stays active for entire scene */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "92%",
                    padding: s(10),
                    zIndex: 10,
                  }}
                >
                  <LayoutComponent
                    speaker={scene.speaker}
                    title={title}
                    prevSpeakingFrames={sceneStats[index]}
                    offlineStatus={offlineStatus}
                    contentUrl={scene.contentUrl}
                    contentType={scene.contentType}
                    videoStartTime={videoStartTimes[index]}
                  />
                </div>
              </Series.Sequence>
            );
          })}
        </Series>
      </div>
    </AbsoluteFill>
  );
};
