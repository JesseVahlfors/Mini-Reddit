import React from "react";
import { miniredditIcon } from "../../Utils/Icons/miniRedditIcon";
import SubredditSelector from "../../SubredditsSelector/SubredditSelector/SubredditSelector";

function HeaderBar() {
    return (
        <header className="header">
            <div className="logo">
                {miniredditIcon}
                <h2><span>Mini</span>Reddit</h2>
            </div>
            <form className="search">
                <input type="text" placeholder="Search" aria-label="Search posts" value=""></input>
                <button type="submit" aria-label="Search">SearchIcon</button>
            </form>
            <SubredditSelector />
        </header>
    );
} 

export default HeaderBar;