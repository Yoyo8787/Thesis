import React, { useMemo, useState } from "react";
import Exam1 from "../assets/Exam1.json";
import Exam2 from "../assets/Exam2.json";

const Exam = ({ courseNum, examRef, checkFinished }) => {
    const questions = useMemo(() => {
        if (courseNum === 1) {
            return Exam1.questions;
        } else {
            return Exam2.questions;
        }
    }, [courseNum]);
    const [userAnswers, setUserAnswers] = useState(
        Array(questions.length).fill(null)
    );

    const handleAnswerChange = (questionId, answerIndex) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[questionId - 1] = answerIndex;

        if (!updatedAnswers.includes(null)) {
            let retentionScore = 0;
            let transferScore = 0;
            questions.forEach((question, index) => {
                if (userAnswers[index] === question.correct) {
                    if (question.category === "retention") {
                        retentionScore++;
                    } else {
                        transferScore++;
                    }
                }
            });
            examRef.current.retention = retentionScore;
            examRef.current.transfer = transferScore;
            checkFinished();
        }

        setUserAnswers(updatedAnswers);
    };

    return (
        <>
            {questions.map((question) => (
                <div key={question.id} className="question">
                    <h3>{`${question.question}`}</h3>
                    {question.options.map((option, index) => (
                        <div className="option" key={question.id + "_" + index}>
                            <input
                                type="radio"
                                name={`question-${question.id}`}
                                id={`question-${question.id}-option-${index}`}
                                value={index}
                                checked={userAnswers[question.id - 1] === index}
                                onChange={() =>
                                    handleAnswerChange(question.id, index)
                                }
                            />
                            <label
                                htmlFor={`question-${question.id}-option-${index}`}
                            >
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
};

export default Exam;
