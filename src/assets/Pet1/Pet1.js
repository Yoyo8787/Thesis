import idle_0 from "./Pet_1_idle_0.png";
import idle_1 from "./Pet_1_idle_1.png";
import idle_2 from "./Pet_1_idle_2.png";
import idle_3 from "./Pet_1_idle_3.png";
import idle_4 from "./Pet_1_idle_4.png";
import idle_5 from "./Pet_1_idle_5.png";

import walk_0 from "./Pet_1_walk_0.png";
import walk_1 from "./Pet_1_walk_1.png";
import walk_2 from "./Pet_1_walk_2.png";
import walk_3 from "./Pet_1_walk_3.png";

// import click_0 from "./Pet_1_click_0.png";
import click_1 from "./Pet_1_click_1.png";
import click_2 from "./Pet_1_click_2.png";
import click_3 from "./Pet_1_click_3.png";
import click_4 from "./Pet_1_click_4.png";
import click_5 from "./Pet_1_click_5.png";
import click_6 from "./Pet_1_click_6.png";

import back_0 from "./Pet_1_back_0.png";
import back_1 from "./Pet_1_back_1.png";

const Pet1 = {
    idleAnime: [idle_0, idle_1, idle_2, idle_3, idle_4, idle_5],
    walkAnime: [walk_0, walk_1, walk_2, walk_3],
    clickAnime: [click_1, click_2, click_3, click_4, click_5, click_6, click_6],
    holdAnime: [click_6],
    backAnime: [back_0, back_0, back_0, back_1],
};

export default Pet1;

const Pet1Intro = {
    cardTitle: "減碳小英雄：背著工廠的烏龜",
    image: idle_0,
    description: [
        "這隻可愛的烏龜，雖然外表萌萌噠，但背後卻背負著沉重的負擔一座正在排放黑煙的工廠。這隻烏龜是環保減碳的象徵，提醒我們關注企業碳排對環境的影響。",
        "這隻烏龜代表了現代企業在追求經濟發展的同時被摧殘的環境，提醒我們需要減少工廠排放的碳足跡，尋找更清潔的能源，並推動可持續發展。背上的工廠正是企業在減碳過程中所面臨的挑戰的化身。",
    ],
    interactionTitle: "與減碳烏龜互動教學",
    interactionDescription: "你可以通過以下方式與這隻可愛的減碳烏龜互動：",
    interactions: [
        {
            title: "按下空白鍵",
            content: "：每次按下空白鍵，你都能讓烏龜做出可愛的動作。",
        },
        {
            title: "滑鼠拖動",
            content:
                "：：按住滑鼠左鍵並拖動，將烏龜移動到螢幕的任意位置，隨你擺放。",
        },
    ],
    nointeraction: [
        "這隻烏龜不會有任何互動功能，只會在課程中陪伴你。",
        "但牠會在螢幕上走來走去，時刻提醒著你減碳的重要性。",
    ],
    agree: "我已了解這隻烏龜象徵著環境污染與減碳的挑戰，並準備好通過課程學習來幫助這隻可憐的烏龜。",
};

export { Pet1Intro };
