import React from "react";
import { miniredditIcon } from "../../Utils/Icons/miniRedditIcon";
import SubredditSelector from "../../SubredditsSelector/SubredditSelector/SubredditSelector";
import useMediaQuery from "../../Utils/Hooks/useMediaQuery";

function HeaderBar() {
    const isSmallScreen = useMediaQuery("(max-width: 768px)");

    return (
        <header className="header card">
            <div className="logo">
                {miniredditIcon}
                <p><span className="span">Mini</span>Reddit</p>
            </div>
            <form className="search">
                <input type="text" placeholder="Search" aria-label="Search posts"></input>
                <button type="submit" aria-label="Search">SearchIcon</button>
            </form>
           {isSmallScreen && <SubredditSelector />}
        </header>
    );
} 

export default HeaderBar;