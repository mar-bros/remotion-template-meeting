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
  title?: string;
}

export const KaiCore: React.FC<KaiCoreProps> = ({ scenes, title = "会审记录" }) => {
  const { width, height } = useVideoConfig();
  const isVertical = height > width;

  // Pre-calculate cumulative speaking frames for each protocol
  const speakingFrameMap = React.useMemo(() => {
    const protocols: ProtocolType[] = ["blue", "white", "red", "black", "yellow", "green"];
    const totalDuration = scenes.reduce((sum, s) => sum + s.durationInFrames, 0);
    
    // Initialize maps
    const map: Record<string, number[]> = {};
    protocols.forEach(p => map[p] = new Array(totalDuration).fill(0));
    
    const currentCounters: Record<string, number> = {};
    protocols.forEach(p => currentCounters[p] = 0);
    
    let currentGlobalFrame = 0;
    
    scenes.forEach(scene => {
      for (let f = 0; f < scene.durationInFrames; f++) {
        // Record current counts for all protocols at this global frame
        protocols.forEach(p => {
          map[p][currentGlobalFrame] = currentCounters[p];
        });
        
        // Increment the counter for the active speaker AFTER recording
        // so that the first frame of speaking is frame 0 of the video
        if (scene.speaker) {
          currentCounters[scene.speaker]++;
        }
        
        currentGlobalFrame++;
      }
    });
    
    return map;
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

      {/* Main Orchestrator via Series */}
      <Series>
        {scenes.map((scene, index) => {
          const sequenceStartFrame = scenes.slice(0, index).reduce((acc, s) => acc + s.durationInFrames, 0);
          return (
            <Series.Sequence key={index} durationInFrames={scene.durationInFrames}>
              {scene.mode === "council" ? (
                <CouncilLayout 
                  speaker={scene.speaker} 
                  title={title} 
                  speakingFrameMap={speakingFrameMap}
                  startFrame={sequenceStartFrame}
                />
              ) : (
                <PresentationLayout 
                  speaker={scene.speaker} 
                  contentUrl={scene.contentUrl} 
                  contentType={scene.contentType}
                  videoStartTime={getVideoStartTime(index)}
                  title={title}
                  speakingFrameMap={speakingFrameMap}
                  startFrame={sequenceStartFrame}
                />
              )}
            </Series.Sequence>
          );
        })}
      </Series>
    </AbsoluteFill>
  );
};
