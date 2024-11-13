import React, { useState } from "react";
import projectSetting from "../assets/Setting";

const Introduction = ({ nextStage }) => {
    const [lock, setLock] = useState(projectSetting.lockPage);

    return (
        <>
            <div className="IntroPage">
                <p>親愛的研究參與者：</p>
                <p>
                    歡迎您參與本研究！此文件名為「研究參與者知情同意書」，將詳述您在本研究中的相關資訊及您的權利。研究開始前，研究主持人或研究人員會向您說明研究內容，並回答您的任何疑問。
                </p>

                <h3>研究計畫名稱：</h3>
                <p>虛擬寵物對線上學習注意力和表現的影響</p>

                <h3>研究目的：</h3>
                <p>
                    本研究旨在探討虛擬寵物作為紓壓小物（fidget
                    widget）在不同設計條件下對線上學習專注度和表現的影響，特別關注其互動性和與課程相關性的設計因素如何影響學生的專注力和學習成果。
                </p>

                <h3>實驗流程：</h3>
                <ol>
                    <li>閱讀實驗的簡單介紹，了解接下來的步驟。</li>
                    <li>調整並確認眼動儀設備正常運作。</li>
                    <li>完成學習模式測驗。</li>
                    <li>了解虛擬寵物的基本介紹。</li>
                    <li>觀看第一部分課程影片，並完成課後測驗。</li>
                    <li>切換虛擬寵物的互動狀態。</li>
                    <li>觀看第二部分課程影片，並完成課後測驗。</li>
                    <li>填寫基本資料並接受簡短訪談。</li>
                </ol>

                <h3>參與權利：</h3>
                <p>
                    您的參與完全自願，且可以隨時退出而不需給予理由。若您於實驗途中退出，所有收集的數據將被銷毀，並不會影響您的任何權利。
                </p>

                <h3>保密性與資料使用：</h3>
                <p>
                    所有參與者的個人資料將嚴格保密，研究結果僅用於學術分析，並不會公開您的個人資訊。您的數據將保存至2028年12月31日，屆時將被安全銷毀。
                </p>

                <h3>潛在風險與補償：</h3>
                <p>
                    本研究對於參與者無生理或心理上的風險。若因參與本研究導致任何不適或損害，我們將提供適當的補償。您簽署此同意書後，您的法律權利不會因此受到影響。
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
