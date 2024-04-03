/**
 * MediaComponent dynamically renders media content based on the article's media type.
 * It supports various media formats including video, Twitter, Twitch, Reddit video, 
 * image galleries, and custom image elements with overlay support. This component 
 * abstracts the complexity of handling different media types, providing a unified interface 
 * for media rendering in the application.
 * 
 * Props:
 * - article: The article object containing media information to be rendered.
 */
import React from "react";
import EmbedVideoComponent from "../VideoComponents/EmbedVideoComponent";
import TwitterEmbedComponent from "../VideoComponents/TwitterEmbedComponent";
import TwitchEmbedComponent from "../VideoComponents/TwitchEmbedComponent";
import MediaPlayer from "../VideoComponents/MediaPlayer";
import ImageGallery from "../ImageComponents/ImageGallery";
import { useImageOverlay } from "../Hooks/useImageOverlay";
import CreateImageData from "../ImageComponents/CreateImageData";
import Kick_logo from "../../Utils/Icons/Kick_logo.svg"
import Youtube_shorts_icon from "../../Utils/Icons/Youtube_shorts_icon.svg"

function MediaComponent({ article }) {
    const { handleOpenOverlay } = useImageOverlay();

    // Defines a mapping from media types to their corresponding render functions.
    const mediaRenderers = {
        video: () => <EmbedVideoComponent html={article.media.oembed.html} />,
        twitter: () => <TwitterEmbedComponent html={article.media.oembed.html} />,
        twitch: () => <TwitchEmbedComponent html={article.media.oembed.html} />,
        reddit_video: () => <MediaPlayer media={article.media} playerId={article.id} />,
        gallery: () => <ImageGallery metadata={article.media_metadata} title={article.title} />,
        image: () => {
            const imageData = CreateImageData(article.image.resolutions, article.title);
            return (
                <button onClick={() => handleOpenOverlay(imageData)}>
                    {<img
                        src={imageData.url}
                        srcSet={imageData.srcSet}
                        alt={imageData.alt}
                        sizes={imageData.sizes}
                        loading={imageData.loading}
                    />}
                </button>
            );
        },
        kick: () => {
        return (
        <a href={article.url} title={article.title} className="kick-link">
            <img src={Kick_logo} alt='Kick.com logo'/>
            <button className="kick-button">
                Open
            </button>
        </a>
        )},
        youtubeShorts: () => {
            const imageData = CreateImageData(article.image.resolutions, article.title);
            return (
                <>
                    <img
                        src={imageData.url}
                        srcSet={imageData.srcSet}
                        alt={imageData.alt}
                        sizes={imageData.sizes}
                        loading={imageData.loading}
                    />
                    <a href={article.url} title={article.title} className="kick-link">
                        <p className="shorts">
                            <img 
                            src={Youtube_shorts_icon} 
                            alt='Youtube shorts logo'
                            className="youtube-icon"
                            />
                            Shorts
                        </p>
                        <button className="kick-button">
                            Open
                        </button>
                    </a>
                </>
        )}
    }

    // Determines the media type of the article for selecting the appropriate renderer.
    const getMediaType = () => {
        if (article.media?.oembed?.type === 'video') return 'video';
        if (article.media?.type === 'twitter.com') return 'twitter';
        if (article.media?.type === 'clips.twitch.tv' || article.media?.type === 'twitch.tv') return 'twitch'; 
        if (article.media?.reddit_video) return 'reddit_video';
        if (article.is_gallery) return 'gallery';
        if (article.url.includes("https://youtube.com/shorts")) return 'youtubeShorts'
        if (article.image.source && article.image.resolutions) return 'image';
        if (article.url.includes("https://kick.com")) return 'kick';
        return null; //default if no media type matches
    }

    const mediaType = getMediaType();
    const RenderComponent = mediaRenderers[mediaType];

    return (
        <>
            {RenderComponent ? RenderComponent() : null}
        </>
    );
}

export default MediaComponent;