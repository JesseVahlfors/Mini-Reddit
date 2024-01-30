import React from "react";
import SubredditsList from "../SubredditList/SubredditList";

function Sidebar()  {
    return (
     <div classname="sidebar">
        <h2 >Sidebar</h2>
        <SubredditsList />   
     </div>
    )
}

export default Sidebar