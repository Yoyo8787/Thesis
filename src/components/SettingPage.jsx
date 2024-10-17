import React, { useRef } from "react";

const SettingPage = ({ nextStage, setPet }) => {
    const petRef = useRef(null);
    const interactivityRef = useRef(null);

    return (
        <div className="SettingPage">
            <div className="settingblock">
                <label htmlFor="pet">寵物選擇:</label>
                <select id="pet" ref={petRef}>
                    <option value="" disabled>
                        請選擇
                    </option>
                    <option value="unrelated">貓咪</option>
                    <option value="related">環保小烏龜</option>
                </select>
            </div>

            <div className="settingblock">
                <label htmlFor="interactivity">初始模式選擇:</label>
                <select id="interactivity" ref={interactivityRef}>
                    <option value="" disabled>
                        請選擇
                    </option>
                    <option value="ineractive">可互動</option>
                    <option value="noninteractive">不可互動</option>
                </select>
            </div>
            <div className="settingblock" style={{ justifyContent: "center" }}>
                <button
                    style={{
                        width: "10rem",
                        height: "2.5rem",
                        fontWeight: "bold",
                        fontSize: "1.25rem",
                        borderRadius: ".25rem",
                        border: "none",
                        backgroundColor: "var(--primarycolor)",
                    }}
                    onClick={() => {
                        setPet({
                            name: petRef.current.value,
                            interact:
                                interactivityRef.current.value === "ineractive",
                        });
                        nextStage();
                    }}
                >
                    開始
                </button>
            </div>
        </div>
    );
};

export default SettingPage;
