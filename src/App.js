import { useState } from "react";

import Pet from "./components/Pet";
import Introduction from "./components/Introduction";
import CoursePage from "./components/CoursePage";
import PetIntroduction from "./components/PetIntroduction";
import ExamPage from "./components/ExamPage";
import SettingPage from "./components/SettingPage";

function App() {
    const experimentStage = [
        "實驗設定",
        "實驗介紹",
        "寵物介紹",
        "課程 企業減碳法規全攻略 (上)",
        "測驗 企業減碳法規全攻略 (上)",
        "寵物更新",
        "課程 企業減碳法規全攻略 (下)",
        "測驗 企業減碳法規全攻略 (下)",
    ];
    const [stage, setStage] = useState(0);
    const [lock, setLock] = useState(true);
    const [pet, setPet] = useState({ name: "pet1", interact: false });
    const [results, setResults] = useState({});

    const nextStage = () => {
        setStage((prevStage) => prevStage + 1);
        setLock(true);
    };
    const addResults = (retention, transfer) => {};

    return (
        <>
            <h1 className="title">{experimentStage[stage]}</h1>
            {experimentStage[stage] === "實驗設定" && (
                <SettingPage nextStage={nextStage} setPet={setPet} />
            )}
            {experimentStage[stage] === "實驗介紹" && (
                <Introduction setLock={setLock} />
            )}
            {experimentStage[stage] === "寵物介紹" && (
                <PetIntroduction setLock={setLock} />
            )}
            {experimentStage[stage] === "課程 企業減碳法規全攻略 (上)" && (
                <CoursePage courseNum={1} setLock={setLock} />
            )}
            {experimentStage[stage] === "測驗 企業減碳法規全攻略 (上)" && (
                <ExamPage courseNum={1} setLock={setLock} />
            )}
            {experimentStage[stage] === "寵物更新" && (
                <PetIntroduction courseNum={2} setLock={setLock} />
            )}
            {experimentStage[stage] === "課程 企業減碳法規全攻略 (下)" && (
                <CoursePage courseNum={2} setLock={setLock} />
            )}
            {experimentStage[stage] === "測驗 企業減碳法規全攻略 (下)" && (
                <ExamPage courseNum={2} setLock={setLock} />
            )}
            <Pet setting={pet} />
            <button
                className="nextBt"
                onClick={() => {
                    setStage((prevStage) => prevStage + 1);
                    setLock(true);
                }}
                disabled={lock}
            >
                下一步
            </button>
        </>
    );
}

export default App;
