import React from "react";
import { staticFile } from "remotion";
import { AbsoluteFill, Img, Series, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME, ProtocolType } from "./tokens";
import { CouncilLayout } from "./components/CouncilLayout";
import { PresentationLayout } from "./components/PresentationLayout";

export interface Scene {
  durationInFrames: number;
  mode: "council" | "presentation";
  speaker: ProtocolType;
  text: string;
  contentUrl?: string;
  contentType?: "image" | "video";
}

interface KaiCoreProps {
  scenes: Scene[];
}

export const KaiCore: React.FC<KaiCoreProps> = ({ scenes }) => {
  const { width, height } = useVideoConfig();

  // Asset continuity logic:
  // We need to calculate how long a video has been playing if it spans multiple scenes
  const getVideoStartTime = (index: number) => {
    const currentScene = scenes[index];
    if (!currentScene.contentUrl || currentScene.contentType !== "video") return 0;

    let startTime = 0;
    // Look backwards for the same video URL
    for (let i = index - 1; i >= 0; i--) {
      if (scenes[i].contentUrl === currentScene.contentUrl) {
        startTime += scenes[i].durationInFrames;
      } else {
        break; // Found a different asset or none
      }
    }
    return startTime;
  };

  return (
    <AbsoluteFill style={{ backgroundColor: THEME.background }}>
      {/* Background Desktop */}
      <AbsoluteFill>
        <Img 
          src={THEME.desktopBg} 
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} 
        />
      </AbsoluteFill>

      {/* Main Orchestrator via Series */}
      <Series>
        {scenes.map((scene, index) => (
          <Series.Sequence key={index} durationInFrames={scene.durationInFrames}>
            {scene.mode === "council" ? (
              <CouncilLayout speaker={scene.speaker} />
            ) : (
              <PresentationLayout 
                speaker={scene.speaker} 
                contentUrl={scene.contentUrl} 
                contentType={scene.contentType}
                videoStartTime={getVideoStartTime(index)}
              />
            )}
          </Series.Sequence>
        ))}
      </Series>
      
      {/* Logo Overlay */}
      <div style={{
        position: "absolute",
        bottom: 30,
        right: 40,
        width: 150,
        zIndex: 100,
        opacity: 0.8
      }}>
        <Img src={staticFile("/logo.png")} style={{ width: "100%" }} />
      </div>
    </AbsoluteFill>
  );
};
