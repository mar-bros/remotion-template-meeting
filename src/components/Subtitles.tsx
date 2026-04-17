import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { PROTOCOLS, ProtocolType } from "../tokens";
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
      width: isVertical ? "92%" : `calc(100% - ${s(120*2 + 20*2)}px)`,
      maxWidth: s(1200),
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      backdropFilter: "blur(10px)",
      border: `1px solid ${data.color}44`,
      borderRadius: s(12),
      padding: `${s(15)}px ${s(30)}px`,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
      opacity,
      boxShadow: `0 ${s(10)}px ${s(30)}px rgba(0,0,0,0.5), 0 0 ${s(20)}px ${data.color}22`,
      pointerEvents: "none",
      zIndex: 100,
    }}>
      <div style={{
        color: "white",
        fontSize: s(24),
        lineHeight: 1.4,
        textAlign: "left",
        fontFamily: "monospace",
        textShadow: `0 0 ${s(5)}px rgba(255,255,255,0.3)`,
        wordBreak: "break-word",
        display: "flex",
        alignItems: "flex-start", // Align tag with first line of text
        gap: s(15)
      }}>
        {/* Tag inline as the 'prompt' */}
        <span style={{
          backgroundColor: data.color,
          color: "white",
          fontSize: s(14),
          fontWeight: "bold",
          padding: `${s(2)}px ${s(12)}px`,
          borderRadius: s(4),
          textTransform: "uppercase",
          letterSpacing: s(1),
          boxShadow: `0 0 ${s(10)}px ${data.color}44`,
          textShadow: "0 1px 2px rgba(0,0,0,0.8)",
          whiteSpace: "nowrap",
          flexShrink: 0,
          marginTop: s(4) // Optical alignment with text
        }}>
          {data.name}
        </span>

        <span>{text}</span>
      </div>
    </div>
  );
};
