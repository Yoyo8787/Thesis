import React, { useState } from "react";
import DV from "../assets/DV.json";

const LikertScale = () => {
    const [responses, setResponses] = useState({});

    const handleResponseChange = (event) => {
        const { name, value } = event.target;
        setResponses({
            ...responses,
            [name]: value,
        });
    };

    const renderLikertOptions = (name) => {
        return (
            <div>
                {[...Array(7)].map((_, index) => (
                    <label key={index}>
                        <input
                            type="radio"
                            name={name}
                            value={index + 1}
                            onChange={handleResponseChange}
                            checked={responses[name] === String(index + 1)}
                        />
                        {index + 1}
                    </label>
                ))}
            </div>
        );
    };

    return (
        <>
            {DV.questions.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                    {section.statements.map((statement, statementIndex) => (
                        <div key={statementIndex}>
                            <p>{statement}</p>
                            {renderLikertOptions(
                                `q${sectionIndex}_${statementIndex}`
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
};

export default LikertScale;
