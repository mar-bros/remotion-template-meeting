import React from "react";
import { AbsoluteFill, useVideoConfig, spring, interpolate, Img, staticFile, random } from "remotion";
import { THEME } from "../tokens";
import { useScale } from "../hooks/useScale";

interface IntroSlideProps {
  title: string;
}

const SESSION_SEED = Math.random();

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
          gap: s(60), // Increased overall gap
        }}
      >
        <Img
          src={staticFile("/logo-generated.png")}
          style={{
            width: s(220), // Slightly larger logo
            height: s(220),
            borderRadius: "50%",
            boxShadow: `0 0 ${s(40)}px ${THEME.accentBlue}66`,
            filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))",
            marginTop: s(-100), // Moved UP by offsetting
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: s(5) }}>
            {/* ... title mapping remains same ... */}
            {title.split("").map((char, i) => {
              // 6 Safe, vibrant theme colors corresponding to the hats
              const SAFE_COLORS = [
                "#2e86de", // Blue
                "#f5f6fa", // White
                "#ff5252", // Red
                "#57606f", // Grey
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
              marginTop: s(100), // Increased spacing between title and brand line
              height: s(4), 
              width: "90%",
              background: `linear-gradient(to right, transparent, #2e86de, #f5f6fa, #ff5252, #57606f, #feca57, #1dd1a1, transparent)`,
              opacity: 0.8,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: s(60), // Moved Brand name FURTHER down from the line
                left: "50%",
                transform: "translateX(-50%)",
                width: "100%",
                textAlign: "center",
                color: "rgba(255,255,255,0.6)",
                fontSize: s(36),
                fontWeight: 700,
                letterSpacing: s(30),
                textTransform: "uppercase",
                fontFamily: "Outfit, sans-serif",
                textShadow: "0 0 20px rgba(0,0,0,0.5)",
              }}
            >
              {THEME.brandName.split("").map((char, i) => {
                const SAFE_COLORS = [
                  "#2e86de", // Blue
                  "#f5f6fa", // White
                  "#ff5252", // Red
                  "#57606f", // Grey
                  "#feca57", // Yellow
                  "#1dd1a1", // Green
                ];
                // 每次刷新根据 SESSION_SEED 随机一个颜色组合，但在当前播放会话中保持静态
                const colorIndex = Math.floor(random(`brandName-${SESSION_SEED}-${i}`) * SAFE_COLORS.length);
                return (
                  <span key={i} style={{ color: SAFE_COLORS[colorIndex] }}>
                    {char}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
