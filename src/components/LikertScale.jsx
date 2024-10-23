import React, { useState } from "react";
import DV from "../assets/DV.json";

const LikertScale = ({ examRef, checkFinished }) => {
    const [responses, setResponses] = useState({});

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
            {DV.questions.map((section, sectionIndex) => (
                <table key={section.name} className="likert">
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

                    {section.statements.map((statement, statementIndex) => (
                        <tr key={statementIndex}>
                            <td className="statement">{statement}</td>
                            {LikertOptions(section.name, statementIndex)}
                        </tr>
                    ))}
                </table>
            ))}
        </>
    );
};

export default LikertScale;
