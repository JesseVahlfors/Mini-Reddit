import React from "react"
import DOMPurify from "dompurify"
import he from 'he';
const config = {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
};


function EmbedVideoComponent({ html }) {
    const containsHtmlEntities = (str) =>  /&[a-zA-Z0-9#]+;/.test(str);
    const decodeAndSanitizeHtml = (html) => {
        let decodedHtml = html;
        if (containsHtmlEntities(html)) {
            decodedHtml = he.decode(html);
        }
        return DOMPurify.sanitize(decodedHtml, config);
    };
    
    
    const safeHTML = decodeAndSanitizeHtml(html)

    return <div dangerouslySetInnerHTML={{ __html: safeHTML}} className="iframe-container" />;
};

export default EmbedVideoComponent; 