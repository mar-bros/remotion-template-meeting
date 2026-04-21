import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, staticFile, Sequence } from "remotion";
import { Audio } from "@remotion/media";
import { THEME } from "../tokens";
import { useScale } from "../hooks/useScale";

interface DetailedIntroSlideProps {
  text: string;
  audioUrl?: string;
  durationInFrames: number;
  postWaitDurationInFrames?: number;
}

export const DetailedIntroSlide: React.FC<DetailedIntroSlideProps> = ({
  text,
  audioUrl,
  durationInFrames,
  postWaitDurationInFrames = 60,
}) => {
  const frame = useCurrentFrame();
  const { s } = useScale();

  // Typewriter timing logic
  // We want to finish the typewriter effect before the post-wait period starts
  const finishFrame = Math.max(durationInFrames - postWaitDurationInFrames, 30); 
  const charsCount = text.length;
  
  // Calculate frames per character, considering rhythm (punctuation)
  const getFrameForChar = (index: number) => {
    let extraDelay = 0;
    for (let i = 0; i < index; i++) {
        const char = text[i];
        if (/[，。！？；]/.test(char)) {
            extraDelay += 5; // Pause for punctuation
        }
    }
    // Base speed + punctuation delays
    const baseProgress = (index / charsCount) * finishFrame;
    return Math.floor(baseProgress + extraDelay);
  };

  // Find how many characters to show at current frame
  let visibleChars = 0;
  for (let i = 0; i < charsCount; i++) {
    if (frame >= getFrameForChar(i)) {
      visibleChars = i + 1;
    } else {
      break;
    }
  }

  // Dynamic font size calculation (vaguely to fit 30% area)
  // Base font size depends on text length. 
  // 30% area of 1280x820 is roughly 314,000 pixels^2.
  // This is a heuristic.
  const baseFontSize = charsCount > 100 ? s(32) : charsCount > 50 ? s(40) : s(54);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: THEME.background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: s(80),
      }}
    >
      {audioUrl && (
        <Audio src={staticFile(audioUrl)} />
      )}
      
      {/* Typewriter sound effect: active while typing */}
      <Audio 
        src={staticFile("/sounds/sounds-effects-type.mp3")} 
        volume={visibleChars < charsCount ? 0.3 : 0} 
        loop
      />

      <div
        style={{
          width: "100%",
          maxWidth: s(1000),
          textAlign: "center",
          fontFamily: "Inter, sans-serif",
          color: "#fff",
          fontSize: baseFontSize,
          lineHeight: 1.6,
          fontWeight: 500,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: `${s(2)}px ${s(4)}px`,
        }}
      >
        {text.split("").map((char, i) => {
          if (i >= visibleChars) return null;
          
          const isLatest = i === visibleChars - 1;
          
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                padding: `0 ${s(2)}px`,
                backgroundColor: isLatest ? THEME.accentBlue : "transparent",
                color: "#fff",
                borderRadius: s(4),
                transition: "background-color 0.1s ease",
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
