import React from "react";
import { Img, Video, useVideoConfig } from "remotion";
import { useScale } from "../hooks/useScale";
import { PROTOCOLS, ProtocolType } from "../tokens";
import { Window } from "./Window";
import { Avatar } from "./Avatar";

interface PresentationLayoutProps {
  speaker?: ProtocolType;
  contentUrl?: string;
  contentType?: "image" | "video";
  videoStartTime?: number; // In frames
}

export const PresentationLayout: React.FC<PresentationLayoutProps> = ({ 
  speaker, 
  contentUrl, 
  contentType = "image",
  videoStartTime = 0
}) => {
  const { s, isVertical, width, height } = useScale();
  const { fps } = useVideoConfig();

  const gap = s(20);
  const padding = s(40);
  
  const protocols: ProtocolType[] = ["blue", "white", "red", "black", "yellow", "green"];

  // Layout logic based on horizontal/vertical
  const contentWidth = isVertical ? width - (padding * 2) : (width - (padding * 2) - gap) * 0.75;
  const avatarsWidth = isVertical ? width - (padding * 2) : (width - (padding * 2) - gap) * 0.25;

  return (
    <div style={{
      padding: `${padding}px`,
      display: "flex",
      flexDirection: isVertical ? "column" : "row",
      gap: `${gap}px`,
      width: "100%",
      height: "100%",
    }}>
      {/* Main Content Window */}
      <Window 
        title="Evidence / Presentation" 
        style={{ width: contentWidth, height: isVertical ? height * 0.5 : "100%" }}
      >
        <div style={{ width: "100%", height: "100%", backgroundColor: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {contentUrl ? (
            contentType === "video" ? (
              <Video 
                src={contentUrl} 
                startFrom={videoStartTime} 
                style={{ width: "100%", height: "100%", objectFit: "contain" }} 
              />
            ) : (
              <Img 
                src={contentUrl} 
                style={{ width: "100%", height: "100%", objectFit: "contain" }} 
              />
            )
          ) : (
            <div style={{ color: "rgba(255,255,255,0.2)", fontSize: s(30) }}>No Content Loaded</div>
          )}
        </div>
      </Window>

      {/* Side Avatars Stack */}
      <div style={{
        display: "flex",
        flexDirection: isVertical ? "row" : "column",
        gap: `${gap}px`,
        width: avatarsWidth,
        height: isVertical ? height * 0.4 : "100%",
        overflowX: isVertical ? "auto" : "hidden"
      }}>
        {protocols.map((p) => (
          <Window 
            key={p} 
            title={PROTOCOLS[p].name}
            borderColor={speaker === p ? PROTOCOLS[p].color : "rgba(255,255,255,0.1)"}
            style={{
              flex: 1,
              minWidth: isVertical ? s(150) : "auto",
              transform: speaker === p ? "scale(1.05)" : "scale(1)",
              zIndex: speaker === p ? 10 : 1,
              transition: "all 0.3s ease"
            }}
          >
            <Avatar 
              protocol={p} 
              isSpeaking={speaker === p} 
            />
          </Window>
        ))}
      </div>
    </div>
  );
};
