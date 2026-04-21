import React from "react";
import { Img, useCurrentFrame } from "remotion";
import { Video } from "@remotion/media";
import { useScale } from "../hooks/useScale";
import { PROTOCOLS, PROTOCOL_KEYS, THEME } from "../tokens";
import type { LayoutProps } from "../types";
import { Window } from "./Window";
import { Avatar } from "./Avatar";

export const PresentationLayout: React.FC<LayoutProps> = ({
  speaker,
  contentUrl,
  contentType = "image",
  videoStartTime = 0,
  title = "逻辑会审",
  prevSpeakingFrames,
  offlineStatus,
}) => {
  const frame = useCurrentFrame();
  const { s, isVertical } = useScale();

  return (
    <div
      style={{
        padding: isVertical ? `0px` : `${s(60)}px ${s(120)}px`,
        width: "100%",
        height: "100%",
      }}
    >
      <Window
        title={`噪声之下 - ${title} / 协作模式`}
        style={{ width: "100%", height: "100%" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            backgroundColor: THEME.glassBg,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: isVertical ? "column" : "row",
              width: "100%",
              flex: 1,
              overflow: "hidden",
            }}
          >
            {/* Main Content Area - Fill space */}
            <div
              style={{
                flex: isVertical ? 1 : 4.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#000",
                overflow: "hidden",
              }}
            >
              {contentUrl ? (
                contentType === "video" ? (
                  <>
                    <Video
                      src={contentUrl}
                      trimBefore={videoStartTime}
                      objectFit="cover"
                      delayRenderTimeoutInMilliseconds={100000}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </>
                ) : (
                  <Img
                    src={contentUrl}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )
              ) : (
                <div
                  style={{
                    color: "rgba(255,255,255,0.2)",
                    fontSize: s(30),
                  }}
                >
                  No Content Loaded
                </div>
              )}
            </div>

            {/* Participant Sideboard - Compact column */}
            <div
              style={{
                flex: isVertical ? 0.3 : 1,
                display: "flex",
                flexDirection: isVertical ? "row" : "column",
                padding: s(5),
                overflow: "hidden",
                borderLeft: isVertical
                  ? "none"
                  : `${s(1)}px solid rgba(255,255,255,0.1)`,
                borderTop: isVertical
                  ? `${s(1)}px solid rgba(255,255,255,0.1)`
                  : "none",
              }}
            >
              {PROTOCOL_KEYS.map((p) => (
                <div
                  key={p}
                  style={{
                    flex: 1,
                    border: `${s(1)}px solid ${speaker === p ? PROTOCOLS[p].color : "rgba(255,255,255,0.02)"}`,
                    borderRadius: s(4),
                    margin: s(2),
                    overflow: "hidden",
                    backgroundColor:
                      speaker === p ? "rgba(255,255,255,0.03)" : "transparent",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    protocol={p}
                    isSpeaking={speaker === p}
                    isOffline={offlineStatus[p]}
                    speakingFrame={
                      prevSpeakingFrames[p] + (speaker === p ? frame : 0)
                    }
                    isSmall={true}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </Window>
    </div>
  );
};
