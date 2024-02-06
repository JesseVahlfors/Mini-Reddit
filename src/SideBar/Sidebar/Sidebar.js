import React from "react";
import SubredditsList from "../SubredditList/SubredditList";

function Sidebar()  {
    return (
     <aside className="sidebar card">
        <SubredditsList />   
     </aside>
    )
}

export default Sidebar