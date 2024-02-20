import videojs from "video.js";
import 'video.js/dist/video-js.css';
import React, { useEffect, useRef } from "react";

function MediaPlayer({ media }) {
    const {
        fallback_url,
        width: videoWidth,
        height: videoHeight,
    } = media.reddit_video

    const videoUrl = fallback_url.split("?")[0];
    const audioUrl = videoUrl.split("_")[0] + "_AUDIO_128.mp4";

    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const audioRef = useRef(new Audio(audioUrl));

    const calculateAspectRatio = (width, height) => `${width}:${height}`;
    const aspectRatio = calculateAspectRatio(videoWidth, videoHeight);

    

    
    useEffect(() => {
        if (!playerRef.current) {
            playerRef.current = videojs(videoRef.current, {
                controls: true,
                fluid: true,
                aspectRatio: aspectRatio,
                sources: [{
                    src: videoUrl,
                    type: 'video/mp4',
                }],
                videoHeight,
                videoWidth
            
            });

            playerRef.current.on('play', () => audioRef.current.play());
            playerRef.current.on('pause', () => audioRef.current.pause());
            playerRef.current.on('timeupdate', () => {
                const difference = Math.abs(playerRef.current.currentTime() - audioRef.current.currentTime);
                if (difference > 0.5) {
                    audioRef.current.currentTime = playerRef.current.currentTime();
                }
            });
        }
        // TODO: Audio stop and Volume
        
        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, [videoUrl, audioUrl, videoHeight, videoWidth, aspectRatio]); 


    return(
        <div data-vjs-player>
            <video ref={videoRef} className="video-js"></video>
        </div>
    )
}

export default MediaPlayer;