import React from "react";
import { useCurrentFrame } from "remotion";
import { useScale } from "../hooks/useScale";
import { PROTOCOLS, PROTOCOL_KEYS, THEME } from "../tokens";
import type { LayoutProps } from "../types";
import { Window } from "./Window";
import { Avatar } from "./Avatar";

export const CouncilLayout: React.FC<LayoutProps> = ({
  speaker,
  title = "逻辑会审",
  prevSpeakingFrames,
  offlineStatus,
}) => {
  const frame = useCurrentFrame();
  const { s, isVertical } = useScale();

  const cols = isVertical ? 2 : 3;
  const rows = isVertical ? 3 : 2;

  const gap = s(10);
  const padding = s(20);

  return (
    <div
      style={{
        padding: isVertical ? `0px` : `${s(60)}px ${s(120)}px`,
        width: "100%",
        height: "100%",
      }}
    >
      <Window
        title={`${THEME.brandName} - ${title}`}
        style={{ width: "100%", height: "100%" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              padding: `${padding}px`,
              display: "grid",
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, 1fr)`,
              gap: `${gap}px`,
              width: "100%",
              flex: 1,
              overflow: "hidden",
            }}
          >
            {PROTOCOL_KEYS.map((p) => (
              <div
                key={p}
                style={{
                  border: `${s(2)}px solid ${speaker === p ? PROTOCOLS[p].color : "rgba(255,255,255,0.05)"}`,
                  borderRadius: s(8),
                  overflow: "hidden",
                  backgroundColor:
                    speaker === p ? "rgba(255,255,255,0.03)" : "transparent",
                }}
              >
                <Avatar
                  protocol={p}
                  isSpeaking={speaker === p}
                  isOffline={offlineStatus[p]}
                  speakingFrame={
                    prevSpeakingFrames[p] + (speaker === p ? frame : 0)
                  }
                />
              </div>
            ))}
          </div>

        </div>
      </Window>
    </div>
  );
};
