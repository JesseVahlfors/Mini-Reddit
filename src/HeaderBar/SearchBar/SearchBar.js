import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../Articles/Articles/articlesSlice";
import { selectSelectedSubreddit } from "../../Sidebar/Subreddit/subredditSlice";
import searchIcon from "../../Utils/Icons/searchIcon.svg";
import "./searchBar.css";

function Searchbar() {
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();
    const selectedSubreddit = useSelector(selectSelectedSubreddit)
    const subreddit = selectedSubreddit? selectedSubreddit.displayName : "Popular" ;

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleSubmit = () => {
        if (searchQuery.trim() !== "") {
            dispatch(fetchArticles({ subreddit, query: searchQuery.trim() }));
            console.log('Submitting search for:', searchQuery)
            setSearchQuery("")
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
        }
    }

    return (
        <div className="search-container" >
                <input
                    type="text"
                    placeholder={`Search in ${subreddit}`}
                    aria-label="Search posts"
                    value={searchQuery}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className="searchbar"
                    style={{
                        backgroundImage: `url(${searchIcon})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right center',
                        backgroundSize: '40px 30px', 
                        paddingRight: '40px'
                    }}
                />
        </div>
    )
}

export default Searchbar