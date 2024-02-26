import React, { useEffect } from "react"
import DOMPurify from "dompurify"
const config = {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
};

const loadTwitterScript = () => {
    if(!window.twttr) {
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        document.body.appendChild(script); 
    } else {
        window.twttr.widgets.load();
    }
}



function TwitterEmbedComponent({ html }) {
    useEffect(() => {
        loadTwitterScript();
    }, []);
    const cleanHtml = DOMPurify.sanitize(html, config);
    return <div dangerouslySetInnerHTML={{ __html: cleanHtml}} className="iframe-container" />;
};

export default TwitterEmbedComponent; 