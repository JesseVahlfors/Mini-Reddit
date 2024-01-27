import { differenceInMonths } from 'date-fns';

export const getTimeDifferenceString = (created_utc) => {
    const createdUtcMilliseconds = created_utc * 1000;
    const currentMilliseconds = new Date().getTime();
    const timeDifference = currentMilliseconds - createdUtcMilliseconds;

    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
    const weeksDifference = Math.floor(daysDifference / 7);
    const monthsDifference = differenceInMonths(new Date(), new Date(createdUtcMilliseconds));
    const yearDifference = Math.floor(monthsDifference / 12);

	if (yearDifference > 0) {
    	return `${yearDifference} year${yearDifference > 1 ? "s" : ""} ago`
    } else if (monthsDifference > 0) {
        return `${monthsDifference} month${monthsDifference > 1 ? "s" : ""} ago` 
    } else if (weeksDifference > 0) {
        return `${weeksDifference} week${weeksDifference > 1 ? "s" : ""} ago` 
    } else if (daysDifference > 0) {
        return `${daysDifference} day${daysDifference > 1 ? "s" : ""} ago` 
    } else if (hoursDifference > 0) {
        return `${hoursDifference} hour${hoursDifference > 1 ? "s" : ""} ago` 
    } else if (minutesDifference > 0) {
        return `${minutesDifference} minute${minutesDifference > 1 ? "s" : ""} ago` 
    } else if (secondsDifference > 0) {
        return `${secondsDifference} second${secondsDifference > 1 ? "s" : ""} ago` 
    }
    
}


