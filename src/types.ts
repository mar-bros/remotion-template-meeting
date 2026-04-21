import { z } from "zod";

// ─── Protocol / Character Types ───────────────────────────────────────────────

export const PROTOCOL_TYPE_VALUES = [
  "blue",
  "white",
  "red",
  "black",
  "yellow",
  "green",
] as const;

export type ProtocolType = (typeof PROTOCOL_TYPE_VALUES)[number];

export interface ProtocolConfig {
  name: string;
  color: string;
  age: string;
  gender: string;
  personality: string;
  avatar: string; // resolved by staticFile()
  avatarType: "video" | "image";
  hasGlitch: boolean;
}

// ─── Scene / Dialogue Types (Input – before calculateMetadata) ────────────────

export interface DialogueSegmentInput {
  text: string;
  audioUrl?: string;
  durationInFrames?: number; // Optional: resolved via audio duration or fallback
}

export interface SceneInput {
  mode: "council" | "presentation";
  speaker: ProtocolType;
  segments: DialogueSegmentInput[];
  contentUrl?: string;
  contentType?: "image" | "video";
}

// ─── Scene / Dialogue Types (Resolved – after calculateMetadata) ──────────────

export interface DialogueSegment {
  text: string;
  audioUrl?: string;
  durationInFrames: number; // Guaranteed after resolution
}

export interface Scene {
  durationInFrames: number; // Total sum of segments
  mode: "council" | "presentation";
  speaker: ProtocolType;
  segments: DialogueSegment[];
  contentUrl?: string;
  contentType?: "image" | "video";
}

// ─── Component Props ─────────────────────────────────────────────────────────

export interface KaiCoreProps {
  scenes: Scene[];
  title?: string;
}

export interface LayoutProps {
  speaker?: ProtocolType;
  title?: string;
  prevSpeakingFrames: Record<string, number>;
  offlineStatus: Record<string, boolean>;
  contentUrl?: string;
  contentType?: "image" | "video";
  videoStartTime?: number;
}

// ─── Zod Schemas (for Remotion Studio & input validation) ─────────────────────

const DialogueSegmentInputSchema = z.object({
  text: z.string(),
  audioUrl: z.string().optional(),
  durationInFrames: z.number().optional(),
});

const SceneInputSchema = z.object({
  mode: z.enum(["council", "presentation"]),
  speaker: z.enum(PROTOCOL_TYPE_VALUES),
  segments: z.array(DialogueSegmentInputSchema).min(1),
  contentUrl: z.string().optional(),
  contentType: z.enum(["image", "video"]).optional(),
});

export const KaiCoreSchema = z.object({
  scenes: z.array(SceneInputSchema),
  title: z.string().optional(),
});
