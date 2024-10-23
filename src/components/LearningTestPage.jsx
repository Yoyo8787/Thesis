import React, { useEffect, useState } from "react";
import VARK from "../assets/VARK.json";

const VarkQuiz = ({ nextStage, addVARKResults }) => {
    const [answers, setAnswers] = useState(
        Array(VARK.questions.length).fill(null)
    );
    const [result, setResult] = useState({ V: 0, A: 0, R: 0, K: 0 });
    const [lock, setLock] = useState(true);

    const handleSubmit = () => {
        if (!answers.includes(null)) {
            const maxScore = Math.max(result.V, result.A, result.R, result.K);
            const primaryVark = Object.keys(result).find(
                (key) => result[key] === maxScore
            );
            alert(`你的主要學習方式是: ${primaryVark}`);
            addVARKResults(result);
            nextStage();
        } else {
            alert("請完成所有問題");
        }
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
