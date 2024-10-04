import { useEffect, useMemo, useState } from "react";

import Pet from "./components/Pet";
import Introduction from "./components/Introduction";
import CoursePage from "./components/CoursePage";
import PetIntroduction from "./components/PetIntroduction";
import ExamPage from "./components/ExamPage";
import SettingPage from "./components/SettingPage";

function App() {
    const experimentStage = useMemo(() => {
        return [
            "實驗設定",
            "實驗介紹",
            "寵物介紹",
            "課程 企業減碳法規全攻略 (上)",
            "測驗 企業減碳法規全攻略 (上)",
            "寵物狀態更新",
            "課程 企業減碳法規全攻略 (下)",
            "測驗 企業減碳法規全攻略 (下)",
        ];
    }, []);
    const [stage, setStage] = useState(0);
    const [showBt, setShowBt] = useState(false);
    const [lock, setLock] = useState(true);
    const [pet, setPet] = useState({ name: "pet1", interact: false });
    const [results, setResults] = useState({});

    const nextStage = () => {
        setStage((prevStage) => prevStage + 1);
        setLock(true);
    };

    useEffect(() => {
        if (experimentStage[stage] === "寵物狀態更新") {
            setPet((prevPet) => {
                return { name: prevPet.name, interact: !prevPet.interact };
            });
        }
        if (
            experimentStage[stage] === "實驗設定" ||
            experimentStage[stage] === "測驗 企業減碳法規全攻略 (下)"
        ) {
            setShowBt(false);
        } else {
            setShowBt(true);
        }
    }, [experimentStage, stage]);

    const addResults = (retention, transfer) => {
        setResults((prevResults) => {
            return {
                ...prevResults,
                [experimentStage[stage]]: {
                    courseRelation: pet.name,
                    interactivity: pet.interact,
                    retention,
                    transfer,
                },
            };
        });
    };

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
                <PetIntroduction pet={pet} setLock={setLock} />
            )}
            {experimentStage[stage] === "課程 企業減碳法規全攻略 (上)" && (
                <>
                    <CoursePage courseNum={1} setLock={setLock} />
                    <Pet setting={pet} />
                </>
            )}
            {experimentStage[stage] === "測驗 企業減碳法規全攻略 (上)" && (
                <ExamPage
                    courseNum={1}
                    setLock={setLock}
                    addResults={addResults}
                />
            )}
            {experimentStage[stage] === "寵物狀態更新" && (
                <PetIntroduction pet={pet} setLock={setLock} />
            )}
            {experimentStage[stage] === "課程 企業減碳法規全攻略 (下)" && (
                <>
                    <CoursePage courseNum={2} setLock={setLock} />
                    <Pet setting={pet} />
                </>
            )}
            {experimentStage[stage] === "測驗 企業減碳法規全攻略 (下)" && (
                <ExamPage
                    courseNum={2}
                    setLock={setLock}
                    addResults={addResults}
                />
            )}

            <button
                className="nextBt"
                onClick={() => {
                    setStage((prevStage) => prevStage + 1);
                    setLock(true);
                }}
                disabled={lock}
                style={{ display: showBt ? "block" : "none" }}
            >
                下一步
            </button>
        </>
    );
}

export default App;
