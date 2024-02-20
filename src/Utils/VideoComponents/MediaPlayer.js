import videojs from "video.js";
import 'video.js/dist/video-js.css';
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivePlayer } from "./mediaPlayerSlice";


function MediaPlayer({ media, playerId }) {
    const {
        fallback_url,
        width: videoWidth,
        height: videoHeight,
    } = media.reddit_video

    const dispatch = useDispatch();
    const activePlayer = useSelector((state) => state.mediaPlayer.activePlayer);

    const videoUrl = fallback_url.split("?")[0];
    const audioUrl = videoUrl.split("_")[0] + "_AUDIO_128.mp4";
    
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const audioRef = useRef(new Audio(audioUrl));

    const calculateAspectRatio = (width, height) => `${width}:${height}`;
    const aspectRatio = calculateAspectRatio(videoWidth, videoHeight);

    const handlePlay = () => {
       dispatch(setActivePlayer(playerId))
    }

    useEffect(() => {
        if(activePlayer !== playerId && playerRef.current && audioRef.current) {
            playerRef.current.pause();
            audioRef.current.pause();
        }
    }, [activePlayer, playerId])
    
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

            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = "";
                audioRef.current.load();
                audioRef.current = null;
            }
        };
    }, [media]); 


    return(
        <div data-vjs-player onClick={handlePlay}>
            <video ref={videoRef} className="video-js"></video>
        </div>
    )
}

export default MediaPlayer;