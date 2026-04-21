import type { SceneInput } from "../types";

// Raw script data input.
// segments.durationInFrames and segments.audioUrl are optional here;
// they will be resolved in Root.tsx via calculateMetadata.
export const sampleScript: SceneInput[] = [
  {
    mode: "council",
    speaker: "blue",
    segments: [
      {
        text: "欢迎来到《噪声之下》。我是 Kai。",
        audioUrl: "tts/kai_part1.mp3",
      },
      {
        text: "今天我们将启动逻辑会审，讨论数字永生。",
        audioUrl: "tts/kai_part2.mp3",
      },
    ],
  },
  {
    mode: "council",
    speaker: "white",
    segments: [
      {
        text: "从数据来看，脑机接口的同步率已达 98.2%。",
        durationInFrames: 90,
      },
      {
        text: "这在技术上已经接近临界点。",
        durationInFrames: 60,
      },
    ],
  },
  {
    mode: "council",
    speaker: "red",
    segments: [
      {
        text: "但对于失去至亲的人来说，哪怕是代码里的一个拥抱...",
        durationInFrames: 90,
      },
      {
        text: "...也是一种慈悲。",
        durationInFrames: 60,
      },
    ],
  },
  {
    mode: "council",
    speaker: "black",
    segments: [
      {
        text: "但这正是风险所在。如果代码产生坏道，所谓的永生只是无尽的电子炼狱。",
        durationInFrames: 240,
      },
    ],
  },
  {
    mode: "council",
    speaker: "blue",
    segments: [
      {
        text: "那么，如果失控就是自由的代价，人类是否还愿意支付？",
        durationInFrames: 120,
      },
      {
        text: "会审暂告一段落。下个维度见。",
        durationInFrames: 120,
      },
    ],
  },
];
