import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
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
          maxWidth: s(1000),
          display: "flex",
          flexDirection: "column",
          gap: s(60),
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Img
          src={staticFile("/logo-generated.png")}
          style={{
            width: s(180),
            height: s(180),
            borderRadius: "50%",
            boxShadow: `0 0 ${s(40)}px ${THEME.accentBlue}33`,
            filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))",
            marginBottom: s(20),
          }}
        />

        {/* Character Traits Section */}
        <div style={{ width: "100%", whiteSpace: "pre-wrap" }}>
          <div style={{ fontSize: s(26), lineHeight: 1.8, color: "rgba(255,255,255,0.6)", fontWeight: 300 }}>
            {characterTraits}
          </div>
        </div>

        {/* Disclaimer Section */}
        <div style={{ width: "100%", whiteSpace: "pre-wrap" }}>
          <div style={{ fontSize: s(20), lineHeight: 1.6, color: "rgba(255,255,255,0.4)", fontStyle: "normal" }}>
            {disclaimer}
          </div>
        </div>

        {/* Copyright Footer */}
        <div style={{ marginTop: s(40), fontSize: s(18), color: "rgba(255,255,255,0.3)", letterSpacing: 1 }}>
          {copyright}
        </div>
      </div>
    </AbsoluteFill>
  );
};
