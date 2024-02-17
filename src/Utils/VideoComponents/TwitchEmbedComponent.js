import React from "react"
import DOMPurify from "dompurify"
const config = {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling", "src", "width", "height", "title", "class" ],
};

const appDomain = 'localhost'
const embed = "\u003Ciframe class=\"embedly-embed\" src=\"https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fclips.twitch.tv%2Fembed%3Fclip%3DTubularObeseGnatHeyGirl-0tLMaxJab1_DY0a3%26parent%3Dcdn.embedly.com%26parent%3Dreddit.com%26parent%3Dwww.reddit.com%26parent%3Dold.reddit.com%26parent%3Dnew.reddit.com%26parent%3Dredditmedia.com%26muted%3Dtrue%26autoplay%3Dfalse\u0026display_name=Twitch.tv\u0026url=https%3A%2F%2Fclips.twitch.tv%2FTubularObeseGnatHeyGirl-0tLMaxJab1_DY0a3\u0026image=https%3A%2F%2Fclips-media-assets2.twitch.tv%2F3a-WrdLSzGsSWm9fw2NGtw%2FAT-cm%257C3a-WrdLSzGsSWm9fw2NGtw-social-preview.jpg\u0026key=ed8fa8699ce04833838e66ce79ba05f1\u0026type=text%2Fhtml\u0026schema=twitch\" width=\"600\" height=\"340\" scrolling=\"no\" title=\"Twitch.tv embed\" frameborder=\"0\" allow=\"autoplay; fullscreen; encrypted-media; picture-in-picture;\" allowfullscreen=\"true\"\u003E\u003C/iframe\u003E"


function modifyIframeSrc(iframeString, newDomain) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(iframeString, 'text/html');
    const iframe = doc.querySelector('iframe');
    
    if (iframe && iframe.src) {
        const srcUrl = new URL(iframe.src);
        srcUrl.searchParams.delete('parent');
        console.log(srcUrl)
        srcUrl.searchParams.append('parent', newDomain);
        iframe.src = srcUrl.toString();
    }
    
    return doc.body.innerHTML;
}

function TwitchEmbedComponent({ html }) {
    let modifiedHtml = modifyIframeSrc(html, appDomain)
    const cleanHtml = DOMPurify.sanitize(modifiedHtml, config);
    return <div dangerouslySetInnerHTML={{ __html: cleanHtml}} className="twitch-iframe-container" />;
};

modifyIframeSrc(embed, appDomain)


export default TwitchEmbedComponent; 

