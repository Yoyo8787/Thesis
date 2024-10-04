import React from "react";
import image from "../assets/Pet1/Pet_1_idle_0.png";

const PetIntroduction = ({ setLock }) => {
    return (
        <div className="IntroPage" style={{ maxWidth: "80rem" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "2rem",
                    flexWrap: "wrap",
                }}
            >
                <div className="card">
                    <h1>減碳小英雄：背著工廠的烏龜</h1>
                    <div className="turtle-container">
                        <img src={image} alt="背著工廠的烏龜" />
                    </div>

                    <div className="description">
                        <p>
                            這隻可愛的烏龜，雖然外表萌萌噠，但背後卻背負著沉重的負擔
                            一座正在排放黑煙的工廠。這隻烏龜是
                            <strong>環保減碳</strong>的象徵，提醒我們關注
                            <strong>企業碳排對環境的影響</strong>。
                        </p>
                        <p>
                            這隻烏龜代表了現代企業在追求經濟發展的同時被摧殘的環境，提醒我們需要減少工廠排放的碳足跡，尋找更清潔的能源，並推動可持續發展。
                            背上的工廠正是企業在減碳過程中所面臨的挑戰的化身。
                        </p>
                    </div>
                </div>

                <div className="interaction-tips">
                    <h2>與減碳烏龜互動教學</h2>
                    <p>你可以通過以下方式與這隻可愛的減碳烏龜互動：</p>
                    <ul>
                        <li>
                            <strong>按下空白鍵</strong>
                            ：每次按下空白鍵，你都能讓烏龜做出可愛的動作。
                        </li>
                        <li>
                            <strong>滑鼠拖動</strong>
                            ：按住滑鼠左鍵並拖動，將烏龜移動到螢幕的任意位置，隨你擺放。
                        </li>
                    </ul>
                </div>
            </div>
            <br />
            <hr />
            <div className="agree">
                <input
                    type="checkbox"
                    name=""
                    id="agree"
                    onChange={(e) => setLock(!e.target.checked)}
                />
                <label htmlFor="agree">
                    我已了解這隻烏龜象徵著環境污染與減碳的挑戰，並準備好通過課程學習來幫助這隻可憐的烏龜。
                </label>
            </div>
        </div>
    );
};

export default PetIntroduction;
