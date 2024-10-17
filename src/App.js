import { useEffect, useState } from "react";

import Introduction from "./components/Introduction";
import CoursePage from "./components/CoursePage";
import PetIntroduction from "./components/PetIntroduction";
import ExamPage from "./components/ExamPage";
import SettingPage from "./components/SettingPage";
import LearningTestPage from "./components/LearningTestPage";
import Pet from "./components/Pet";

function App() {
    const [stage, setStage] = useState(0);
    const [showBt, setShowBt] = useState(false);
    const [lock, setLock] = useState(true);
    const [pet, setPet] = useState({ name: "pet1", interact: false });
    const [results, setResults] = useState({});

    //流程控制
    const handleNext = () => {
        setStage((prevStage) => prevStage + 1);
        setLock(true);
    };
    const nextStage = () => {
        setStage((prevStage) => prevStage + 1);
        setLock(true);
    };

    //添加測驗結果
    const addVARKResults = (result) => {
        setResults((prevResults) => {
            return {
                ...prevResults,
                [Page[stage].name]: result,
            };
        });
    };
    const addResults = (retention, transfer) => {
        setResults((prevResults) => {
            return {
                ...prevResults,
                [Page[stage].name]: {
                    courseRelation: pet.name,
                    interactivity: pet.interact,
                    retention,
                    transfer,
                },
            };
        });
        setLock(false);
    };
    const addPetStatus = (status) => {
        setResults((prevResults) => {
            return {
                ...prevResults,
                [Page[stage].name]: status,
            };
        });
    };

    //下載測驗結果
    const downloadJSON = () => {
        const dataStr =
            "data:text/json;charset=utf-8," +
            encodeURIComponent(JSON.stringify(results));
        const downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "result.json");
        document.body.appendChild(downloadAnchorNode); // 必须将节点添加到 DOM 中
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    //頁面設定
    const Page = [
        {
            name: "實驗設定",
            component: <SettingPage nextStage={nextStage} setPet={setPet} />,
        },
        { name: "實驗介紹", component: <Introduction setLock={setLock} /> },
        {
            name: "學習模式測驗",
            component: (
                <LearningTestPage
                    nextStage={nextStage}
                    addVARKResults={addVARKResults}
                />
            ),
        },
        {
            name: "寵物介紹",
            component: <PetIntroduction pet={pet} setLock={setLock} />,
        },
        {
            name: "課程 企業減碳法規全攻略 (上)",
            component: (
                <>
                    <CoursePage courseNum={1} setLock={setLock} />
                    <Pet setting={pet} />
                </>
            ),
        },
        {
            name: "測驗 企業減碳法規全攻略 (上)",
            component: <ExamPage courseNum={1} addResults={addResults} />,
        },
        {
            name: "寵物狀態更新",
            component: <PetIntroduction pet={pet} setLock={setLock} />,
        },
        {
            name: "課程 企業減碳法規全攻略 (下)",
            component: (
                <>
                    <CoursePage courseNum={2} setLock={setLock} />
                    <Pet setting={pet} />
                </>
            ),
        },
        {
            name: "測驗 企業減碳法規全攻略 (下)",
            component: <ExamPage courseNum={2} addResults={addResults} />,
        },
        { name: "滿意度調查", component: <button onClick={downloadJSON} /> },
        { name: "基本資料填寫", component: <></> },
        { name: "訪問", component: <></> },
    ];

    //控制按鈕顯示
    useEffect(() => {
        if (stage === 5) {
            setPet((prevPet) => {
                return { name: prevPet.name, interact: !prevPet.interact };
            });
        }
        if (stage === 0 || stage === 2) {
            setShowBt(false);
        } else {
            setShowBt(true);
        }
    }, [stage]);

    return (
        <>
            <h1 className="title">{Page[stage].name}</h1>
            {Page[stage].component}
            <button
                className="nextBt"
                onClick={handleNext}
                disabled={lock}
                style={{ display: showBt ? "block" : "none" }}
            >
                下一步
            </button>
        </>
    );
}

export default App;
