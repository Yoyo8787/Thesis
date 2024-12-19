import React, { useState } from "react";
import { PetRelatedIntro } from "../assets/PetRelated/PetRelated";
import { PetUnRelatedIntro } from "../assets/PetUnrelated/PetUnRelated";

const PetIntroduction = ({ pet, nextStage, testMode }) => {
    const petIntro = pet.courseRelated ? PetRelatedIntro : PetUnRelatedIntro;
    const interactalbe = pet.interactivity;
    const [lock, setLock] = useState(testMode);

    return (
        <>
            <div className="IntroPage" style={{ maxWidth: "80rem" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "2rem",
                        flexWrap: "wrap",
                    }}
                >
                    <div className="card">
                        <h1>{petIntro.cardTitle}</h1>
                        <div className="turtle-container">
                            <img src={petIntro.image} alt="背著工廠的貓咪" />
                        </div>

                        <div className="description">
                            {petIntro.description.map((desc, index) => (
                                <p key={index}>{desc}</p>
                            ))}
                        </div>
                    </div>

                    {interactalbe ? (
                        <div className="interaction-tips">
                            <h2>{petIntro.interactionTitle}</h2>
                            <p>{petIntro.interactionDescription}</p>
                            <ul>
                                {petIntro.interactions.map(
                                    (interaction, index) => (
                                        <li key={index}>
                                            <strong
                                                style={{ fontSize: "1.5rem" }}
                                            >
                                                {interaction.title}
                                            </strong>
                                            ：{interaction.content}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    ) : (
                        <div className="interaction-tips">
                            {petIntro.nointeraction.map((desc, index) => (
                                <p key={index}>{desc}</p>
                            ))}
                        </div>
                    )}
                </div>
                <br />
                <hr />
                <div className="agree">
                    <input
                        type="checkbox"
                        name=""
                        id="agree"
                        onChange={(e) => setLock(!e.target.checked)}
                    />
                    <label htmlFor="agree">{petIntro.agree}</label>
                </div>
            </div>
            <button className="nextBt" onClick={nextStage} disabled={lock}>
                下一步
            </button>
        </>
    );
};

export default PetIntroduction;
