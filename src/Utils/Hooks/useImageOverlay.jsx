import { useDispatch, useSelector } from "react-redux";
import { setOpenOverlay, closeOverlay, selectIsOverlayOpen, selectOverlayContent } from "../../Articles/Articles/articlesSlice";

export function useImageOverlay() {
    const dispatch = useDispatch();
    const isOverlayOpen = useSelector(selectIsOverlayOpen);
    const overlayContent = useSelector(selectOverlayContent);

    const handleOpenOverlay = (content) => {
        dispatch(setOpenOverlay(content))
    };

    const handleCloseOverlay = () => {
        dispatch(closeOverlay());
    };

    return {
        isOverlayOpen,
        overlayContent,
        handleCloseOverlay,
        handleOpenOverlay,
    };
}