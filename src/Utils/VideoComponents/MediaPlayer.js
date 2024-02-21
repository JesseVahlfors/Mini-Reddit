import videojs from "video.js";
import 'video.js/dist/video-js.css';
import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivePlayer } from "./mediaPlayerSlice";


function MediaPlayer({ media, playerId }) {
    
    const {has_audio} = media.reddit_video;
    const dispatch = useDispatch();
    const activePlayer = useSelector((state) => state.mediaPlayer.activePlayer);
    
    
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const audioRef = useRef(null);

    const { videoUrl, audioUrl, aspectRatio} = useMemo(()=> {
        
        const { fallback_url, width, height} = media.reddit_video;
        const videoUrl = fallback_url.split("?")[0];
        const audioUrl = has_audio ? videoUrl.split("_")[0] + "_AUDIO_128.mp4": null;
        const aspectRatio = `${width}:${height}`;
        
        return { videoUrl, audioUrl, aspectRatio}
    }, [media])
   
    
    useEffect(() => {
        console.log(has_audio)
        audioRef.current = has_audio ? new Audio(audioUrl) : null
        
        if (!playerRef.current) {
            playerRef.current = videojs(videoRef.current, {
                controls: true,
                fluid: true,
                aspectRatio: aspectRatio,
                sources: [{
                    src: videoUrl,
                    type: 'video/mp4',
                }],
                height: media.reddit_video.height,
                width: media.reddit_video.width,
                
            });
            
            if (has_audio) { 
                playerRef.current.on('play', () => audioRef.current.play());
                playerRef.current.on('pause', () => audioRef.current.pause());
                playerRef.current.on('timeupdate', () => {
                    const difference = Math.abs(playerRef.current.currentTime() - audioRef.current.currentTime);
                    if (difference > 0.5) {
                        audioRef.current.currentTime = playerRef.current.currentTime();
                    }
                });
            }
        }
        // TODO: Audio Volume
        
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
    
    const handlePlay = () => {
       dispatch(setActivePlayer(playerId))
    }

    useEffect(() => {
        if(activePlayer !== playerId && playerRef.current && audioRef.current) {
            playerRef.current.pause();
            if (audioRef.current) audioRef.current.pause();
        }
    }, [activePlayer, playerId])
    
    return(
        <div data-vjs-player onClick={handlePlay}>
            <video ref={videoRef} className="video-js"></video>
        </div>
    )
}

export default MediaPlayer;