import React from "react";
import { useScale } from "../hooks/useScale";
import { THEME } from "../tokens";

interface WindowProps {
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  borderColor?: string;
}

export const Window: React.FC<WindowProps> = ({
  title,
  children,
  style,
  borderColor = "rgba(255,255,255,0.1)"
}) => {
  const { s } = useScale();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: THEME.glassBg,
        borderRadius: s(THEME.windowBorderRadius),
        border: `${s(2)}px solid ${borderColor}`,
        overflow: "hidden",
        boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
        backdropFilter: "blur(20px)",
        ...style,
      }}
    >
      {/* Window Header */}
      <div
        style={{
          height: s(THEME.windowHeaderHeight),
          backgroundColor: "rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          padding: `0 ${s(15)}px`,
          borderBottom: `1px solid rgba(255,255,255,0.1)`,
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: s(8) }}>
          <div style={{ width: s(12), height: s(12), borderRadius: "50%", backgroundColor: "#ff5f56" }} />
          <div style={{ width: s(12), height: s(12), borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
          <div style={{ width: s(12), height: s(12), borderRadius: "50%", backgroundColor: "#27c93f" }} />
        </div>

        <span style={{
          color: "rgba(255,255,255,0.6)",
          fontSize: s(14),
          fontFamily: "sans-serif",
          fontWeight: 500
        }}>
          {title}
        </span>

        <div style={{ width: s(40) }} /> {/* Spacer to center title if needed or balance */}
      </div>

      {/* Window Content */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
};
