import React from "react";
import EmbedVideoComponent from "../VideoComponents/EmbedVideoComponent";
import TwitterEmbedComponent from "../VideoComponents/TwitterEmbedComponent";
import TwitchEmbedComponent from "../VideoComponents/TwitchEmbedComponent";
import MediaPlayer from "../VideoComponents/MediaPlayer";
import ImageGallery from "../ImageComponents/ImageGallery";
import CreateImageElement from "../ImageComponents/CreateImageElement";
import { useImageOverlay } from "../Hooks/useImageOverlay";

function MediaComponent({ article }) {
    const { handleOpenOverlay } = useImageOverlay();

    const mediaRenderers = {
        video: () => <EmbedVideoComponent html={article.media.oembed.html} />,
        twitter: () => <TwitterEmbedComponent html={article.media.oembed.html} />,
        twitch: () => <TwitchEmbedComponent html={article.media.oembed.html} />,
        reddit_video: () => <MediaPlayer media={article.media} playerId={article.id} />,
        gallery: () => <ImageGallery metadata={article.media_metadata} />,
        image: () => {
            const imageElement = CreateImageElement(article.image.resolutions, article.title);
            return (
                <button onClick={() => handleOpenOverlay(imageElement)}>
                    {imageElement}
                </button>
            );
        },
        kick: () => <a href={article.url} title={article.title}>{article.url}</a>,
    }

    const getMediaType = () => {
        if (article.media?.oembed?.type === 'video') return 'video';
        if (article.media?.type === 'twitter.com') return 'twitter';
        if (article.media?.type === 'clips.twitch.tv' || article.media?.type === 'twitch.tv') return 'twitch'; 
        if (article.media?.reddit_video) return 'reddit_video';
        if (article.is_gallery) return 'gallery';
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