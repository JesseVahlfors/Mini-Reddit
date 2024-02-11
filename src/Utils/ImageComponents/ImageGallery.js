import React from "react"
import ReactImageGallery from "react-image-gallery";

function ImageGallery({metadata}) {
    if (!metadata || typeof metadata !== 'object') {
        return null; // or handle accordingly
    }
    const images = Object.values(metadata).map((imageData) => {
        const { id, p, status, s } = imageData;

        if (!imageData || status !== 'valid' || !p) {
            return null;
        }


        const srcSet = p.map((size) => `${size.u} ${size.y}w`).join(', ');
    
        return {
           original: s.u,
           thumbnail: s.u,
           srcSet, 
           sizes: `(max-width: 600px) 100vw, 1200px`,
        }
            
            
     });
     console.log("image")
     return <ReactImageGallery items={images} />;
}

export default ImageGallery;