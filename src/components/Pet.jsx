import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Pet1 from "../assets/Pet1/Pet1";
import Pet2 from "../assets/Pet2/Pet2";
import { isEqual } from "lodash";
const Pet = ({ setting }) => {
    const Animation = useMemo(() => {
        if (setting.name === "related") {
            return {
                idle: Pet1.idleAnime,
                walk: Pet1.walkAnime,
                click: Pet1.clickAnime,
                hold: Pet1.holdAnime,
                back: Pet1.backAnime,
            };
        } else {
            return {
                idle: Pet2.idleAnime,
                walk: Pet2.walkAnime,
                click: Pet2.clickAnime,
                hold: Pet2.holdAnime,
                back: Pet2.backAnime,
            };
        }
    }, [setting]);
    const [currentAnimation, setCurrentAnimation] = useState(Animation.idle);
    const [frame, setFrame] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [mouse, setMouse] = useState([0, 0]);
    const [rotation, setRotation] = useState(0);
    const [position, setPosition] = useState([400, 400]);
    const [direction, setDirection] = useState(0);
    const positionRef = useRef([0, 0]);

    const speed = 1;
    const interval = 100;

    // 播放動畫
    useEffect(() => {
        const interval = setInterval(() => {
            setFrame((prevFrame) => {
                return prevFrame + 1;
            });
        }, 200);

        return () => clearInterval(interval);
    }, [Animation]);

    const playAnimation = (animation, name) => {
        console.log("play", name);
        setFrame(0);
        setCurrentAnimation(animation);
    };

    useEffect(() => {
        if (
            isEqual(currentAnimation, Animation.click) &&
            frame === Animation.click.length
        ) {
            playAnimation(Animation.back, "back from click");
        }
        if (
            isEqual(currentAnimation, Animation.back) &&
            frame === Animation.back.length
        ) {
            setIsClicked(false);
            setIsDragging(false);
            playAnimation(Animation.idle, "idle");
        }
    }, [Animation, currentAnimation, frame]);

    // 拖曳時旋轉
    useEffect(() => {
        if (isDragging && rotation !== 0) {
            const returnToZero = setInterval(() => {
                setRotation((prevRotation) => {
                    const newRotation = prevRotation * 0.9; // 每次更新讓旋轉角度逐漸減少
                    if (Math.abs(newRotation) < 0.1) {
                        clearInterval(returnToZero); // 當接近0時停止
                        return 0;
                    }
                    return newRotation;
                });
            }, 16); // 大約每秒60幀
            return () => clearInterval(returnToZero);
        }
    }, [rotation, isDragging]);

    // 按下空白鍵時播放點擊動畫
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!setting.interact) {
                return;
            }
            if (e.code === "Space") {
                setIsClicked(true);
                playAnimation(Animation.click, "click");
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [Animation.click, setting.interact]);

    // 控制行走和休息的定時器
    const calculateDirection = useCallback((walkDuration) => {
        const getRandomInTwoRanges = (ranges) => {
            // 隨機選擇一個範圍
            const [min, max] =
                ranges[Math.floor(Math.random() * ranges.length)];

            // 返回該範圍內的隨機數
            return Math.random() * (max - min) + min;
        };

        let newDirection = getRandomInTwoRanges([
            [0, 30],
            [150, 210],
            [330, 360],
        ]); // 隨機選擇一個方向

        let newX =
            positionRef.current[0] +
            speed * Math.cos(newDirection) * (walkDuration / interval);
        let newY =
            positionRef.current[1] -
            speed * Math.sin(newDirection) * (walkDuration / interval);
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        if (newX < 0 && newY < 0) {
            newDirection = Math.random() * 30 + 330; // 強制往右下方走 (270 到 360 度)
        } else if (newX > windowWidth - 200 && newY < 0) {
            newDirection = Math.random() * 30 + 180; // 強制往左下方走（180 到 270 度）
        } else if (newX < 0 && newY > windowHeight - 200) {
            newDirection = Math.random() * 30; // 強制往右上方走（0 到 90 度）
        } else if (newX > windowWidth - 200 && newY > windowHeight - 200) {
            newDirection = Math.random() * 30 + 150; // 強制往左上方走（90 到 180 度）
        } else if (newX < 0) {
            // 左邊界
            newDirection = getRandomInTwoRanges([
                [0, 30],
                [330, 360],
            ]); // 強制往右走
        } else if (newX > windowWidth - 200) {
            // 右邊界
            newDirection = Math.random() * 60 + 150; // 強制往左走
        } else if (newY < 0) {
            // 上邊界
            newDirection = getRandomInTwoRanges([
                [180, 210],
                [330, 360],
            ]); // 強制往下走
        } else if (newY > windowHeight - 200) {
            // 下邊界
            newDirection = getRandomInTwoRanges([
                [0, 30],
                [150, 180],
            ]); // 強制往上走
        }

        return Math.floor(newDirection);
    }, []);
    useEffect(() => {
        let walkInterval; // 用來保存 setInterval 的 ID
        let walkTimeout; // 用來保存 setTimeout 的 ID
        let randomTimeout;
        const startWalking = () => {
            if (isClicked || isDragging) {
                setRandomWalkTimeout();
                return;
            }
            let tempPosition = [];
            const walkDuration = Math.random() * 6000 + 5000;
            const newDirection = calculateDirection(walkDuration);
            setDirection(newDirection);
            console.log("walk", newDirection);
            playAnimation(Animation.walk, "walk");

            walkInterval = setInterval(() => {
                if (isClicked || isDragging) {
                    positionRef.current = tempPosition;
                    clearInterval(walkInterval);
                    setRandomWalkTimeout();
                    return;
                }
                setPosition((prevPosition) => {
                    let newX =
                        prevPosition[0] +
                        speed * Math.cos(newDirection * (Math.PI / 180));
                    let newY =
                        prevPosition[1] -
                        speed * Math.sin(newDirection * (Math.PI / 180));
                    tempPosition = [newX, newY];
                    return [newX, newY];
                });
            }, interval);

            walkTimeout = setTimeout(() => {
                positionRef.current = tempPosition;
                clearInterval(walkInterval);
                console.log("walk end");
                playAnimation(Animation.idle, "idle"); // 回到idle狀態
                setRandomWalkTimeout(); // 再次設置隨機時間觸發走動
            }, walkDuration);
        };
        const setRandomWalkTimeout = () => {
            if (randomTimeout) clearTimeout(randomTimeout);
            const restDuration = Math.random() * 5000 + 5000; // 隨機休息5到10秒
            randomTimeout = setTimeout(startWalking, restDuration);
        };

        setRandomWalkTimeout();

        return () => {
            if (randomTimeout) clearTimeout(randomTimeout);
            if (walkInterval) clearInterval(walkInterval); // 清理 walkInterval
            if (walkTimeout) clearTimeout(walkTimeout);
        };
    }, [Animation, calculateDirection, isClicked, isDragging]);

    const handleMouseDown = (e) => {
        if (!setting.interact) {
            return;
        }
        playAnimation(Animation.hold, "hold");
        setIsDragging(true);
        setMouse([e.clientX, e.clientY]);
        setPosition([e.clientX - 100, e.clientY - 100]);
    };
    const handleMouseMove = (e) => {
        if (!setting.interact) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        if (isDragging) {
            const newMouseX = e.clientX;
            const newMouseY = e.clientY;

            const deltaX = newMouseX - mouse[0];
            const newVelocity = deltaX * 0.6; // 旋轉角度與滑鼠移動距離成比例

            setRotation((prevRotation) => {
                const newRotation = prevRotation + newVelocity;
                if (Math.abs(newRotation) > 90)
                    return prevRotation + newVelocity * 0.1; // 設置最大值
                return newRotation;
            }); // 更新旋轉角度
            setMouse([newMouseX, newMouseY]);
            setPosition([newMouseX - 100, newMouseY - 100]);
        }
    };
    const handleMouseUp = () => {
        if (!setting.interact || !isDragging) {
            return;
        }
        setIsDragging(false);
        playAnimation(Animation.back, "back from drag");
    };

    return (
        <img
            src={currentAnimation[frame % currentAnimation.length]}
            draggable="false"
            alt="pet"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="pet"
            style={{
                cursor: isDragging ? "grabbing" : "grab",
                left: position[0],
                top: position[1],
                transform: `rotate(${isDragging ? rotation : 0}deg) rotateY(${
                    (direction >= 90 && direction <= 270) ===
                    (setting.name !== "related")
                        ? 180
                        : 0
                }deg)`,
                transition: isDragging ? "none" : "transform 0.3s ease-out",
            }}
        />
    );
};

export default Pet;
