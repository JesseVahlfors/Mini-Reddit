import { useState } from "react";

export function useImageOverlay() {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [overlayContent, setOverlayContent] = useState(null);

    const handleOpenOverlay = (content) => {
        setOverlayContent(content);
        setIsOverlayOpen(true);
    };

    const handleCloseOverlay = () => {
        setIsOverlayOpen(false);
        setOverlayContent(null);
    };

    return {
        isOverlayOpen,
        overlayContent,
        handleCloseOverlay,
        handleOpenOverlay,
    };
}