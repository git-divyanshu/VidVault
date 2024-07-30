import React, { useEffect, useRef, useState } from "react";
import "./Videoplayer.css";

const Shortplayer = (params) => {
    const [shortlink, setShortlink] = useState(null);
    const [active, setActive] = useState(true);
    const [isInteracted, setIsInteracted] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (active === false) {
            video.pause();
        }
        if (isInteracted) {
            if (active === true) {
                video.play().catch((error) => {
                    console.error("Error playing video:", error);
                });
            }
        }
    }, [active, shortlink]);

    useEffect(() => {
        setShortlink(params.streamUrl);
        setActive(params.active);
    }, [params.streamUrl, params.active]);

    const handleInteraction = () => {
        setIsInteracted(true);
    };

    return (
        <div
            onMouseDown={() => {
                handleInteraction();
            }}
        >
            <video
                ref={videoRef}
                className="short"
                src={shortlink ? shortlink : null}
                autoPlay
                controls
                muted={false}
                loop={true}
                preload="auto"
            />
        </div>
    );
};

export default Shortplayer;
