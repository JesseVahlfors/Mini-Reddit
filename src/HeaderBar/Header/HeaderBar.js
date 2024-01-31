import React from "react";
import { miniredditIcon } from "../../Utils/Icons/miniRedditIcon";

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
        </header>
    );
} 

export default HeaderBar;