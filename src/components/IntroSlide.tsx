import React from "react";
import { AbsoluteFill, useVideoConfig, spring, interpolate } from "remotion";
import { THEME } from "../tokens";
import { useScale } from "../hooks/useScale";

interface IntroSlideProps {
  title: string;
}

export const IntroSlide: React.FC<IntroSlideProps> = ({ title }) => {
  const { s } = useScale();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: THEME.background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          width: s(800),
          height: s(800),
          borderRadius: "50%",
          background: `radial-gradient(circle, ${THEME.accentBlue}33 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      <div
        style={{
          zIndex: 1,
          textAlign: "center",
          padding: `0 ${s(100)}px`,
        }}
      >
        <h1
          style={{
            color: "#fff",
            fontSize: s(120),
            fontWeight: 900,
            margin: 0,
            letterSpacing: s(10),
            textTransform: "uppercase",
            textShadow: `0 0 ${s(20)}px ${THEME.accentBlue}, 0 0 ${s(40)}px ${THEME.accentBlue}66`,
            fontFamily: "Outfit, sans-serif",
            lineHeight: 1,
            background: `linear-gradient(to bottom, #fff 40%, ${THEME.accentBlue} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 5px 15px rgba(0,0,0,0.5))",
          }}
        >
          {title}
        </h1>
        <div
          style={{
            marginTop: s(20),
            height: s(4),
            width: "100%",
            background: `linear-gradient(to right, transparent, ${THEME.accentBlue}, transparent)`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
