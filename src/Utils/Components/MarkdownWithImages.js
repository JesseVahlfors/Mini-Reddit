/**
 * MarkdownWithImages is a React component designed to render Markdown content
 * with enhanced image handling. It automatically transforms plain image URLs
 * in the given Markdown text into Markdown image syntax, injecting custom alt
 * text for each image. This ensures images are accessible and properly
 * displayed when rendered using `react-markdown`. The component encapsulates
 * both the transformation of image URLs to include alt text and the rendering
 * of the transformed Markdown content, making it easy to include rich text
 * with accessible images in your application.
 *
 * Props:
 *   markdownText: The Markdown content to be rendered, as a string.
 */
import React from "react";
import ReactMarkdown from 'react-markdown';

// Component that transforms and renders Markdown content
function MarkdownWithImages ({markdownText}) {
    // Function to transform image URLs into Markdown images with custom alt text
    function transformImageUrlsWithAltText(text) {
        const imageUrlPattern = /https:\/\/preview\.redd\.it\/[^\s]+?\.(png|jpg|jpeg)\?width=\d+&format=(png|jpg|jpeg)&auto=webp&s=[a-z0-9]+/g;
        return text.replace(imageUrlPattern, (url) => {
            const altText = "paragraph images"
            return `![${altText}](${url})`;
        });
    }

    const transformedMarkdown = transformImageUrlsWithAltText(markdownText)

    return (
        <ReactMarkdown>
            {transformedMarkdown}
        </ReactMarkdown>
    );
};

export default MarkdownWithImages