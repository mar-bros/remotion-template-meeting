import React from "react";
import { useScale } from "../hooks/useScale";
import { PROTOCOLS, ProtocolType } from "../tokens";
import { Window } from "./Window";
import { Avatar } from "./Avatar";

interface CouncilLayoutProps {
  speaker?: ProtocolType;
}

export const CouncilLayout: React.FC<CouncilLayoutProps> = ({ speaker }) => {
  const { s, isVertical, width, height } = useScale();

  // Grid configuration based on orientation
  const cols = isVertical ? 2 : 3;
  const rows = isVertical ? 3 : 2;
  
  const gap = s(20);
  const padding = s(40);
  
  // Calculate available space
  const availableWidth = width - (padding * 2) - (gap * (cols - 1));
  const availableHeight = height - (padding * 2) - (gap * (rows - 1));
  
  const windowWidth = availableWidth / cols;
  const windowHeight = availableHeight / rows;

  const protocols: ProtocolType[] = ["blue", "white", "red", "black", "yellow", "green"];

  return (
    <div style={{
      padding: `${padding}px`,
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`,
      gap: `${gap}px`,
      width: "100%",
      height: "100%",
    }}>
      {protocols.map((p) => (
        <Window 
          key={p} 
          title={`Protocol: ${PROTOCOLS[p].name}`}
          borderColor={speaker === p ? PROTOCOLS[p].color : "rgba(255,255,255,0.1)"}
          style={{
            transform: speaker === p ? "scale(1.02)" : "scale(1)",
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
  );
};
