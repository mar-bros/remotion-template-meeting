import { staticFile } from "remotion";
import { Scene } from "../KaiCore";

export const sampleScript: Scene[] = [
  {
    mode: "council",
    speaker: "blue",
    text: "欢迎来到《噪声之下》。我是 Kai。今天我们将启动逻辑会审，讨论数字永生。",
    durationInFrames: 120,
  },
  {
    mode: "council",
    speaker: "green",
    text: "从数据来看，脑机接口的同步率已达 98.2%。这在技术上已经接近临界点。",
    durationInFrames: 150,
  },
  {
    mode: "presentation",
    speaker: "black",
    text: "但这正是风险所在。如果代码产生坏道，所谓的永生只是无尽的电子炼狱。",
    durationInFrames: 240,
    contentUrl: staticFile("/share-desktop.png"), // Using desktop as a placeholder for a "glitchy footage"
    contentType: "image",
  },
  {
    mode: "presentation",
    speaker: "green",
    text: "但对于失去至亲的人来说，哪怕是代码里的一个拥抱，也是一种慈悲。",
    durationInFrames: 180,
    contentUrl: staticFile("/share-desktop.png"),
    contentType: "image",
  },
  {
    mode: "council",
    speaker: "blue",
    text: "那么，如果失控就是自由的代价，人类是否还愿意支付？会审暂告一段落。下个维度见。",
    durationInFrames: 180,
  }
];

export const calculateTotalDuration = (scenes: Scene[]) => {
  return scenes.reduce((total, scene) => total + scene.durationInFrames, 0);
};
