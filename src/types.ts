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

export interface AgentAction {
  emotion?: "happy" | "angry" | "thinking" | "sad" | "shocked" | "normal";
  movement?: "whisper_left" | "whisper_right" | "nod" | "shake_head" | "look_around" | "idle";
  floatingText?: string;
  isOffline?: boolean;
}

export interface DialogueSegmentInput {
  text: string;
  audioUrl?: string;
  durationInFrames?: number; // Optional: resolved via audio duration or fallback
  agentStates?: Partial<Record<ProtocolType, AgentAction>>;
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
  agentStates?: Partial<Record<ProtocolType, AgentAction>>;
}

export interface Scene {
  durationInFrames: number; // Total sum of segments
  mode: "council" | "presentation";
  speaker: ProtocolType;
  segments: DialogueSegment[];
  contentUrl?: string;
  contentType?: "image" | "video";
}

// ─── Special Slide Types ──────────────────────────────────────────────────

export interface IntroProps {
  title: string;
  durationInFrames?: number;
}

export interface DetailedIntroProps {
  text: string;
  audioUrl?: string;
  durationInFrames?: number;
  postWaitDurationInFrames?: number;
}

export interface OutroProps {
  copyright: string;
  characterTraits: string;
  disclaimer: string;
  durationInFrames?: number;
}

// ─── Component Props ─────────────────────────────────────────────────────────

export interface KaiCoreProps {
  scenes: Scene[];
  title?: string;
  intro?: IntroProps;
  detailedIntro?: DetailedIntroProps;
  outro?: OutroProps;
  aiDisclaimer?: string;
}

export interface LayoutProps {
  speaker?: ProtocolType;
  title?: string;
  prevSpeakingFrames: Record<string, number>;
  offlineStatus: Record<string, boolean>;
  contentUrl?: string;
  contentType?: "image" | "video";
  videoStartTime?: number;
  segments?: DialogueSegment[];
}

// ─── Zod Schemas (for Remotion Studio & input validation) ─────────────────────

const AgentActionSchema = z.object({
  emotion: z.enum(["happy", "angry", "thinking", "sad", "shocked", "normal"]).optional(),
  movement: z.enum(["whisper_left", "whisper_right", "nod", "shake_head", "look_around", "idle"]).optional(),
  floatingText: z.string().optional(),
  isOffline: z.boolean().optional(),
});

const DialogueSegmentInputSchema = z.object({
  text: z.string(),
  audioUrl: z.string().optional(),
  durationInFrames: z.number().optional(),
  agentStates: z.record(z.enum(PROTOCOL_TYPE_VALUES), AgentActionSchema).optional(),
});

const SceneInputSchema = z.object({
  mode: z.enum(["council", "presentation"]),
  speaker: z.enum(PROTOCOL_TYPE_VALUES),
  segments: z.array(DialogueSegmentInputSchema).min(1),
  contentUrl: z.string().optional(),
  contentType: z.enum(["image", "video"]).optional(),
});

const IntroSchema = z.object({
  title: z.string(),
  durationInFrames: z.number().optional(),
});

const DetailedIntroSchema = z.object({
  text: z.string(),
  audioUrl: z.string().optional(),
  durationInFrames: z.number().optional(),
  postWaitDurationInFrames: z.number().optional(),
});

const OutroSchema = z.object({
  copyright: z.string(),
  characterTraits: z.string(),
  disclaimer: z.string(),
  durationInFrames: z.number().optional(),
});

export const KaiCoreSchema = z.object({
  scenes: z.array(SceneInputSchema),
  title: z.string().optional(),
  intro: IntroSchema.optional(),
  detailedIntro: DetailedIntroSchema.optional(),
  outro: OutroSchema.optional(),
  aiDisclaimer: z.string().optional(),
});
