import React from "react";
import { Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { useScale } from "../hooks/useScale";
import { PROTOCOLS, ProtocolType } from "../tokens";

interface AvatarProps {
  protocol: ProtocolType;
  isSpeaking: boolean;
  cpuUsage?: number; // 0 to 1
}

export const Avatar: React.FC<AvatarProps> = ({ 
  protocol, 
  isSpeaking,
  cpuUsage = 0.4
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { s } = useScale();
  const data = PROTOCOLS[protocol];

  // Pulsing border animation
  const pulseScale = isSpeaking 
    ? interpolate(Math.sin(frame / 5), [-1, 1], [1, 1.1]) 
    : 1;
    
  // Glitch effect for Black Hat
  const glitchTransform = data.hasGlitch && Math.random() > 0.95
    ? `translate(${(Math.random() - 0.5) * s(10)}px, ${(Math.random() - 0.5) * s(10)}px) skew(${(Math.random() - 0.5) * 5}deg)`
    : "none";

  return (
    <div style={{ 
      width: "100%", 
      height: "100%", 
      display: "flex", 
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#000",
      position: "relative"
    }}>
      {/* Avatar Image with pulsing border */}
      <div style={{
        width: "70%",
        aspectRatio: "1",
        borderRadius: "50%",
        border: `${s(4)}px solid ${isSpeaking ? data.color : "rgba(255,255,255,0.1)"}`,
        transform: `scale(${pulseScale}) ${glitchTransform}`,
        padding: s(5),
        boxShadow: isSpeaking ? `0 0 ${s(30)}px ${data.color}88` : "none",
        transition: "border 0.2s ease",
      }}>
        <Img 
          src={data.avatar} 
          style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} 
        />
      </div>

      {/* Speaker Info */}
      <div style={{ marginTop: s(20), textAlign: "center" }}>
        <div style={{ color: "white", fontSize: s(24), fontWeight: "bold" }}>{data.name}</div>
        <div style={{ color: data.color, fontSize: s(16), marginTop: s(5) }}>{data.personality}</div>
      </div>

      {/* Mic Status */}
      <div style={{
        position: "absolute",
        top: s(20),
        right: s(20),
        width: s(24),
        height: s(24),
        borderRadius: "50%",
        backgroundColor: isSpeaking ? data.color : "rgba(255,255,255,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        {isSpeaking ? (
          <svg width={s(12)} height={s(12)} viewBox="0 0 24 24" fill="white">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
          </svg>
        ) : (
          <svg width={s(12)} height={s(12)} viewBox="0 0 24 24" fill="white">
            <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"/>
          </svg>
        )}
      </div>

      {/* CPU Usage Bar */}
      <div style={{
        position: "absolute",
        bottom: s(10),
        left: s(20),
        right: s(20),
        height: s(4),
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: s(2)
      }}>
        <div style={{
          width: `${(cpuUsage + Math.sin(frame/10) * 0.05) * 100}%`,
          height: "100%",
          backgroundColor: data.color,
          borderRadius: s(2),
          transition: "width 0.1s linear"
        }} />
      </div>
    </div>
  );
};
