import React from "react";
import { AbsoluteFill, useVideoConfig, spring, interpolate, Img, staticFile } from "remotion";
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: s(40),
        }}
      >
        <Img
          src={staticFile("/logo-generated.png")}
          style={{
            width: s(200),
            height: s(200),
            borderRadius: "50%",
            boxShadow: `0 0 ${s(30)}px ${THEME.accentBlue}88`,
            filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: s(5) }}>
            {title.split("").map((char, i) => {
              // 6 Safe, vibrant theme colors corresponding to the hats
              const SAFE_COLORS = [
                "#2e86de", // Blue
                "#f5f6fa", // White
                "#ff5252", // Red
                "#a4b0be", // Grey (Black hat substitute)
                "#feca57", // Yellow
                "#1dd1a1", // Green
              ];
              // Pseudo-random consistent color based on character and index
              const colorIndex = (char.charCodeAt(0) + i) % SAFE_COLORS.length;
              const charColor = SAFE_COLORS[colorIndex];

              return (
                <div key={i} style={{ position: "relative", display: "inline-block" }}>
                  {/* Background offset block */}
                  <div
                    style={{
                      position: "absolute",
                      left: s(-5),
                      top: s(5),
                      width: "110%",
                      height: "100%",
                      backgroundColor: charColor,
                      zIndex: -1,
                      borderRadius: s(8),
                      transform: `rotate(${((char.charCodeAt(0) % 10) - 5)}deg)`, // Subtle random rotation
                    }}
                  />
                  {/* Thick stroke behind */}
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      fontSize: s(140),
                      fontWeight: 900,
                      fontFamily: "Outfit, sans-serif",
                      WebkitTextStroke: `${s(24)}px #111`,
                      color: "transparent",
                      zIndex: 0,
                    }}
                  >
                    {char}
                  </span>
                  {/* Main text fill - White */}
                  <span
                    style={{
                      position: "relative",
                      fontSize: s(140),
                      fontWeight: 900,
                      fontFamily: "Outfit, sans-serif",
                      color: "#fff",
                      zIndex: 1,
                    }}
                  >
                    {char}
                  </span>
                </div>
              );
            })}
          </div>
          <div
            style={{
              marginTop: s(40),
              height: s(6),
              width: "80%",
              background: `linear-gradient(to right, transparent, #fff, transparent)`,
              opacity: 0.5,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
