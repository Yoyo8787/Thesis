import React from "react";
import { Pet1Intro } from "../assets/Pet1/Pet1";
import { Pet2Intro } from "../assets/Pet2/Pet2";

const PetIntroduction = ({ pet, setLock }) => {
    const petIntro = pet === "related" ? Pet1Intro : Pet2Intro;
    const interactalbe = pet.interact;

    return (
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
                        <img src={petIntro.image} alt="背著工廠的烏龜" />
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
                            {petIntro.interactions.map((interaction, index) => (
                                <li key={index}>
                                    <strong>{interaction.title}</strong>：
                                    {interaction.content}
                                </li>
                            ))}
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
    );
};

export default PetIntroduction;
