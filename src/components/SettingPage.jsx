import React, { useRef } from "react";

const SettingPage = ({ nextStage, setPet }) => {
    const petRef = useRef(null);
    const interactivityRef = useRef(null);

    const userNameRef = useRef(null);

    return (
        <div>
            <div>
                <label htmlFor="userName">姓名:</label>
                <input type="text" id="userName" ref={userNameRef} />
            </div>
            <div>
                <label htmlFor="pet">寵物選擇:</label>
                <select id="pet" ref={petRef}>
                    <option value="" disabled>
                        請選擇
                    </option>
                    <option value="unrelated">貓咪</option>
                    <option value="related">環保小烏龜</option>
                </select>
            </div>

            <div>
                <label htmlFor="interactivity">初始模式選擇:</label>
                <select id="interactivity" ref={interactivityRef}>
                    <option value="" disabled>
                        請選擇
                    </option>
                    <option value="ineractive">可互動</option>
                    <option value="noninteractive">不可互動</option>
                </select>
            </div>
            <button
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
    );
};

export default SettingPage;
