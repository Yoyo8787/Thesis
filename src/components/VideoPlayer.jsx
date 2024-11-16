import React, { useRef, useState, useEffect } from "react";
import playIcon from "../assets/play-button.png";
import pauseIcon from "../assets/pause-button.png";

function VideoPlayer({ connect, link, setLock }) {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleTogglePlayPause = () => {
        const video = videoRef.current;
        if (isPlaying) {
            video.pause();
            setIsPlaying(false);
        } else {
            video.play().catch((error) => {
                console.log("Autoplay was prevented:", error);
            });
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === "Space" || event.key === " ") {
                event.preventDefault(); // Prevent the default behavior of the spacebar
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div ref={connect} className="videoPlayer">
            <button
                className="videoPlayer_button"
                onClick={handleTogglePlayPause}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ opacity: isPlaying ? (isHovered ? 0.3 : 0) : 0.8 }}
            >
                <img src={isPlaying ? pauseIcon : playIcon} alt="play/pause" />
            </button>
            <video
                className="videoPlayer_player"
                ref={videoRef}
                style={{ pointerEvents: "none", opacity: isPlaying ? 1 : 0.1 }}
                onEnded={() => setLock(false)}
            >
                <source src={link} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default VideoPlayer;
