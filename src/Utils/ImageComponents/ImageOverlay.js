import React from "react";
import './ImageOverlay.css'

const ImageOverlay = ({ children, isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    const enhancedChildren = React.Children.map(children, child => {
        if(React.isValidElement(child) && child.type === 'img') {
            return React.cloneElement(child, {
                className: `img-maximized`,
                sizes: '(min-width:768) 90vh, 100vw',
            });
        }

        return child
    })

    return (
        <div className="overlay" onClick={onClose} >
            <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
                {enhancedChildren}
            </div>            
        </div>
    );
};

export default ImageOverlay