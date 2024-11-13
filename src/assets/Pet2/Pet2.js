import idle_0 from "./Pet_2_idle_0.png";
import idle_1 from "./Pet_2_idle_1.png";
import idle_2 from "./Pet_2_idle_2.png";
import idle_3 from "./Pet_2_idle_3.png";

import walk_0 from "./Pet_2_walk_0.png";
import walk_1 from "./Pet_2_walk_1.png";
import walk_2 from "./Pet_2_walk_2.png";
import walk_3 from "./Pet_2_walk_3.png";

// import click_0 from "./Pet_2_click_0.png";
import click_1 from "./Pet_2_click_1.png";
import click_2 from "./Pet_2_click_2.png";
import click_3 from "./Pet_2_click_3.png";

import hold_0 from "./Pet_2_hold.png";

import back_0 from "./Pet_2_back_0.png";

const Pet2 = {
    idleAnime: [idle_0, idle_1, idle_2, idle_3],
    walkAnime: [walk_0, walk_1, walk_2, walk_3],
    clickAnime: [click_1, click_1, click_2, click_3, click_3],
    holdAnime: [hold_0],
    backAnime: [back_0],
};

export default Pet2;

const Pet2Intro = {
    cardTitle: "可愛小貓咪",
    image: idle_0,
    description: [
        "就是一隻可愛的小貓咪。",
        "沒有其他特別的介紹。但是他可以在接下來無聊的課程中陪伴你。",
    ],
    interactionTitle: "與可愛小貓咪互動教學",
    interactionDescription: "你可以通過以下方式與這隻可愛的貓咪互動：",
    interactions: [
        {
            title: "按下空白鍵",
            content: "每次按下空白鍵，你都能輕拍貓咪的頭使其做出可愛的動作。",
        },
        {
            title: "滑鼠拖動",
            content:
                "按住滑鼠左鍵並拖動，將貓咪移動到螢幕的任意位置，隨你擺放。",
        },
    ],
    nointeraction: [
        "這隻貓咪不會有任何互動，只會在課程中陪伴你。",
        "但她會在畫面的右下角默默的待著，還是十分可愛的。",
    ],
    agree: "我已充分認識這隻可愛的小貓咪，並準備好跟著她的陪伴進入課程。",
};

export { Pet2Intro };
