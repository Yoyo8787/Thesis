import video1 from "../assets/Course1.mp4";
import video2 from "../assets/Course2.mp4";
import VideoPlayer from "./VideoPlayer";
import Pet from "./Pet";
import { useRef, useEffect, useState } from "react";
import projectSetting from "../assets/Setting";

const CoursePage = ({ courseNum, pet, addPetStatus, nextStage }) => {
    const recordRef = useRef({ petClicked: 0, petDragged: 0, petCenter: 0 });

    const videoRef = useRef(null);
    const petRef = useRef(null);

    const [lock, setLock] = useState(projectSetting.lockPage);

    const checkOverlap = () => {
        if (!videoRef.current || !petRef.current) return;
        const bigRect = videoRef.current.getBoundingClientRect();
        const smallRect = petRef.current.getBoundingClientRect();

        const isOverlapping =
            bigRect.left < smallRect.right &&
            bigRect.right > smallRect.left &&
            bigRect.top < smallRect.bottom &&
            bigRect.bottom > smallRect.top;

        if (isOverlapping) {
            recordRef.current.petCenter++;
        }
    };

    useEffect(() => {
        const interval = setInterval(checkOverlap, 1000); // 每100ms檢查一次
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = () => {
        addPetStatus(recordRef.current);
        nextStage();
    };

    return (
        <>
            <VideoPlayer
                connect={videoRef}
                link={courseNum === 1 ? video1 : video2}
                setLock={setLock}
            />
            <Pet connect={petRef} setting={pet} recordRef={recordRef} />
            <button className="nextBt" onClick={handleSubmit} disabled={lock}>
                下一步
            </button>
        </>
    );
};

export default CoursePage;
