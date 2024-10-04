import video1 from "../assets/Course1.mp4";
import video2 from "../assets/Course2.mp4";
import VideoPlayer from "./VideoPlayer";

const CoursePage = ({ courseNum, setLock }) => {
    return (
        <VideoPlayer
            link={courseNum === 1 ? video1 : video2}
            setLock={setLock}
        />
    );
};

export default CoursePage;
