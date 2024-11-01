import React, { useState } from "react";
import projectSetting from "../assets/Setting";

const Introduction = ({ nextStage }) => {
    const [lock, setLock] = useState(projectSetting.lockPage);

    return (
        <>
            <div className="IntroPage">
                <p>親愛的受測者，</p>
                <p>
                    感謝您參加本次實驗！我們的研究旨在探索「虛擬小物件互動」對於學習過程中的注意力與表現的影響。我們將在您觀看課程影片的過程中，提供一個虛擬寵物，並記錄您與它的互動情況，從而分析這些互動是否會對您的學習成果產生影響。
                </p>
                <h3>實驗流程：</h3>
                <ol>
                    <li>首先，我們會向您介紹實驗的目的和流程。</li>
                    <li>接下來，我們會簡單向您講解陪伴您學習的虛擬小寵物。</li>
                    <li>
                        您將觀看第一堂課程影片，並在影片結束後回答一些與課程內容相關的問題。
                    </li>
                    <li>
                        在休息之後，我們會重新啟動虛擬寵物，並開始播放第二堂課程影片。
                    </li>
                    <li>第二堂課程結束後，您將再次回答相關問題。</li>
                </ol>
                <p>
                    在實驗過程中，我們將使用眼動儀記錄您觀看影片時的行為，包括注意力集中程度、心智漫遊情況、以及與虛擬寵物的互動。我們將利用這些數據來分析虛擬物件互動是否影響學習效果。
                </p>
                <p>
                    實驗全程預計約半個小時，非常感謝您的配合！如果您對實驗有任何疑問或感到不適，請隨時告知我們。
                </p>
                <h3>實驗目的：</h3>
                本實驗旨在探討以下因素對學習過程的影響：
                <ul>
                    <li>您是否可以與虛擬寵物進行互動。</li>
                    <li>虛擬寵物的設置是否與課程內容相關。</li>
                </ul>
                <p>
                    實驗數據將用於分析這些因素對注意力、心智漫遊以及學習成效的影響，並有助於未來更好地設計線上學習工具。
                </p>
                <p>我們非常感謝您的參與與支持！</p>
                <div className="agree">
                    <input
                        type="checkbox"
                        onChange={(e) => setLock(!e.target.checked)}
                        id="agree"
                    />
                    <label htmlFor="agree">我詳細閱讀以上內容</label>
                </div>
            </div>
            <button className="nextBt" onClick={nextStage} disabled={lock}>
                下一步
            </button>
        </>
    );
};

export default Introduction;
