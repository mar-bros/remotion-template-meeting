import React from "react";
import { useCurrentFrame } from "remotion";
import { useScale } from "../hooks/useScale";
import { PROTOCOLS, ProtocolType } from "../tokens";
import { Window } from "./Window";
import { Avatar } from "./Avatar";

interface CouncilLayoutProps {
  speaker?: ProtocolType;
  title?: string;
  prevSpeakingFrames: Record<string, number>;
}

export const CouncilLayout: React.FC<CouncilLayoutProps> = ({
  speaker,
  title = "逻辑会审",
  prevSpeakingFrames
}) => {
  const frame = useCurrentFrame();
  const { s, isVertical } = useScale();

  const cols = isVertical ? 2 : 3;
  const rows = isVertical ? 3 : 2;

  const gap = s(10);
  const padding = s(20);

  const protocols: ProtocolType[] = ["blue", "white", "red", "black", "yellow", "green"];

  return (
    <div style={{
      padding: isVertical ? `0px` : `${s(80)}px ${s(260)}px`,
      width: "100%",
      height: "100%",
    }}>
      <Window
        title={`噪声之下 - ${title}`}
        style={{ width: "100%", height: "100%" }}
      >
        <div style={{
          padding: `${padding}px`,
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: `${gap}px`,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)"
        }}>
          {protocols.map((p) => (
            <div
              key={p}
              style={{
                border: `${s(2)}px solid ${speaker === p ? PROTOCOLS[p].color : "rgba(255,255,255,0.05)"}`,
                borderRadius: s(8),
                overflow: "hidden",
                backgroundColor: speaker === p ? "rgba(255,255,255,0.03)" : "transparent",
                transition: "all 0.3s ease"
              }}
            >
              <Avatar
                protocol={p}
                isSpeaking={speaker === p}
                speakingFrame={prevSpeakingFrames[p] + (speaker === p ? frame : 0)}
              />
            </div>
          ))}
        </div>
      </Window>
    </div>
  );
};
