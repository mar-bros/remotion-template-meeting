import React from "react";
import { Img, Video, useCurrentFrame, useVideoConfig } from "remotion";
import { useScale } from "../hooks/useScale";
import { PROTOCOLS, ProtocolType, THEME } from "../tokens";
import { Window } from "./Window";
import { Avatar } from "./Avatar";

interface PresentationLayoutProps {
  speaker?: ProtocolType;
  contentUrl?: string;
  contentType?: "image" | "video";
  videoStartTime?: number; // In frames
  title?: string;
  prevSpeakingFrames: Record<string, number>;
}

export const PresentationLayout: React.FC<PresentationLayoutProps> = ({
  speaker,
  contentUrl,
  contentType = "image",
  videoStartTime = 0,
  title = "逻辑会审",
  prevSpeakingFrames
}) => {
  const frame = useCurrentFrame();
  const { s, isVertical, width, height } = useScale();

  const gap = s(20);
  const padding = s(40);

  const protocols: ProtocolType[] = ["blue", "white", "red", "black", "yellow", "green"];

  // Layout logic based on horizontal/vertical
  const contentWidth = isVertical ? width - (padding * 2) : (width - (padding * 2) - gap) * 0.75;
  const avatarsWidth = isVertical ? width - (padding * 2) : (width - (padding * 2) - gap) * 0.25;

  return (
    <div style={{
      padding: isVertical ? `0px` : `${s(80)}px ${s(260)}px`,
      width: "100%",
      height: "100%",
    }}>
      <Window
        title={`噪声之下 - ${title} / 协作模式`}
        style={{ width: "100%", height: "100%" }}
      >
        <div style={{
          display: "flex",
          flexDirection: isVertical ? "column" : "row",
          width: "100%",
          height: "100%",
          backgroundColor: THEME.glassBg
        }}>
          {/* Main Content Area - Fill space */}
          <div style={{
            flex: isVertical ? 1 : 4.5, // Content dominated
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000",
            overflow: "hidden"
          }}>
            {contentUrl ? (
              contentType === "video" ? (
                <Video
                  src={contentUrl}
                  startFrom={videoStartTime}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Img
                  src={contentUrl}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )
            ) : (
              <div style={{ color: "rgba(255,255,255,0.2)", fontSize: s(30) }}>No Content Loaded</div>
            )}
          </div>

          {/* Participant Sideboard - Compact column */}
          <div style={{
            flex: isVertical ? 0.3 : 1, // Sidebar fits to content
            display: "flex",
            flexDirection: isVertical ? "row" : "column",
            padding: s(5),
            overflow: "hidden",
            borderLeft: isVertical ? "none" : `${s(1)}px solid rgba(255,255,255,0.1)`,
            borderTop: isVertical ? `${s(1)}px solid rgba(255,255,255,0.1)` : "none",
          }}>
            {protocols.map((p) => (
              <div
                key={p}
                style={{
                  flex: 1, // Vertical distribution
                  border: `${s(1)}px solid ${speaker === p ? PROTOCOLS[p].color : "rgba(255,255,255,0.02)"}`,
                  borderRadius: s(4),
                  margin: s(2),
                  overflow: "hidden",
                  backgroundColor: speaker === p ? "rgba(255,255,255,0.03)" : "transparent",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  protocol={p}
                  isSpeaking={speaker === p}
                  speakingFrame={prevSpeakingFrames[p] + (speaker === p ? frame : 0)}
                  isSmall={true}
                />
              </div>
            ))}
          </div>
        </div>
      </Window>
    </div>
  );
};
