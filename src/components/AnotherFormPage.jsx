import React, { useRef, useState } from "react";
import MC from "../assets/MC.json";
import projectSetting from "../assets/Setting";

const AnotherFormPage = ({ addInfo, nextStage }) => {
    const [lock, setLock] = useState(projectSetting.lockPage);
    const [responses, setResponses] = useState({});
    const examRef = useRef({
        petRelation: [0, 0],
    });
    const handleSubmit = () => {
        addInfo("petRelation", examRef.current.petRelation);
        nextStage();
    };

    const checkFinished = () => {
        if (!examRef.current.petRelation.includes(0)) {
            setLock(false);
        } else {
            console.log(examRef.current);
        }
    };

    const handleResponseChange = (name, statementIndex, value) => {
        examRef.current[name][statementIndex] = value;
        setResponses({
            ...responses,
            [`${name}_${statementIndex}`]: value,
        });
        checkFinished();
    };

    const LikertOptions = (name, statementIndex) => {
        return (
            <>
                {[...Array(7)].map((_, index) => (
                    <td
                        key={index}
                        className="radio"
                        onClick={() =>
                            handleResponseChange(
                                name,
                                statementIndex,
                                index + 1
                            )
                        }
                    >
                        <input
                            type="radio"
                            value={index + 1}
                            onChange={() =>
                                handleResponseChange(
                                    name,
                                    statementIndex,
                                    index + 1
                                )
                            }
                            checked={
                                responses[`${name}_${statementIndex}`] ===
                                index + 1
                            }
                        />
                    </td>
                ))}
            </>
        );
    };

    return (
        <>
            <div className="ExamPage">
                {MC.questions.map((section, sectionIndex) => (
                    <table key={section.name} className="likert">
                        <thead>
                            <tr>
                                <th></th>
                                <th className="likertHead">非常不同意</th>
                                <th className="likertHead">不同意</th>
                                <th className="likertHead">稍微不同意</th>
                                <th className="likertHead">中立</th>
                                <th className="likertHead">稍微同意</th>
                                <th className="likertHead">同意</th>
                                <th className="likertHead">非常同意</th>
                            </tr>
                        </thead>
                        <tbody>
                            {section.statements.map(
                                (statement, statementIndex) => (
                                    <tr key={statementIndex}>
                                        <td className="statement">
                                            {statement}
                                        </td>
                                        {LikertOptions(
                                            section.name,
                                            statementIndex
                                        )}
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                ))}
            </div>
            <button className="nextBt" onClick={handleSubmit} disabled={lock}>
                下一步
            </button>
        </>
    );
};

export default AnotherFormPage;