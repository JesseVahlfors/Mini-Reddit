import React from "react";

function CreateImageElement(resolutions, title) {
    if (resolutions.length === 0) {
        return null
    }

    const srcSet = resolutions.map(resolution => `${resolution.url} ${resolution.width}w`).join(', ');

    const largestImage= resolutions.reduce((prev, current) => (prev.width > current.width) ? prev : current);

    return (
        <img src={largestImage.url} srcSet={srcSet} alt={title} sizes="(min-width: 1415px) 750px, (min-width: 768px) 50vw, 100vw" />
    );
}

export default CreateImageElement;