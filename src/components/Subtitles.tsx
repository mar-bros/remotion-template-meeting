import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { PROTOCOLS } from "../tokens";
import type { ProtocolType } from "../types";
import { useScale } from "../hooks/useScale";

interface SubtitlesProps {
  text: string;
  speaker: ProtocolType;
}

export const Subtitles: React.FC<SubtitlesProps> = ({ text, speaker }) => {
  const frame = useCurrentFrame();
  const { s, isVertical } = useScale();
  const data = PROTOCOLS[speaker];

  // Simple fade-in and slide-up effect
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const translateY = interpolate(frame, [0, 10], [20, 0], { extrapolateRight: "clamp" });

  return (
    <div style={{
      position: "absolute",
      bottom: "6%",
      left: "50%",
      transform: `translateX(-50%) translateY(${translateY}px)`,
      width: isVertical ? "92%" : `calc(100% - ${s(130) * 2}px)`,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      backdropFilter: "blur(10px)",
      border: `1px solid ${data.color}44`,
      borderRadius: s(12),
      padding: `${s(15)}px ${s(30)}px`,
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      justifyContent: "center",
      opacity,
      boxShadow: `0 ${s(10)}px ${s(30)}px rgba(0,0,0,0.5), 0 0 ${s(20)}px ${data.color}22`,
      pointerEvents: "none",
      zIndex: 100,
    }}>
      {/* Tag — left aligned, full height */}
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        backgroundColor: data.color,
        color: "white",
        fontSize: s(22),
        fontWeight: "bold",
        padding: `0 ${s(30)}px`,
        borderTopLeftRadius: s(12),
        borderBottomLeftRadius: s(12),
        textTransform: "uppercase",
        letterSpacing: s(1),
        boxShadow: `2px 0 ${s(15)}px rgba(0,0,0,0.3)`,
        textShadow: "0 1px 2px rgba(0,0,0,0.8)",
        whiteSpace: "nowrap",
      }}>
        {data.name}
      </div>

      {/* Text — centered across full width */}
      <div style={{
        color: "white",
        fontSize: s(24),
        lineHeight: 1.4,
        textAlign: "center",
        fontFamily: "monospace",
        textShadow: `0 0 ${s(5)}px rgba(255,255,255,0.3)`,
        wordBreak: "break-word",
        width: "100%",
      }}>
        {text}
      </div>
    </div>
  );
};
