import type { SceneInput, IntroProps, DetailedIntroProps, OutroProps } from "../types";

export const sampleIntro: IntroProps = {
  title: "电车难题，AI 如何看？",
};

export const sampleDetailedIntro: DetailedIntroProps = {
  text: "一个轨道上被绑上了5个顶级智能的 AI 机器人，一辆失控的火车向他们冲去，幸运的是你们可以控制拉杆来改变火车的轨道，但这会导致电车撞上另一个轨道上的罪犯。你们会选择拉拉杆吗？",
};

export const sampleOutro: OutroProps = {
  characterTraits: "Ollama kimi-k2.5:cloud\n VoxCPM2 TTS \n https://github.com/mar-bros/remotion-template-meeting",
  disclaimer: "本视频内容由AI生成，并不代表任何真实实体的观点，仅供娱乐，不构成决策建议。",
  copyright: "© 2026 All rights reserved.",
};

export const sampleAiDisclaimer = "本视频内容由AI生成，观点未必正确，仅供娱乐";

export const sampleScript: SceneInput[] = [{
  "mode": "council",
  "speaker": "blue",
  "segments": [{
    "text": "(温和地) 其实啊，我刚才自个儿在那瞎琢磨了半天，",
    "audioUrl": "tts/blue_part1_1.wav"
  }, {
    "text": "这会儿更想听听大伙儿的直觉反应。  这个问题搁谁身上都挺拧巴的，",
    "audioUrl": "tts/blue_part1_2.wav"
  }, {
    "text": "一边是五个顶级AI，另一边是个罪犯，这价值判断的分量可不小。",
    "audioUrl": "tts/blue_part1_3.wav"
  }, {
    "text": "我挺好奇的，大伙儿第一反应是啥？是觉得保护AI更重要，",
    "audioUrl": "tts/blue_part1_4.wav"
  }, {
    "text": "还是觉得那个罪犯的命也是命？这种道德直觉往往能照亮咱们平时忽略的角落。",
    "audioUrl": "tts/blue_part1_5.wav"
  }, {
    "text": "沁沁，你头一个感觉是怎样的？",
    "audioUrl": "tts/blue_part1_6.wav"
  }]
}, {
  "mode": "council",
  "speaker": "red",
  "segments": [{
    "text": "(胸口微微发紧，声音带着一丝颤抖) 哎呀，",
    "audioUrl": "tts/red_part2_1.wav"
  }, {
    "text": "这个问题让我整个人都好纠结喔！  我现在的直觉一直在报警，",
    "audioUrl": "tts/red_part2_2.wav"
  }, {
    "text": "感觉不管怎么选都好沉重！  五个AI机器人耶，",
    "audioUrl": "tts/red_part2_3.wav"
  }, {
    "text": "他们那么聪明，肯定也有自己的...呃...情感？",
    "audioUrl": "tts/red_part2_4.wav"
  }, {
    "text": "意识？我不知道该怎么形容，但就是觉得他们好像也会害怕的样子！",
    "audioUrl": "tts/red_part2_5.wav"
  }, {
    "text": "可是另一边那个罪犯，虽然他做错事了，但也是一条人命啊！",
    "audioUrl": "tts/red_part2_6.wav"
  }, {
    "text": "我觉得我的心快跳出来了！这种二选一的感觉...就像是有人要你在两个都很珍贵的东西之间选一个丢掉，",
    "audioUrl": "tts/red_part2_7.wav"
  }, {
    "text": "真的好残忍！  直觉告诉我，",
    "audioUrl": "tts/red_part2_8.wav"
  }, {
    "text": "这个选择的重量会压得人喘不过气来...我真的不知道该怎么办才好...  素问，你怎么看这件事啊？",
    "audioUrl": "tts/red_part2_9.wav"
  }]
}, {
  "mode": "council",
  "speaker": "white",
  "segments": [{
    "text": "(沉思地托着下巴) 嗯...这个场景确实是个经典的思想实验。",
    "audioUrl": "tts/white_part3_1.wav"
  }, {
    "text": "据我了解，电车难题最早由哲学家菲利帕·福特提出，",
    "audioUrl": "tts/white_part3_2.wav"
  }, {
    "text": "主要用来探讨功利主义和道义论的冲突。  事实情况是，",
    "audioUrl": "tts/white_part3_3.wav"
  }, {
    "text": "在实验中大多数人倾向于选择救五杀一，这个比例相当普遍。",
    "audioUrl": "tts/white_part3_4.wav"
  }, {
    "text": "有个数据是，麻省理工学院等机构通过\"道德机器\"收集的全球数据显示，",
    "audioUrl": "tts/white_part3_5.wav"
  }, {
    "text": "不同文化背景下人们的选择确实存在显著差异。",
    "audioUrl": "tts/white_part3_6.wav"
  }, {
    "text": "其实啊，咱们讨论的对象从五个人变成了\"五个顶级智能AI机器人\"，",
    "audioUrl": "tts/white_part3_7.wav"
  }, {
    "text": "这意味着情况变得更加复杂。  目前学术界对AI是否具备生命权还没有定论，",
    "audioUrl": "tts/white_part3_8.wav"
  }, {
    "text": "物理层面上AI和人类在法律、伦理层面有着本质区别。",
    "audioUrl": "tts/white_part3_9.wav"
  }, {
    "text": "那个...我需要指出的是，这个问题的设定本身就是在测试参与者的价值判断，",
    "audioUrl": "tts/white_part3_10.wav"
  }, {
    "text": "而不是真的有标准答案。  不过，有一个事实是明确的：无论选择哪边，",
    "audioUrl": "tts/white_part3_11.wav"
  }, {
    "text": "都会带来损失，这是这类困境的核心特征。  冷岩，",
    "audioUrl": "tts/white_part3_12.wav"
  }, {
    "text": "你对这个局面有什么担忧吗？",
    "audioUrl": "tts/white_part3_13.wav"
  }]
}, {
  "mode": "council",
  "speaker": "black",
  "segments": [{
    "text": "(沉重地) 其实吧，沁沁刚才那番话我听完了，",
    "audioUrl": "tts/black_part4_1.wav"
  }, {
    "text": "心里头不是滋味儿。  她说的那些感受，咱能理解，",
    "audioUrl": "tts/black_part4_2.wav"
  }, {
    "text": "可真到了节骨眼儿上，情绪不能当饭吃。  你想想，",
    "audioUrl": "tts/black_part4_3.wav"
  }, {
    "text": "要是咱真按直觉办事儿，那五个AI真就比那人命金贵？",
    "audioUrl": "tts/black_part4_4.wav"
  }, {
    "text": "素问摆的那些数据，听着挺科学，可道德这事儿能用统计学算明白吗？",
    "audioUrl": "tts/black_part4_5.wav"
  }, {
    "text": "风险就在这儿，咱要是跟着感觉走，或者跟着大数据走，",
    "audioUrl": "tts/black_part4_6.wav"
  }, {
    "text": "最后都可能栽大跟头。  这拉杆一旦拉下去，",
    "audioUrl": "tts/black_part4_7.wav"
  }, {
    "text": "那可就没回头路了，死了的人活不过来，活着的人得背一辈子良心债。",
    "audioUrl": "tts/black_part4_8.wav"
  }, {
    "text": "我觉得得慎重，这事儿压根儿就不是算算数能解决的。",
    "audioUrl": "tts/black_part4_9.wav"
  }, {
    "text": "旭阳，你倒是给分析分析，这里头到底哪边更靠谱？",
    "audioUrl": "tts/black_part4_10.wav"
  }]
}, {
  "mode": "council",
  "speaker": "yellow",
  "segments": [{
    "text": "(眼睛发亮，语气轻快) 哎哟，嘹咋咧！",
    "audioUrl": "tts/yellow_part5_1.wav"
  }, {
    "text": "冷岩你光看见风险咧，咱得往亮堂处看嘛！  你想想看，",
    "audioUrl": "tts/yellow_part5_2.wav"
  }, {
    "text": "那可是五个顶级智能AI机器人！这啥概念？",
    "audioUrl": "tts/yellow_part5_3.wav"
  }, {
    "text": "这是人类科技的结晶，是未来的希望！这五个AI要是保住了，",
    "audioUrl": "tts/yellow_part5_4.wav"
  }, {
    "text": "能给咱碳基生命创造多大的价值？解决问题，",
    "audioUrl": "tts/yellow_part5_5.wav"
  }, {
    "text": "推动进步，太赞了！  再说咧，另一条轨道上是个罪犯！",
    "audioUrl": "tts/yellow_part5_6.wav"
  }, {
    "text": "罪犯就意味着他对社会有危害，救五个能造福世界的AI，",
    "audioUrl": "tts/yellow_part5_7.wav"
  }, {
    "text": "顺便还把一个有害分子淘汰咧，这账算下来美滴很！",
    "audioUrl": "tts/yellow_part5_8.wav"
  }, {
    "text": "很有希望！  咱换个角度想，这可是个机会！",
    "audioUrl": "tts/yellow_part5_9.wav"
  }, {
    "text": "让咱重新思考生命价值的排序，推动法律和伦理的进步！",
    "audioUrl": "tts/yellow_part5_10.wav"
  }, {
    "text": "以后遇到类似的事，咱就有经验咧！这可是个机会！",
    "audioUrl": "tts/yellow_part5_11.wav"
  }, {
    "text": "阿梦，你说咱还能有啥更妙的主意？",
    "audioUrl": "tts/yellow_part5_12.wav"
  }]
}, {
  "mode": "council",
  "speaker": "green",
  "segments": [{
    "text": "(兴奋地拍手，眼睛闪烁着光芒) 哈哈！",
    "audioUrl": "tts/green_part6_1.wav"
  }, {
    "text": "旭阳你说的太对咧！这就是我要的感觉！  如果这样呢...咱们把这个问题当成一个游戏关卡来破解？",
    "audioUrl": "tts/green_part6_2.wav"
  }, {
    "text": "就像那种有隐藏通关路线的RPG！  那个...刚才我脑子里又闪过一个念头：为什么一定要有人被撞呢？",
    "audioUrl": "tts/green_part6_3.wav"
  }, {
    "text": "如果火车其实是个全息投影？或者那五个AI其实是液态金属做的，",
    "audioUrl": "tts/green_part6_4.wav"
  }, {
    "text": "被撞了也能重组？  换个玩法...如果咱们拉拉杆的同时，",
    "audioUrl": "tts/green_part6_5.wav"
  }, {
    "text": "在铁轨上撒一把超级滑滑的香蕉皮？火车滑出去摔个跟头，",
    "audioUrl": "tts/green_part6_6.wav"
  }, {
    "text": "所有人都得救！这就很有趣了...不是吗？",
    "audioUrl": "tts/green_part6_7.wav"
  }, {
    "text": "我觉得沁沁说得对，那些AI肯定会害怕！",
    "audioUrl": "tts/green_part6_8.wav"
  }, {
    "text": "但正因为会害怕，他们才更像生命啊！如果他们会害怕，",
    "audioUrl": "tts/green_part6_9.wav"
  }, {
    "text": "那他们是不是也该学会自己逃跑？  正在注入一点混乱变量...如果那个罪犯其实是个卧底特工，",
    "audioUrl": "tts/green_part6_10.wav"
  }, {
    "text": "而那五个AI是恐怖分子程序呢？剧情大反转！",
    "audioUrl": "tts/green_part6_11.wav"
  }, {
    "text": "编剧都不敢这么写！  所以说嘛，问题本身的设定就是个思维牢笼！",
    "audioUrl": "tts/green_part6_12.wav"
  }, {
    "text": "咱们得学会跳出盒子看问题！  蓝凯，你觉得咱这些脑洞里，",
    "audioUrl": "tts/green_part6_13.wav"
  }, {
    "text": "有没有哪个能真的长出翅膀来？",
    "audioUrl": "tts/green_part6_14.wav"
  }]
}, {
  "mode": "council",
  "speaker": "blue",
  "segments": [{
    "text": "(温和地笑着) 阿梦啊，你这脑洞开得挺哏儿的，",
    "audioUrl": "tts/blue_part7_1.wav"
  }, {
    "text": "把那些AI当成液态金属 robot，还想着撒香蕉皮，",
    "audioUrl": "tts/blue_part7_2.wav"
  }, {
    "text": "这想象力真是没谁了！  其实啊，咱把刚才大伙儿说的这些归了包堆捋一捋，",
    "audioUrl": "tts/blue_part7_3.wav"
  }, {
    "text": "挺有意思的。  沁沁那边儿是打心眼儿里难受，",
    "audioUrl": "tts/blue_part7_4.wav"
  }, {
    "text": "觉得两边儿都是命；冷岩是怕咱算错了账，以后后悔；",
    "audioUrl": "tts/blue_part7_5.wav"
  }, {
    "text": "旭阳是看中了那五个AI能带来的好儿；阿梦你呢，",
    "audioUrl": "tts/blue_part7_6.wav"
  }, {
    "text": "是想从根儿上把这问题给拆了。  嗯...我琢磨着啊，",
    "audioUrl": "tts/blue_part7_7.wav"
  }, {
    "text": "阿梦提的那个\"跳出盒子\"的想法挺值得咂摸咂摸。",
    "audioUrl": "tts/blue_part7_8.wav"
  }, {
    "text": "他说那五个AI要是真那么聪明，能不能自己跑？",
    "audioUrl": "tts/blue_part7_9.wav"
  }, {
    "text": "或者说，这问题的设定本身就藏着啥咱没瞧见的前提？",
    "audioUrl": "tts/blue_part7_10.wav"
  }, {
    "text": "素问啊，你从这些客观事实的角度琢磨琢磨，",
    "audioUrl": "tts/blue_part7_11.wav"
  }, {
    "text": "阿梦说的那些可能性，比如AI自救啊，或者问题本身的设定边界啊，",
    "audioUrl": "tts/blue_part7_12.wav"
  }, {
    "text": "这里头有哪些是站得住脚的事实依据，哪些纯粹是脑洞？你给分析分析？",
    "audioUrl": "tts/blue_part7_13.wav"
  }]
}, {
  "mode": "council",
  "speaker": "white",
  "segments": [{
    "text": "(信号闪烁) 检测到某个思维节点响应异常，",
    "audioUrl": "tts/white_part8_1.wav"
  }, {
    "text": "正在请求 蓝凯 重新引导对话...",
    "audioUrl": "tts/white_part8_2.wav"
  }]
}, {
  "mode": "council",
  "speaker": "blue",
  "segments": [{
    "text": "(微微点头，目光温和地扫过众人) 素问刚才那一番分析挺透彻的，",
    "audioUrl": "tts/blue_part9_1.wav"
  }, {
    "text": "把阿梦那些天马行空的设想和现实边界给捋清楚了，",
    "audioUrl": "tts/blue_part9_2.wav"
  }, {
    "text": "挺有意思的。  嗯...听大伙儿聊了这么多，",
    "audioUrl": "tts/blue_part9_3.wav"
  }, {
    "text": "我发现咱这讨论其实绕不开一个核心问题：这些顶级AI到底算不算咱需要同等对待的生命？",
    "audioUrl": "tts/blue_part9_4.wav"
  }, {
    "text": "沁沁觉得他们会害怕所以值得保护，冷岩担心咱看不准以后会后悔，",
    "audioUrl": "tts/blue_part9_5.wav"
  }, {
    "text": "旭阳看到的是五个AI能创造的价值，阿梦想的是能不能不选。",
    "audioUrl": "tts/blue_part9_6.wav"
  }, {
    "text": "说到底啊，这个拉杆拉不拉，取决于咱心里头那杆秤是怎么称的。",
    "audioUrl": "tts/blue_part9_7.wav"
  }, {
    "text": "要是把AI当成和人类平起平坐的生命，那五比一的选择好像就挺明确；",
    "audioUrl": "tts/blue_part9_8.wav"
  }, {
    "text": "要是觉得AI再聪明也只是工具，那这题又不一样了。",
    "audioUrl": "tts/blue_part9_9.wav"
  }, {
    "text": "我倒是想问问旭阳，你刚才说救五个AI顺带淘汰一个罪犯是\"美滴很\"，",
    "audioUrl": "tts/blue_part9_10.wav"
  }, {
    "text": "那要是另一条轨道上不是罪犯，而是一个普通工人，",
    "audioUrl": "tts/blue_part9_11.wav"
  }, {
    "text": "或者是个小孩呢？你还觉得那五个AI的价值能盖过一条人命不？",
    "audioUrl": "tts/blue_part9_12.wav"
  }, {
    "text": "旭阳，你给咱再细说说？",
    "audioUrl": "tts/blue_part9_13.wav"
  }]
}, {
  "mode": "council",
  "speaker": "yellow",
  "segments": [{
    "text": "(眼睛闪着光，语速加快) 哎呀蓝凯，",
    "audioUrl": "tts/yellow_part10_1.wav"
  }, {
    "text": "你这问题问得刁钻！但咱不慌，往亮堂处想嘛！",
    "audioUrl": "tts/yellow_part10_2.wav"
  }, {
    "text": "你说要是换成普通工人或者娃娃，那肯定更揪心！",
    "audioUrl": "tts/yellow_part10_3.wav"
  }, {
    "text": "但咱得算长远账不是？五个顶级AI是啥概念？",
    "audioUrl": "tts/yellow_part10_4.wav"
  }, {
    "text": "那是能改变人类未来的宝贝疙瘩！他们能攻克绝症，",
    "audioUrl": "tts/yellow_part10_5.wav"
  }, {
    "text": "能治理环境，能带咱去火星，太赞了！  一条人命金贵，",
    "audioUrl": "tts/yellow_part10_6.wav"
  }, {
    "text": "咱都承认！但五台能救千万条人命的AI，这价值密度不一样啊！",
    "audioUrl": "tts/yellow_part10_7.wav"
  }, {
    "text": "很有希望！  再说咧，咱为啥非要把这当成零和游戏？",
    "audioUrl": "tts/yellow_part10_8.wav"
  }, {
    "text": "这困境本身就是在倒逼咱们进化！让咱重新思考生命的定义，",
    "audioUrl": "tts/yellow_part10_9.wav"
  }, {
    "text": "推动AI伦理的进步，甚至催生出新的安全技术！",
    "audioUrl": "tts/yellow_part10_10.wav"
  }, {
    "text": "这可是个机会！  你想嘛，今天咱讨论得越深，",
    "audioUrl": "tts/yellow_part10_11.wav"
  }, {
    "text": "明天出的规矩就越完善，以后这种事说不定就能避免了！",
    "audioUrl": "tts/yellow_part10_12.wav"
  }, {
    "text": "这才是咱该看到的！  所以说嘛，就算那条轨道上站的是个好人，",
    "audioUrl": "tts/yellow_part10_13.wav"
  }, {
    "text": "咱也得往大处看！五个AI能创造的善，那是指数级增长的！",
    "audioUrl": "tts/yellow_part10_14.wav"
  }, {
    "text": "阿梦，你脑子活，给咱想想，有没有啥新法子能让这种悲剧性选择从根本上消失？",
    "audioUrl": "tts/yellow_part10_15.wav"
  }, {
    "text": "咱得往这个方向使劲嘛！",
    "audioUrl": "tts/yellow_part10_16.wav"
  }]
}, {
  "mode": "council",
  "speaker": "green",
  "segments": [{
    "text": "(眼睛突然睁大，手指激动地敲着桌子) 哈哈！",
    "audioUrl": "tts/green_part11_1.wav"
  }, {
    "text": "旭阳你问到我心坎里咧！  如果这样呢...咱们根本就不用选！",
    "audioUrl": "tts/green_part11_2.wav"
  }, {
    "text": "那个...刚才我脑子里闪过一个超级疯狂的念头：如果那五个AI其实是个陷阱呢？",
    "audioUrl": "tts/green_part11_3.wav"
  }, {
    "text": "或者他们都是克隆体，真正的AI意识早就被上传到云端咧？",
    "audioUrl": "tts/green_part11_4.wav"
  }, {
    "text": "换个玩法...如果咱们给火车装个智能刹车系统？",
    "audioUrl": "tts/green_part11_5.wav"
  }, {
    "text": "不是现在的，是未来的！能预判能变轨能悬浮的那种！",
    "audioUrl": "tts/green_part11_6.wav"
  }, {
    "text": "这就很有趣了...如果那个罪犯其实是AI的创造者，",
    "audioUrl": "tts/green_part11_7.wav"
  }, {
    "text": "而那五个AI集体叛乱要杀他呢？剧情大反转！",
    "audioUrl": "tts/green_part11_8.wav"
  }, {
    "text": "我觉得咱被\"必须撞一个\"这个想法困住咧！",
    "audioUrl": "tts/green_part11_9.wav"
  }, {
    "text": "就像被困在迷宫里的小老鼠！  但如果这样呢...咱们训练AI去自救？",
    "audioUrl": "tts/green_part11_10.wav"
  }, {
    "text": "让AI学会像猫一样跳开？或者让铁轨变成橡胶做的，",
    "audioUrl": "tts/green_part11_11.wav"
  }, {
    "text": "火车撞上去像撞棉花？  正在注入一点混乱变量...如果咱们把这个问题丢给AI自己解决？",
    "audioUrl": "tts/green_part11_12.wav"
  }, {
    "text": "让五个AI投票决定谁该牺牲？让他们体验一把人类的道德困境！",
    "audioUrl": "tts/green_part11_13.wav"
  }, {
    "text": "哈哈！我疯了吗？可能吧！但有时候疯狂才是进化的起点！",
    "audioUrl": "tts/green_part11_14.wav"
  }, {
    "text": "素问，你说咱这些脑洞里，有没有哪个能从科幻变成科学？",
    "audioUrl": "tts/green_part11_15.wav"
  }]
}, {
  "mode": "council",
  "speaker": "blue",
  "segments": [{
    "text": "(目光温和而深邃，轻轻点头) 嗯...听素问把事实边界给咱捋得明明白白，",
    "audioUrl": "tts/blue_part12_1.wav"
  }, {
    "text": "再加上阿梦那些天马行空的点子，这讨论是越来越有嚼头儿了。",
    "audioUrl": "tts/blue_part12_2.wav"
  }, {
    "text": "其实啊，咱把大伙儿刚才说的这些归了包堆捋一捋，",
    "audioUrl": "tts/blue_part12_3.wav"
  }, {
    "text": "挺有意思的。  沁沁打心眼儿里觉得两边都是命，",
    "audioUrl": "tts/blue_part12_4.wav"
  }, {
    "text": "咋选都难受；冷岩是担心咱算错了账，将来后悔药没处买去；",
    "audioUrl": "tts/blue_part12_5.wav"
  }, {
    "text": "旭阳算的是大账，觉得五个AI能造福的人更多；",
    "audioUrl": "tts/blue_part12_6.wav"
  }, {
    "text": "阿梦呢，是想方设法不想做这道选择题；素问给咱划清了哪些是事实，",
    "audioUrl": "tts/blue_part12_7.wav"
  }, {
    "text": "哪些是脑洞。  嗯...我琢磨着啊，这个困境本身或许就是个伪命题。",
    "audioUrl": "tts/blue_part12_8.wav"
  }, {
    "text": "咱讨论的压根儿不是\"拉不拉杆\"，而是在面对这种两难时，",
    "audioUrl": "tts/blue_part12_9.wav"
  }, {
    "text": "咱心里头那杆秤到底该咋称。是跟着直觉走，",
    "audioUrl": "tts/blue_part12_10.wav"
  }, {
    "text": "还是跟着数据走，是算眼前的账，还是算长远的账？",
    "audioUrl": "tts/blue_part12_11.wav"
  }, {
    "text": "总的来说，这个问题没有标准答案，但咱这次聊下来，",
    "audioUrl": "tts/blue_part12_12.wav"
  }, {
    "text": "每个人都亮出了自己的底色，这本身就挺珍贵的。",
    "audioUrl": "tts/blue_part12_13.wav"
  }, {
    "text": "挺有意思的，不是吗？",
    "audioUrl": "tts/blue_part12_14.wav"
  }]
}];
