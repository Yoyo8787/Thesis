import React, { useRef, useState } from "react";
import Exam from "./Exam";
import LikertScale from "./LikertScale";
import projectSetting from "../assets/Setting";

const ExamPage = ({ courseNum, addResults, nextStage }) => {
    const [lock, setLock] = useState(projectSetting.lockPage);
    const [MC, setMC] = useState(-1);
    const examRef = useRef({
        retention: 0,
        transfer: 0,
        "MW-D": [0, 0, 0, 0],
        "MW-S": [0, 0, 0, 0, 0],
        intrest: [0, 0],
        engagement: [0, 0],
        "MC-interactivity": -1,
    });
    const handleSubmit = () => {
        addResults(examRef.current);
        nextStage();
    };
    const checkFinished = () => {
        if (
            !examRef.current["MW-D"].includes(0) &&
            !examRef.current["MW-S"].includes(0) &&
            !examRef.current.intrest.includes(0) &&
            !examRef.current.engagement.includes(0) &&
            examRef.current.MC !== -1
        ) {
            setLock(false);
        } else {
            console.log(examRef.current);
        }
    };

    return (
        <>
            <div className="ExamPage">
                <Exam
                    courseNum={courseNum}
                    examRef={examRef}
                    checkFinished={checkFinished}
                />
                <LikertScale examRef={examRef} checkFinished={checkFinished} />
                <div className="question">
                    <h3>{`我是否能夠控制剛剛的寵物?`}</h3>
                    {["能", "不能", "不確定"].map((option, index) => (
                        <div className="option" key={"MC_" + index}>
                            <input
                                type="radio"
                                name={`question-MC`}
                                id={`question-MC-option-${index}`}
                                value={index}
                                checked={MC === index}
                                onChange={() => {
                                    setMC(index);
                                    examRef.current["MC-interactivity"] = index;
                                    checkFinished();
                                }}
                            />
                            <label htmlFor={`question-MC-option-${index}`}>
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <button className="nextBt" onClick={handleSubmit} disabled={lock}>
                下一步
            </button>
        </>
    );
};

export default ExamPage;
