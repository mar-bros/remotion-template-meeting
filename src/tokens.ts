import { staticFile } from "remotion";

export const PROTOCOLS = {
  blue: {
    name: "Kai",
    color: "#002FA7",
    age: "200",
    gender: "中性",
    personality: "", // 理性控场
    avatar: staticFile("/avatars/blue.mp4"),
  },
  white: {
    name: "Data",
    color: "#F0F0F0",
    age: "28",
    gender: "女性",
    personality: "", // 事实主义
    avatar: staticFile("/avatars/white.mp4"),
  },
  red: {
    name: "Echo",
    color: "#DC143C",
    age: "22",
    gender: "女性",
    personality: "", // 感性模拟
    avatar: staticFile("/avatars/red.mp4"),
  },
  black: {
    name: "Void",
    color: "#1A1A1A",
    age: "45",
    gender: "男性",
    personality: "",// 极致怀疑
    avatar: staticFile("/avatars/black.mp4"),
    hasGlitch: false,
  },
  yellow: {
    name: "Solar",
    color: "#FFD700",
    age: "18",
    gender: "男性",
    personality: "", // 乐观进化
    avatar: staticFile("/avatars/yellow.mp4"),
  },
  green: {
    name: "Flux",
    color: "#39FF14",
    age: "随机",
    gender: "非二元",
    personality: "", // 创意裂变
    avatar: staticFile("/avatars/green.mp4"),
  },
} as const;

export type ProtocolType = keyof typeof PROTOCOLS;

export const THEME = {
  background: "#0a0a0a",
  desktopBg: staticFile("/bg-desktop.png"),
  windowHeaderHeight: 50,
  windowBorderRadius: 16,
  glassBg: "rgba(20, 20, 20, 0.5)",
  accentBlue: "#002FA7",
};
