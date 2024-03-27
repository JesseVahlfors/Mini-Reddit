import React from "react";
import { getTimeDifferenceString } from "../Funcs/time";
import { formatDate } from "../Funcs/timeFormat";

function TimeAgo ({ timestamp }) {
    const navigatorDateFormat = formatDate(timestamp);
    const formattedISODate = new Date(timestamp * 1000).toISOString();

    return (
        <time dateTime={formattedISODate} title={navigatorDateFormat}>
            {getTimeDifferenceString(timestamp)}
        </time>

    )
};

export default TimeAgo;