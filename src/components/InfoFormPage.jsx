import React, { useState } from "react";
import questionnaire from "../assets/BasicInfo.json";

const InfoFormPage = ({ addInfo, nextStage, testMode }) => {
    const [lock, setLock] = useState(testMode);
    const [result, setResult] = useState({});
    const [otherInput, setOtherInput] = useState({}); // 用來儲存 "其他" 選項的輸入

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const updatedResult = { ...result, [name]: value };

        setResult(updatedResult);
        addInfo(name, value); // 更新表單資料
        checkCompletion(updatedResult); // 檢查是否可以解鎖下一步按鈕
    };

    const handleOtherInputChange = (event) => {
        const { name, value } = event.target;
        setOtherInput({ ...otherInput, [name]: value });
        setResult({ ...result, [name]: "其他 (Other)" });
        addInfo(name, value);
        checkCompletion({ ...result, [name]: value });
    };

    const checkCompletion = (updatedResult) => {
        // 確認所有問題都有答案後解鎖 "下一步" 按鈕
        const allAnswered = Object.keys(questionnaire).every(
            (key) => updatedResult[key] && updatedResult[key] !== ""
        );
        if (allAnswered) {
            setLock(false);
        }
    };

    const renderQuestion = (questionKey, questionData) => {
        return (
            <div key={questionKey} className="question">
                <h3>{questionData.question}</h3>
                {questionData.options.map((option, index) => (
                    <div key={index} className="option">
                        <label>
                            <input
                                type="radio"
                                name={questionKey}
                                value={option}
                                onChange={handleInputChange}
                                checked={result[questionKey] === option}
                            />
                            {option}
                            {questionData.otherOption &&
                                option === "其他 (Other)" && (
                                    <input
                                        className="otherInput"
                                        type="text"
                                        name={questionKey} // 直接更新對應的 key，例如 gender 或 education
                                        value={otherInput[questionKey] || ""}
                                        placeholder="請填寫 (Please specify)"
                                        onChange={handleOtherInputChange}
                                    />
                                )}
                        </label>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <div className="ExamPage">
                {Object.keys(questionnaire).map((key) =>
                    renderQuestion(key, questionnaire[key])
                )}
            </div>
            <button className="nextBt" onClick={nextStage} disabled={lock}>
                下一步
            </button>
        </>
    );
};

export default InfoFormPage;
