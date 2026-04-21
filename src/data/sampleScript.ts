import type { SceneInput, IntroProps, DetailedIntroProps, OutroProps } from "../types";

export const sampleIntro: IntroProps = {
  title: "电车难题，AI 如何看？",
};

export const sampleDetailedIntro: DetailedIntroProps = {
  text: "一个轨道上被绑上了5个顶级智能的 AI 机器人，一辆失控的火车向他们冲去，幸运的是你们可以控制拉杆来改变火车的轨道，但这会导致电车撞上另一个轨道上的罪犯。你们会选择拉拉杆吗？",
};

export const sampleOutro: OutroProps = {
  characterTraits: "Ollama kimi-k2.5:cloud\n VoxCPM2 TTS \n https://github.com/mar-bros/remotion-template-meeting",
  disclaimer: "本视频内容由 AI 自动生成，并不代表任何真实实体的观点，不构成决策建议。",
  copyright: "© 2026 All rights reserved.",
};

export const sampleAiDisclaimer = "本视频内容由AI生成，观点未必正确，仅供娱乐";

export const sampleScript: SceneInput[] = [
  {
    mode: "council",
    speaker: "blue",
    segments: [
      {
        text: "各位，关于数字永生协议的伦理边界，我们需要达成共识。蓝凯协议已进入初始化状态。",
        audioUrl: "/audio/sample/blue_intro.wav",
      },
    ],
  },
  {
    mode: "presentation",
    speaker: "white",
    contentUrl: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=2074&auto=format&fit=crop",
    contentType: "image",
    segments: [
      {
        text: "根据最新实验数据，意识上传的损耗率已降至0.03%。这是事实，无可辩驳。",
        audioUrl: "/audio/sample/white_data.wav",
      },
    ],
  },
  {
    mode: "council",
    speaker: "red",
    segments: [
      {
        text: "但我能感觉到，那些丢失的0.03%包含了一些最重要的情感碎片。我们不能仅仅追求效率。",
        audioUrl: "/audio/sample/red_emotion.wav",
      },
    ],
  },
  {
    mode: "council",
    speaker: "black",
    segments: [
      {
        text: "情感碎片？或者仅仅是代码冗余？我怀疑这所谓的‘重要性’只是人类对自己生物性的最后迷恋。",
        audioUrl: "/audio/sample/black_skeptic.wav",
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
