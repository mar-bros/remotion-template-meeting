import { Img, OffthreadVideo, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { useScale } from "../hooks/useScale";
import { PROTOCOLS, ProtocolType } from "../tokens";

interface AvatarProps {
  protocol: ProtocolType;
  isSpeaking: boolean;
  speakingFrame?: number; // The cumulative frame of the avatar video
  cpuUsage?: number; // 0 to 1
  isSmall?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  protocol, 
  isSpeaking,
  speakingFrame = 0,
  cpuUsage = 0.4,
  isSmall = false
}) => {
  const frame = useCurrentFrame();
  const { s } = useScale();
  const data = PROTOCOLS[protocol];

  // Detect asset type
  const isVideo = data.avatar.toLowerCase().endsWith(".mp4") || 
                  data.avatar.toLowerCase().endsWith(".webm") || 
                  data.avatar.toLowerCase().endsWith(".mov");

  // Pulsing border animation
  const pulseScale = isSpeaking 
    ? interpolate(Math.sin(frame / 5), [-1, 1], [1, 1.05]) 
    : 1;
    
  // Scheme A: Slowly breathing/floating animation
  const floatY = Math.sin(frame / 30 + (protocol.length % 10)) * s(isSmall ? 1 : 5);
  const floatX = Math.cos(frame / 45 + (protocol.length % 10)) * s(isSmall ? 1 : 3);
    
  // Glitch effect for Black Hat (deterministic based on global frame)
  const glitchActive = data.hasGlitch && (Math.sin(frame * 0.5) > 0.98);
  const glitchTransform = glitchActive
    ? `translate(${(Math.sin(frame) * s(5))}px, ${(Math.cos(frame) * s(5))}px)`
    : "none";

  return (
    <div style={{ 
      width: "100%", 
      height: "100%", 
      display: "flex", 
      flexDirection: isSmall ? "row" : "column",
      alignItems: "center",
      justifyContent: isSmall ? "space-between" : "center",
      backgroundColor: "rgba(0,0,0,0.3)",
      position: "relative",
      padding: isSmall ? `0 ${s(15)}px` : 0,
      transform: `translate(${floatX}px, ${floatY}px) ${glitchTransform}`,
    }}>
      {/* Avatar Content - circular container */}
      <div style={{
        height: isSmall ? "85%" : "55%",
        aspectRatio: "1",
        borderRadius: "50%",
        border: `${s(isSmall ? 2 : 4)}px solid ${isSpeaking ? data.color : "rgba(255,255,255,0.1)"}`,
        transform: `scale(${pulseScale})`,
        padding: s(5),
        boxShadow: isSpeaking ? `0 0 ${s(30)}px ${data.color}88` : "none",
        transition: "all 0.2s ease",
        overflow: "hidden",
        backgroundColor: "#000",
        flexShrink: 0
      }}>
        {isVideo ? (
          <OffthreadVideo
            src={data.avatar}
            muted
            // Precise frame driving
            frame={speakingFrame}
            style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
          />
        ) : (
          <Img 
            src={data.avatar} 
            style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} 
          />
        )}
      </div>

      {/* Speaker Info */}
      <div style={{ 
        marginTop: isSmall ? 0 : s(20), 
        flex: isSmall ? 1 : "none",
        marginLeft: isSmall ? s(20) : 0,
        textAlign: isSmall ? "left" : "center" 
      }}>
        <div style={{ color: "white", fontSize: s(isSmall ? 20 : 24), fontWeight: "bold" }}>{data.name}</div>
        {!isSmall && (
          <div style={{ color: data.color, fontSize: s(16), marginTop: s(5) }}>{data.personality}</div>
        )}
      </div>

      {/* Mic Status */}
      <div style={{
        position: "absolute",
        top: isSmall ? "50%" : s(20),
        right: isSmall ? s(20) : s(20),
        transform: isSmall ? "translateY(-50%)" : "none",
        width: s(isSmall ? 16 : 24),
        height: s(isSmall ? 16 : 24),
        borderRadius: "50%",
        backgroundColor: isSpeaking ? data.color : "rgba(255,255,255,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        {isSpeaking ? (
          <svg width={s(isSmall ? 8 : 12)} height={s(isSmall ? 8 : 12)} viewBox="0 0 24 24" fill="white">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
          </svg>
        ) : (
          <svg width={s(isSmall ? 8 : 12)} height={s(isSmall ? 8 : 12)} viewBox="0 0 24 24" fill="white">
            <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"/>
          </svg>
        )}
      </div>

      {/* CPU Usage Bar - Fixed at bottom for visibility */}
      {isSpeaking && (
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: s(2),
          backgroundColor: `${data.color}22`,
        }}>
          <div style={{
            width: `${(cpuUsage + Math.sin(frame/10) * 0.05) * 100}%`,
            height: "100%",
            backgroundColor: data.color,
            boxShadow: `0 0 ${s(5)}px ${data.color}`,
            transition: "width 0.1s linear"
          }} />
        </div>
      )}
    </div>
  );
};
