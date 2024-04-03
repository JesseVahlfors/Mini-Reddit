import React, { useEffect } from "react"
import DOMPurify from "dompurify"
import he from 'he';
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
    const containsHtmlEntities = (str) =>  /&[a-zA-Z0-9#]+;/.test(str);
    const decodeAndSanitizeHtml = (html) => {
        let decodedHtml = html;
        if (containsHtmlEntities(html)) {
            decodedHtml = he.decode(html);
        }
        return DOMPurify.sanitize(decodedHtml, config);
    };
    
    
    const safeHTML = decodeAndSanitizeHtml(html)
    return <div dangerouslySetInnerHTML={{ __html: safeHTML}} className="Tweet-container" />;
};

export default TwitterEmbedComponent; 