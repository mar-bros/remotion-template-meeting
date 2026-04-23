import { Freeze, Img, Sequence, interpolate, useCurrentFrame } from "remotion";
import { Video } from "@remotion/media";
import { useScale } from "../hooks/useScale";
import { PROTOCOLS } from "../tokens";
import type { ProtocolType, AgentAction } from "../types";
import { SVGCharacter } from "./SVGCharacter";

interface AvatarProps {
  protocol: ProtocolType;
  isSpeaking: boolean;
  isOffline?: boolean;
  speakingFrame?: number; // The cumulative frame of the avatar video
  isSmall?: boolean;
  action?: AgentAction;
  audioUrl?: string;
  segmentFrame?: number;
}

export const Avatar: React.FC<AvatarProps> = ({
  protocol,
  isSpeaking,
  isOffline = false,
  speakingFrame = 0,
  isSmall = false,
  action,
  audioUrl,
  segmentFrame,
}) => {
  const frame = useCurrentFrame();
  const { s } = useScale();
  const data = PROTOCOLS[protocol];

  // Use declared avatarType instead of runtime file extension detection
  const isVideo = data.avatarType === "video";

  // Base offset: total frames this character spoke before this scene
  const videoOffset = isSpeaking ? speakingFrame - frame : speakingFrame;

  // Pulsing border animation via interpolate (not CSS transition)
  const pulseScale =
    isSpeaking && !isVideo
      ? interpolate(Math.sin(frame / 5), [-1, 1], [1, 1.05])
      : 1;

  // Speaking border opacity (replaces CSS transition)
  const borderOpacity = isSpeaking ? 1 : isOffline ? 0.05 : 0.1;
  const borderColor = isSpeaking
    ? data.color
    : `rgba(255,255,255,${borderOpacity})`;

  const glitchActive =
    data.hasGlitch && isSpeaking && Math.sin(frame * 0.5) > 0.8;
  const glitchIntensity = 10;
  const glitchTransform = glitchActive
    ? `translate(${Math.sin(frame * 10) * s(glitchIntensity)}px, ${Math.cos(frame * 10) * s(glitchIntensity)}px) skew(${Math.sin(frame) * 10}deg)`
    : "";

  const videoStyle = {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    filter: isOffline ? "grayscale(1) brightness(0.4)" : "none",
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.3)",
        position: "relative",
        opacity: isOffline ? 0.6 : 1,
        overflow: "hidden", // Ensure character doesn't bleed out
      }}
    >
      {/* Character Layer (Fills Container) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "flex-end", // Align to bottom so they sit on the floor
          justifyContent: "center",
          filter: isOffline ? "grayscale(1) brightness(0.4)" : "none",
        }}
      >
        {isOffline ? (
          isVideo ? (
            <Sequence from={-videoOffset} layout="none">
              <Freeze frame={videoOffset}>
                <Video
                  src={data.avatar}
                  muted
                  loop
                  objectFit="cover"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  delayRenderTimeoutInMilliseconds={100000}
                />
              </Freeze>
            </Sequence>
          ) : (
            <Img
              src={data.avatar}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )
        ) : (
          <SVGCharacter 
            protocol={protocol} 
            isSpeaking={isSpeaking} 
            action={action} 
            isSmall={isSmall} 
            audioUrl={audioUrl}
            segmentFrame={segmentFrame}
          />
        )}
      </div>

      {/* Offline Overlay Tag */}
      {isOffline && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(-15deg)",
            backgroundColor: "rgba(0,0,0,0.8)",
            color: "rgba(255,255,255,0.5)",
            fontSize: s(isSmall ? 8 : 12),
            fontWeight: "bold",
            padding: `${s(2)}px ${s(8)}px`,
            borderRadius: s(4),
            border: "1px solid rgba(255,255,255,0.2)",
            letterSpacing: s(1),
            whiteSpace: "nowrap",
            zIndex: 20,
          }}
        >
          OFFLINE
        </div>
      )}

      {/* Speaker Info (Floating Top Left) */}
      <div
        style={{
          position: "absolute",
          top: s(15),
          left: s(20),
          zIndex: 10,
          textShadow: "0 2px 4px rgba(0,0,0,0.8)", // Ensure readable over character
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: s(isSmall ? 18 : 24),
            fontWeight: "bold",
            opacity: isOffline ? 0.5 : 1,
          }}
        >
          {data.name}
        </div>
        {!isSmall && (
          <div
            style={{
              color: isOffline ? "#888" : "rgba(255,255,255,0.8)",
              fontSize: s(14),
              marginTop: s(2),
              fontWeight: 600,
            }}
          >
            {isOffline ? "DISCONNECTED" : data.personality}
          </div>
        )}
      </div>

      {/* Mic Status (Floating Top Right) */}
      {!isOffline && (
        <div
          style={{
            position: "absolute",
            top: s(15),
            right: s(20),
            width: s(isSmall ? 16 : 24),
            height: s(isSmall ? 16 : 24),
            borderRadius: "50%",
            backgroundColor: isSpeaking
              ? data.color
              : "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            border: `1px solid ${isSpeaking ? "transparent" : "rgba(255,255,255,0.2)"}`,
          }}
        >
          {isSpeaking ? (
            <svg
              width={s(isSmall ? 8 : 12)}
              height={s(isSmall ? 8 : 12)}
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          ) : (
            <svg
              width={s(isSmall ? 8 : 12)}
              height={s(isSmall ? 8 : 12)}
              viewBox="0 0 24 24"
              fill="rgba(255,255,255,0.5)"
            >
              <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z" />
            </svg>
          )}
        </div>
      )}
    </div>
  );
};
