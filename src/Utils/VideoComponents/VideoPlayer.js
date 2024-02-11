import React from "react"
import ReactPlayer from "react-player";


function VideoPlayer({ media }) {
    const {
        fallback_url,
        width,
        height,
    } = media.reddit_video;
    return (
        <div>
            <ReactPlayer
            url={fallback_url}
            width={width}
            height={height}
            controls={true}
            />
        </div>
    )
};

export default VideoPlayer; 