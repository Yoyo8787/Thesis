import { useEffect, useState, useRef } from "react";
import { merge } from "lodash";
import Introduction from "./components/IntroductionPage";
import CoursePage from "./components/CoursePage";
import PetIntroduction from "./components/PetIntroductionPage";
import ExamPage from "./components/ExamPage";
import SettingPage from "./components/SettingPage";
import LearningTestPage from "./components/LearningTestPage";
import InfoFormPage from "./components/InfoFormPage";
import AnotherFormPage from "./components/AnotherFormPage";

function App() {
    const [stage, setStage] = useState(0);
    const [pet, setPet] = useState({
        courseRelated: false,
        interactivity: false,
    });
    const ResultRef = useRef({
        results: [],
    });

    //避免使用者重整頁面
    useEffect(() => {
        window.onbeforeunload = function (event) {
            event.preventDefault();
            event.returnValue = "請勿離開實驗畫面";
        };
    }, []);

    //流程控制
    const nextStage = () => {
        console.log(ResultRef.current);
        setStage((prevStage) => prevStage + 1);
    };

    //添加測驗結果
    const addVARKResults = (result) => {
        ResultRef.current.VARK = result;
    };
    const addResults = (newResult) => {
        const existingIndex = ResultRef.current.results.findIndex(
            (result) =>
                result.courseRelated === pet.courseRelated &&
                result.interactivity === pet.interactivity
        );

        if (existingIndex !== -1) {
            ResultRef.current.results[existingIndex] = merge(
                ResultRef.current.results[existingIndex],
                newResult
            );
        } else {
            ResultRef.current.results.push({
                ...newResult,
                courseRelated: pet.courseRelated,
                interactivity: pet.interactivity,
            });
        }
    };
    const addInfo = (info, value) => {
        ResultRef.current[info] = value;
    };

    //下載測驗結果
    const downloadJSON = () => {
        const dataStr =
            "data:text/json;charset=utf-8," +
            encodeURIComponent(JSON.stringify(ResultRef.current));
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
        { name: "實驗介紹", component: <Introduction nextStage={nextStage} /> },
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
            component: <PetIntroduction pet={pet} nextStage={nextStage} />,
        },
        {
            name: "課程 企業減碳法規全攻略 從政策到義務",
            component: (
                <CoursePage
                    courseNum={1}
                    pet={pet}
                    addPetStatus={addResults}
                    nextStage={nextStage}
                />
            ),
        },
        {
            name: "測驗 企業減碳法規全攻略 從政策到義務",
            component: (
                <ExamPage
                    courseNum={1}
                    addResults={addResults}
                    nextStage={nextStage}
                />
            ),
        },
        {
            name: "寵物狀態更新",
            component: <PetIntroduction pet={pet} nextStage={nextStage} />,
        },
        {
            name: "課程 企業減碳法規全攻略 措施實施與合規審查",
            component: (
                <CoursePage
                    courseNum={2}
                    pet={pet}
                    addPetStatus={addResults}
                    nextStage={nextStage}
                />
            ),
        },
        {
            name: "測驗 企業減碳法規全攻略 措施實施與合規審查",
            component: (
                <ExamPage
                    courseNum={2}
                    addResults={addResults}
                    nextStage={nextStage}
                />
            ),
        },
        {
            name: "問卷調查",
            component: (
                <AnotherFormPage nextStage={nextStage} addInfo={addInfo} />
            ),
        },
        {
            name: "基本資料填寫",
            component: <InfoFormPage nextStage={nextStage} addInfo={addInfo} />,
        },
        {
            name: "訪問",
            component: <button onClick={downloadJSON}>下載資料</button>,
        },
    ];

    //控制寵物切換
    useEffect(() => {
        if (stage === 6) {
            setPet((prevPet) => {
                return {
                    courseRelated: prevPet.courseRelated,
                    interactivity: !prevPet.interactivity,
                };
            });
        }
    }, [stage]);

    return (
        <>
            <h1 className="title">{Page[stage].name}</h1>
            {Page[stage].component}
        </>
    );
}

export default App;
