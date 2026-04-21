import React from "react";
import { AbsoluteFill } from "remotion";
import { THEME } from "../tokens";
import { useScale } from "../hooks/useScale";

interface OutroSlideProps {
  copyright: string;
  characterTraits: string;
  disclaimer: string;
}

export const OutroSlide: React.FC<OutroSlideProps> = ({
  copyright,
  characterTraits,
  disclaimer,
}) => {
  const { s } = useScale();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: THEME.background,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: s(60),
        color: "#fff",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: s(900),
          background: "rgba(255,255,255,0.03)",
          borderRadius: s(24),
          border: `1px solid rgba(255,255,255,0.1)`,
          padding: s(50),
          display: "flex",
          flexDirection: "column",
          gap: s(40),
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Character Traits Section */}
        <div>
          <div style={{ color: THEME.accentBlue, fontSize: s(20), fontWeight: 700, marginBottom: s(10), textTransform: "uppercase", letterSpacing: 2 }}>
            人格矩阵 / Character Protocol
          </div>
          <div style={{ fontSize: s(24), lineHeight: 1.6, color: "rgba(255,255,255,0.8)" }}>
            {characterTraits}
          </div>
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.1)" }} />

        {/* Disclaimer Section */}
        <div>
          <div style={{ color: "#ff4444", fontSize: s(20), fontWeight: 700, marginBottom: s(10), textTransform: "uppercase", letterSpacing: 2 }}>
            法律与免责 / Legal & Disclaimer
          </div>
          <div style={{ fontSize: s(20), lineHeight: 1.5, color: "rgba(255,255,255,0.6)", fontStyle: "italic" }}>
            {disclaimer}
          </div>
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.1)" }} />

        {/* Copyright Footer */}
        <div style={{ textAlign: "center", fontSize: s(18), color: "rgba(255,255,255,0.4)" }}>
          {copyright}
        </div>
      </div>
    </AbsoluteFill>
  );
};
