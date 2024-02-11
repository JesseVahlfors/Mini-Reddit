import React from "react"
import DOMPurify from "dompurify"
const config = {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
};


function EmbedVideoComponent({ html }) {
    const cleanHtml = DOMPurify.sanitize(html, config);
    return <div dangerouslySetInnerHTML={{ __html: cleanHtml}} />;
};

export default EmbedVideoComponent; 