import React, { useEffect, useState } from "react";
import VARK from "../assets/VARK.json";

const VarkQuiz = ({ nextStage, addVARKResults, testMode }) => {
    const [answers, setAnswers] = useState(
        Array(VARK.questions.length).fill(null)
    );
    const [result, setResult] = useState({ V: 0, A: 0, R: 0, K: 0 });
    const [lock, setLock] = useState(testMode);

    const handleSubmit = () => {
        const maxScore = Math.max(result.V, result.A, result.R, result.K);
        const primaryVark = Object.keys(result).find(
            (key) => result[key] === maxScore
        );
        const resultToChinese = {
            V: "視覺學習者",
            A: "聽覺學習者",
            R: "閱讀寫作學習者",
            K: "動手學習者",
        };
        alert(`你的主要學習方式是: ${resultToChinese[primaryVark]}`);
        addVARKResults(result);
        nextStage();
    };

    useEffect(() => {
        if (!answers.includes(null)) {
            setLock(false);
        }

        return () => {};
    }, [answers]);

    const handleAnswer = (questionId, type) => {
        const updatedAnswers = [...answers];
        const previousType = updatedAnswers[questionId - 1];
        updatedAnswers[questionId - 1] = type;

        if (previousType) {
            setResult((prevResult) => ({
                ...prevResult,
                [previousType]: prevResult[previousType] - 1,
            }));
        }
        setResult((prevResult) => ({
            ...prevResult,
            [type]: prevResult[type] + 1,
        }));
        setAnswers(updatedAnswers);
    };

    return (
        <>
            <div className="ExamPage">
                {VARK.questions.map((question) => (
                    <div key={question.id} className="question">
                        <h3 style={{ marginBottom: ".25rem" }}>
                            {question.text}
                        </h3>
                        {question.options.map((option) => (
                            <div key={option.id} className="option">
                                <label>
                                    <input
                                        checked={
                                            answers[question.id - 1] ===
                                            option.type
                                        }
                                        type="radio"
                                        name={`question-${question.id}`}
                                        onChange={() =>
                                            handleAnswer(
                                                question.id,
                                                option.type
                                            )
                                        }
                                    />
                                    {option.text}
                                </label>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <button className="nextBt" onClick={handleSubmit} disabled={lock}>
                下一步
            </button>
        </>
    );
};

export default VarkQuiz;
