import DOMPurify from 'dompurify';
import he from 'he';
import { useEffect, useRef } from 'react';

function HtmlComponent({ htmlContent, title }) {
    const containsHtmlEntities = (str) =>  /&[a-zA-Z0-9#]+;/.test(str);
    const contentRef = useRef(null);
    
    useEffect(() => {
        
        contentRef.current.querySelectorAll('.md-spoiler-text').forEach(spoiler => {
        spoiler.onclick = () => spoiler.classList.toggle('revealed');
        });
    }, [htmlContent]);

    useEffect(() => {
        if (!htmlContent) return;

        const decodeAndSanitizeHtml = (html) => {
            let decodedHtml = html;
            if (containsHtmlEntities(html)) {
                decodedHtml = he.decode(html);
            }
            return DOMPurify.sanitize(decodedHtml);
        };
        
        
        const safeHTML = decodeAndSanitizeHtml(htmlContent)

        const parser = new DOMParser();
        const doc = parser.parseFromString(safeHTML, 'text/html');

        const links = doc.querySelectorAll('a');

        links.forEach(link => {
            if (link.href.match(/\.(jpeg|jpg|gif|png|webp)(\?.*)?$/)) {
                console.log(link)
                const img = doc.createElement('img');
                img.src = link.href;
                img.alt = title

                img.setAttribute('loading','lazy');

                link.parentNode.replaceChild(img, link);
            }
        });

        const finalHtml = doc.body.innerHTML;
        if(contentRef.current) {
            contentRef.current.innerHTML = finalHtml;
        }

        contentRef.current.querySelectorAll('.md-spoiler-text').forEach(spoiler => {
            spoiler.onclick = () => spoiler.classList.toggle('revealed');
        });

    }, [htmlContent, title]);
   

   return <div ref={contentRef} />;
   } 


export default HtmlComponent