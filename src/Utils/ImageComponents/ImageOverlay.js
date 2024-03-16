import React from "react";
import './ImageOverlay.css'

const ImageOverlay = ({ children, isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="overlay" onClick={onClose} >
            <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>            
        </div>
    );
};

export default ImageOverlay