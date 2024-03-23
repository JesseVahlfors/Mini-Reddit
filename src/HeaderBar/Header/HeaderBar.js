import React from "react";
import { miniredditIcon } from "../../Utils/Icons/miniRedditIcon";
import SubredditSelector from "../../SubredditsSelector/SubredditSelector/SubredditSelector";
import useMediaQuery from "../../Utils/Hooks/useMediaQuery";
import Searchbar from "../SearchBar/SearchBar";

function HeaderBar() {
    const isSmallScreen = useMediaQuery("(max-width: 768px)");

    return (
        <header className="header card">
            <div className="logo">
                {miniredditIcon}
                <p><span className="span">Mini</span>Reddit</p>
            </div>
            <Searchbar />
           {isSmallScreen && <SubredditSelector />}
        </header>
    );
} 

export default HeaderBar;