import idle_0 from "./Pet_related_idle_0.png";
import idle_1 from "./Pet_related_idle_1.png";
import idle_2 from "./Pet_related_idle_2.png";
import idle_3 from "./Pet_related_idle_3.png";

import walk_0 from "./Pet_related_walk_0.png";
import walk_1 from "./Pet_related_walk_1.png";
import walk_2 from "./Pet_related_walk_2.png";
import walk_3 from "./Pet_related_walk_3.png";

import click_0 from "./Pet_related_click_0.png";
import click_1 from "./Pet_related_click_1.png";
import click_2 from "./Pet_related_click_2.png";

import back_0 from "./Pet_related_back_0.png";

import hold_0 from "./Pet_related_hold_0.png";

const PetRelated = {
    idleAnime: [idle_0, idle_1, idle_2, idle_3],
    walkAnime: [walk_0, walk_1, walk_2, walk_3],
    clickAnime: [click_0, click_0, click_1, click_2, click_2],
    holdAnime: [hold_0],
    backAnime: [back_0],
};

export default PetRelated;

const PetRelatedIntro = {
    cardTitle: "減碳小英雄：背著工廠的小貓咪",
    image: idle_0,
    description: [
        "這隻白色的小貓咪，滿臉的哭哭表情讓人心疼，因為它的背後竟然背負著一座正在排放黑煙的工廠。這隻小貓咪象徵環保減碳的努力，提醒我們重視企業碳排對地球的影響。",
    ],
    interactionTitle: "與減碳小貓咪互動教學",
    interactionDescription: "你可以通過以下方式與這隻可憐的減碳小貓咪互動：",
    interactions: [
        {
            title: "按下空白鍵",
            content: "每次按下空白鍵，小貓咪都會喵喵叫，讓人更感受到它的無助。",
        },
        {
            title: "滑鼠拖動",
            content:
                "按住滑鼠左鍵並拖動，將小貓咪移動到螢幕的任意位置，隨心擺放。",
        },
    ],
    nointeraction: [
        "這隻小貓咪不會有任何互動功能，只會靜靜地陪伴你。",
        "但她依然背負著一座排放著黑煙的工廠，無聲地提醒著你減碳的重要性。",
    ],
    agree: "我已了解這隻小貓咪象徵著環境污染與減碳的挑戰，並準備好通過課程學習來幫助這隻可憐的小貓咪。",
};

export { PetRelatedIntro };
