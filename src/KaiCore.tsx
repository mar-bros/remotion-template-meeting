import React from "react";
import { staticFile } from "remotion";
import { AbsoluteFill, Audio, Img, Series, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME, ProtocolType } from "./tokens";
import { CouncilLayout } from "./components/CouncilLayout";
import { PresentationLayout } from "./components/PresentationLayout";
import { Subtitles } from "./components/Subtitles";
import { useScale } from "./hooks/useScale";

export interface Scene {
  durationInFrames: number;
  mode: "council" | "presentation";
  speaker: ProtocolType;
  text: string;
  audioUrl?: string; // NEW: Path to the TTS audio file in public/
  contentUrl?: string;
  contentType?: "image" | "video";
}

interface KaiCoreProps {
  scenes: Scene[];
  title?: string;
}

export const KaiCore: React.FC<KaiCoreProps> = ({ scenes, title = "会审记录" }) => {
  const { width, height } = useVideoConfig();
  const { s } = useScale();
  const isVertical = height > width;

  // Pre-calculate cumulative frames spoken by each protocol before each scene
  const sceneStats = React.useMemo(() => {
    const protocols: ProtocolType[] = ["blue", "white", "red", "black", "yellow", "green"];
    const cumulative: Record<string, number>[] = [];

    let currentTotals: Record<string, number> = {};
    protocols.forEach(p => currentTotals[p] = 0);

    scenes.forEach(scene => {
      // Record status at start of scene
      cumulative.push({ ...currentTotals });

      // Update totals for next scene
      if (scene.speaker) {
        currentTotals[scene.speaker] += scene.durationInFrames;
      }
    });

    return cumulative;
  }, [scenes]);

  // Asset continuity logic:
  const getVideoStartTime = (index: number) => {
    const currentScene = scenes[index];
    if (!currentScene.contentUrl || currentScene.contentType !== "video") return 0;

    let startTime = 0;
    for (let i = index - 1; i >= 0; i--) {
      if (scenes[i].contentUrl === currentScene.contentUrl) {
        startTime += scenes[i].durationInFrames;
      } else {
        break;
      }
    }
    return startTime;
  };

  return (
    <AbsoluteFill style={{
      backgroundColor: THEME.background,
      paddingBottom: isVertical ? "15%" : 0 // Safe area for Shorts/TikTok
    }}>
      {/* Background Desktop */}
      <AbsoluteFill>
        <Img
          src={THEME.desktopBg}
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }}
        />
      </AbsoluteFill>

      {/* Main Orchestrator: Space-balanced layout */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column"
      }}>
        <Series>
          {scenes.map((scene, index) => {
            const videoStartTime = getVideoStartTime(index);
            return (
              <Series.Sequence key={index} durationInFrames={scene.durationInFrames}>
                {/* Optional Audio Playback */}
                {scene.audioUrl && (
                  <Audio src={staticFile(scene.audioUrl)} />
                )}

                {/* Window Area (Top 82%) */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "92%",
                  padding: s(10),
                }}>
                  {scene.mode === "council" ? (
                    <CouncilLayout
                      speaker={scene.speaker}
                      title={title}
                      prevSpeakingFrames={sceneStats[index]}
                    />
                  ) : (
                    <PresentationLayout
                      speaker={scene.speaker}
                      contentUrl={scene.contentUrl}
                      contentType={scene.contentType}
                      videoStartTime={videoStartTime}
                      title={title}
                      prevSpeakingFrames={sceneStats[index]}
                    />
                  )}
                </div>

                {/* Subtitle Area (Bottom 18%) */}
                <Subtitles text={scene.text} speaker={scene.speaker} />
              </Series.Sequence>
            );
          })}
        </Series>
      </div>
    </AbsoluteFill>
  );
};
