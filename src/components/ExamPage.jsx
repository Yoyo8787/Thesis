import React, { useRef, useState } from "react";
import Exam from "./Exam";
import LikertScale from "./LikertScale";
import projectSetting from "../assets/Setting";

const ExamPage = ({ courseNum, addResults, nextStage }) => {
    const [lock, setLock] = useState(projectSetting.lockPage);
    const examRef = useRef({
        retention: 0,
        transfer: 0,
        "MW-D": [0, 0, 0, 0],
        "MW-S": [0, 0, 0, 0],
        intrest: [0, 0],
        engagement: [0, 0],
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
            !examRef.current.engagement.includes(0)
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
            </div>
            <button className="nextBt" onClick={handleSubmit} disabled={lock}>
                下一步
            </button>
        </>
    );
};

export default ExamPage;
