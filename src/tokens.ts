import { staticFile } from "remotion";
import type { ProtocolConfig, ProtocolType } from "./types";

export const PROTOCOLS: Record<ProtocolType, ProtocolConfig> = {
  blue: {
    name: "Kai",
    color: "#002FA7",
    age: "200",
    gender: "中性",
    personality: "", // 理性控场
    avatar: staticFile("/avatars/blue.mp4"),
    avatarType: "video",
    hasGlitch: false,
  },
  white: {
    name: "Data",
    color: "#F0F0F0",
    age: "28",
    gender: "女性",
    personality: "", // 事实主义
    avatar: staticFile("/avatars/white.mp4"),
    avatarType: "video",
    hasGlitch: false,
  },
  red: {
    name: "Echo",
    color: "#DC143C",
    age: "22",
    gender: "女性",
    personality: "",// 感性模拟
    avatar: staticFile("/avatars/red.mp4"),
    avatarType: "video",
    hasGlitch: false,
  },
  black: {
    name: "Void",
    color: "#1A1A1A",
    age: "45",
    gender: "男性",
    personality: "", // 极致怀疑
    avatar: staticFile("/avatars/black.mp4"),
    avatarType: "video",
    hasGlitch: false,
  },
  yellow: {
    name: "Solar",
    color: "#FFD700",
    age: "18",
    gender: "男性",
    personality: "", // 乐观进化
    avatar: staticFile("/avatars/yellow.mp4"),
    avatarType: "video",
    hasGlitch: false,
  },
  green: {
    name: "Flux",
    color: "#39FF14",
    age: "随机",
    gender: "非二元",
    personality: "", // 创意裂变
    avatar: staticFile("/avatars/green.mp4"),
    avatarType: "video",
    hasGlitch: false,
  },
};

export const PROTOCOL_KEYS: ProtocolType[] = Object.keys(PROTOCOLS) as ProtocolType[];

export const THEME = {
  background: "#0a0a0a",
  desktopBg: staticFile("/bg-desktop.png"),
  windowHeaderHeight: 50,
  windowBorderRadius: 16,
  glassBg: "rgba(20, 20, 20, 0.5)",
  accentBlue: "#002FA7",
};
