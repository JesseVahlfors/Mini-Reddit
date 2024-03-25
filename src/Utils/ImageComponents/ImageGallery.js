import React from "react"
import ReactImageGallery from "react-image-gallery";

function ImageGallery({metadata}) {
    if (!metadata || typeof metadata !== 'object') {
        return null;
    }

    const images = Object.values(metadata).map((imageData) => {
        const { p, status, s } = imageData;

        if (!imageData || status !== 'valid' || !p) {
            return null;
        }


        const srcSet = p.map((size) => {
            const correctedUrl = size.u.replace(/&amp;/g, "&")
            return `${correctedUrl} ${size.y}w`
        }).join(', ');

        const thumbnailUrl = p.find(size => size.x === 320)?.u || p[0]?.u;
        const correctedThumbnailUrl = thumbnailUrl.replace(/&amp;/g, "&");
        const correctedOriginal = s.u.replace(/&amp;/g, "&");
    
        return {
           original: correctedOriginal,
           thumbnail: correctedThumbnailUrl,
           srcSet, 
           sizes: "(min-width: 1415px) 750px, (min-width: 768px) 50vw, 100vw",
        };      
     });
     return <ReactImageGallery items={images} />;
}

export default ImageGallery;


   // const correctUrl = url.replace(/%26amp%3B/g, "%26");
    