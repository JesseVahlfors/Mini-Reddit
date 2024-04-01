import React from "react";
import './ImageOverlay.css'

const ImageOverlay = ({ imageData, isOpen, onClose }) => {
    if (!isOpen || !imageData) return null;



    return (
        <div className="overlay" onClick={onClose}>
            <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
                <img
                    src={imageData.url}
                    srcSet={imageData.srcSet}
                    alt={imageData.alt}
                    sizes="'(min-width:768px) 90vh, 100vw'"
                    loading={imageData.loading}
                    className={imageData.className || 'img-maximised'} // Use provided className or default
                />
            </div>            
        </div>
    );
};

export default ImageOverlay
