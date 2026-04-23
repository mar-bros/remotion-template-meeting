import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { useAudioData, visualizeAudio } from "@remotion/media-utils";
import { staticFile } from "remotion";
import { ProtocolType, AgentAction } from "../types";
import { PROTOCOLS } from "../tokens";

interface SVGCharacterProps {
  protocol: ProtocolType;
  isSpeaking: boolean;
  action?: AgentAction;
  isSmall?: boolean;
  audioUrl?: string;
  segmentFrame?: number;
}

// Audio fetcher component to safely call useAudioData
const AudioMouthFetcher: React.FC<{
  audioUrl: string;
  segmentFrame: number;
  fps: number;
  children: (vol: number) => React.ReactNode;
}> = ({ audioUrl, segmentFrame, fps, children }) => {
  const audioData = useAudioData(staticFile(audioUrl));
  if (!audioData) return <>{children(0)}</>;
  
  try {
    const visualization = visualizeAudio({
      fps,
      frame: segmentFrame,
      audioData,
      numberOfSamples: 16,
    });
    // Average volume from the audio frequency bins
    const vol = visualization.reduce((a, b) => a + b, 0) / 16;
    return <>{children(vol)}</>;
  } catch (err) {
    return <>{children(0)}</>;
  }
};

// Exported wrapper that conditionally uses audio
export const SVGCharacter: React.FC<SVGCharacterProps> = (props) => {
  const { fps } = useVideoConfig();
  
  if (props.isSpeaking && props.audioUrl) {
    return (
      <AudioMouthFetcher audioUrl={props.audioUrl} segmentFrame={props.segmentFrame ?? 0} fps={fps}>
        {(vol) => <SVGCharacterInner {...props} audioVolume={vol} />}
      </AudioMouthFetcher>
    );
  }
  
  return <SVGCharacterInner {...props} audioVolume={0} />;
};

// Inner visual component
const SVGCharacterInner: React.FC<SVGCharacterProps & { audioVolume: number }> = ({
  protocol,
  isSpeaking,
  action,
  isSmall = false,
  audioVolume,
}) => {
  const frame = useCurrentFrame();
  const data = PROTOCOLS[protocol];

  // Base state extraction
  const emotion = action?.emotion || "normal";
  const movement = action?.movement || "idle";
  const isHappy = emotion === "happy";
  const isAngry = emotion === "angry";
  const isShocked = emotion === "shocked";
  const isSad = emotion === "sad";
  const isThinking = emotion === "thinking";

  // --- Animations ---
  
  const protocolOffsets: Record<ProtocolType, number> = {
    blue: 0,
    white: 15,
    red: 30,
    black: 50,
    yellow: 70,
    green: 95,
  };
  const offset = protocolOffsets[protocol];

  // 1. Breathing (Idle)
  const breathingScale = interpolate(
    Math.sin((frame + offset) / 15),
    [-1, 1],
    [0.98, 1.02]
  );
  const breathingY = interpolate(
    Math.sin((frame + offset) / 15),
    [-1, 1],
    [2, -2]
  );

  // 2. Blinking (Random-ish, unique per character)
  const isBlinking = (frame + offset) % 120 < 6 || (frame + offset * 2) % 250 < 6;
  const eyeScaleY = isBlinking ? 0.1 : isShocked ? 1.5 : isSad ? 0.8 : 1;

  // Eye rolling (Pupils random movement)
  const pupilOffsetX = Math.sin((frame + offset * 10) / 30) * 1.5;
  const pupilOffsetY = Math.cos((frame + offset * 10) / 40) * 1.5;

  // 3. Speaking (Mouth opening based on audio rhythm)
  const speakingOpenness = isSpeaking
    ? audioVolume > 0.005 
      ? interpolate(audioVolume, [0.005, 0.1], [0.2, 3], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }) 
      : interpolate(Math.sin(frame * 0.8), [-1, 1], [0.2, 1.5]) // Fallback subtle movement
    : isHappy ? 0.5 : 0.1;
  const mouthScaleY = isShocked ? 2 : speakingOpenness;

  // 4. Movement (Whispering, Nodding, Shaking head, Look around)
  let headOffsetX = 0;
  let headOffsetY = 0;
  let headRotate = 0;

  if (movement === "whisper_left") {
    headOffsetX = -15;
    headRotate = -10;
  } else if (movement === "whisper_right") {
    headOffsetX = 15;
    headRotate = 10;
  } else if (movement === "nod") {
    headOffsetY = interpolate(Math.sin(frame * 0.4), [-1, 1], [-5, 5]);
  } else if (movement === "shake_head") {
    headOffsetX = interpolate(Math.sin(frame * 0.6), [-1, 1], [-8, 8]);
  } else if (movement === "look_around") {
    headOffsetX = interpolate(Math.sin(frame * 0.1), [-1, 1], [-10, 10]);
  } else if (isThinking) {
    headOffsetY = -5;
    headOffsetX = 5;
    headRotate = 5;
  }

  // --- Character Designs ---
  const renderFace = () => {
    switch (protocol) {
      case "blue": // MALE: Tall Rectangle
        return (
          <g>
            {/* Flat bottom path instead of rect with rx */}
            <path d="M 30 100 L 30 34 Q 30 30 34 30 L 66 30 Q 70 30 70 34 L 70 100 Z" fill={data.color} />
            {/* Glasses */}
            <rect x="36" y="40" width="10" height="8" rx="2" fill="none" stroke="#fff" strokeWidth="2" />
            <rect x="54" y="40" width="10" height="8" rx="2" fill="none" stroke="#fff" strokeWidth="2" />
            <line x1="46" y1="44" x2="54" y2="44" stroke="#fff" strokeWidth="2" />
            {/* Eyes */}
            <circle cx="41" cy="44" r="2.5" fill="#fff" transform={`scale(1, ${eyeScaleY})`} transform-origin="41 44" />
            <circle cx="59" cy="44" r="2.5" fill="#fff" transform={`scale(1, ${eyeScaleY})`} transform-origin="59 44" />
            <circle cx={41 + pupilOffsetX} cy={44 + pupilOffsetY} r="1.5" fill="#000" />
            <circle cx={59 + pupilOffsetX} cy={44 + pupilOffsetY} r="1.5" fill="#000" />
            {/* Mouth */}
            <rect x="46" y="55" width="8" height={isSpeaking ? 5 * speakingOpenness : 2} rx="1" fill="#000" />
          </g>
        );

      case "white": // FEMALE: Slim, elegant, square-ish head
        return (
          <g>
            <path d="M 35 100 L 35 44 Q 35 40 39 40 L 61 40 Q 65 40 65 44 L 65 100 Z" fill="#e2e8f0" />
            {/* Eyes */}
            <circle cx="43" cy="55" r="3" fill="#0f172a" transform={`scale(1, ${eyeScaleY})`} transform-origin="43 55" />
            <circle cx="57" cy="55" r="3" fill="#0f172a" transform={`scale(1, ${eyeScaleY})`} transform-origin="57 55" />
            {/* Mouth */}
            <line x1="46" y1="65" x2="54" y2="65" stroke="#0f172a" strokeWidth={isSpeaking ? 3 * speakingOpenness + 1 : 1.5} strokeLinecap="round" />
          </g>
        );

      case "red": // FEMALE: Slimmer semicircle, cute
        return (
          <g>
            <path d="M 23 100 Q 23 40 50 40 Q 77 40 77 100 Z" fill={data.color} />
            {/* Blush */}
            <ellipse cx="36" cy="65" rx="3.5" ry="2" fill="#ef4444" opacity="0.6" />
            <ellipse cx="64" cy="65" rx="3.5" ry="2" fill="#ef4444" opacity="0.6" />
            {/* Eyes */}
            <circle cx="40" cy="58" r="3" fill="#000" transform={`scale(1, ${eyeScaleY})`} transform-origin="40 58" />
            <circle cx="60" cy="58" r="3" fill="#000" transform={`scale(1, ${eyeScaleY})`} transform-origin="60 58" />
            {/* Eye Sparkles (光) */}
            <circle cx="39.5" cy="57" r="1" fill="#fff" transform={`scale(1, ${eyeScaleY})`} transform-origin="40 58" />
            <circle cx="59.5" cy="57" r="1" fill="#fff" transform={`scale(1, ${eyeScaleY})`} transform-origin="60 58" />
            {/* Smiling Mouth */}
            <path d={`M 46 70 Q 50 ${70 + 4 * mouthScaleY} 54 70`} fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
          </g>
        );

      case "black": // MALE: Tall thin rectangle
        return (
          <g>
            <path d="M 35 100 L 35 37 Q 35 35 37 35 L 63 35 Q 65 35 65 37 L 65 100 Z" fill="#1e293b" />
            {/* Red Bow Tie */}
            <path d="M 45 68 L 40 64 L 40 72 Z" fill="#ef4444" />
            <path d="M 55 68 L 60 64 L 60 72 Z" fill="#ef4444" />
            <circle cx="50" cy="68" r="2.5" fill="#b91c1c" />
            {/* Eyes looking sideways */}
            <circle cx="42" cy="50" r="4" fill="#fff" transform={`scale(1, ${eyeScaleY})`} transform-origin="42 50" />
            <circle cx="58" cy="50" r="4" fill="#fff" transform={`scale(1, ${eyeScaleY})`} transform-origin="58 50" />
            <circle cx={42 + pupilOffsetX * 0.5 + 1.5} cy={50 + pupilOffsetY * 0.5} r="1.5" fill="#000" />
            <circle cx={58 + pupilOffsetX * 0.5 + 1.5} cy={50 + pupilOffsetY * 0.5} r="1.5" fill="#000" />
            {/* Mouth */}
            <line x1="45" y1="58" x2="55" y2="58" stroke="#fff" strokeWidth={isSpeaking ? 2 * speakingOpenness + 1 : 1} strokeLinecap="round" />
          </g>
        );

      case "yellow": // MALE: Flat-bottom curved blob
        return (
          <g>
            <path d="M 30 100 L 30 60 Q 30 40 50 40 Q 70 40 70 60 L 70 100 Z" fill="#eab308" />
            {/* Shaanxi White Towel */}
            <path d="M 28 50 Q 50 35 72 50 L 70 45 Q 50 30 30 45 Z" fill="#fff" />
            <path d="M 70 45 L 75 60 L 68 62 Z" fill="#fff" />
            <path d="M 30 45 L 25 60 L 32 62 Z" fill="#fff" />
            {/* Eyes facing forward */}
            <circle cx="42" cy="58" r="2.5" fill="#000" transform={`scale(1, ${eyeScaleY})`} transform-origin="42 58" />
            <circle cx="58" cy="58" r="2.5" fill="#000" transform={`scale(1, ${eyeScaleY})`} transform-origin="58 58" />
            {/* Mouth facing forward */}
            <line x1="45" y1="68" x2="55" y2="68" stroke="#000" strokeWidth={isSpeaking ? 4 * speakingOpenness + 2 : 3} strokeLinecap="round" />
          </g>
        );

      case "green": // FEMALE: Slim pill shape
        return (
          <g>
            <path d="M 36 100 L 36 44 Q 36 30 50 30 Q 64 30 64 44 L 64 100 Z" fill="#22c55e" />
            {/* Bow Tie (蝴蝶结) */}
            <g transform="translate(58, 32) rotate(15)">
              <path d="M 0 0 L -7 -5 L -7 5 Z" fill="#ec4899" />
              <path d="M 0 0 L 7 -5 L 7 5 Z" fill="#ec4899" />
              <circle cx="0" cy="0" r="2.5" fill="#be185d" />
            </g>
            {/* Eyes */}
            <circle cx="44" cy="45" r="4" fill="#fff" transform={`scale(1, ${eyeScaleY})`} transform-origin="44 45" />
            <circle cx="56" cy="45" r="4" fill="#fff" transform={`scale(1, ${eyeScaleY})`} transform-origin="56 45" />
            <circle cx={44 + pupilOffsetX * 0.8} cy={45 + pupilOffsetY * 0.8} r="1.5" fill="#000" />
            <circle cx={56 + pupilOffsetX * 0.8} cy={45 + pupilOffsetY * 0.8} r="1.5" fill="#000" />
            {/* Mouth */}
            <circle cx="50" cy="58" r={isSpeaking ? 3 * speakingOpenness + 1 : 1.5} fill="#000" />
          </g>
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        alignItems: "flex-end", // Push to bottom
        justifyContent: "center",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${breathingScale}) translate(${headOffsetX}px, ${breathingY + headOffsetY}px) rotate(${headRotate}deg)`,
          transformOrigin: "bottom center", // Pin to bottom floor
          transition: "transform 0.5s ease-out",
        }}
      >
        {renderFace()}
      </svg>
      
      {/* Floating Text / Emojis */}
      {action?.floatingText && (
        <div
          style={{
            position: "absolute",
            top: isSmall ? "0%" : "20%",
            right: "10%",
            fontSize: isSmall ? "1.5rem" : "2.5rem",
            transform: `translateY(${Math.sin(frame * 0.1) * 10}px)`,
            opacity: interpolate(frame, [0, 10, 30], [0, 1, 1], { extrapolateRight: "clamp" }),
            backgroundColor: "white",
            padding: "4px 12px",
            borderRadius: "16px",
            color: "black",
            fontWeight: "bold",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
            zIndex: 10,
          }}
        >
          {action.floatingText}
        </div>
      )}
    </div>
  );
};
